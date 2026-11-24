import { db } from "@/lib/db";
import { CategoryType } from "@/app/types/CategoryType";
import { CategoryWithChildrenType } from "@/app/types/CategoryWithChildrenType";
import { ProductListItemType } from "@/app/types/ProductListItemType";
import { ProductDetailType } from "@/app/types/ProductDetailType";

// Спільний SELECT: товар + виробник + категорія + батьківська категорія
export const PRODUCT_SELECT = `
  SELECT p.id, p.category_id AS categoryId, p.manufacturer_id AS manufacturerId,
         p.name_uk AS nameUk, p.name_en AS nameEn, p.article_number AS articleNumber,
         p.price, p.stock_quantity AS stockQuantity, p.image_url AS imageUrl,
         p.description_uk AS descriptionUk, p.description_en AS descriptionEn,
         m.name AS manufacturerName, m.country AS manufacturerCountry,
         c.name_uk AS categoryNameUk, c.slug AS categorySlug,
         pc.slug AS parentSlug
  FROM products p
  JOIN manufacturers m ON m.id = p.manufacturer_id
  JOIN categories c ON c.id = p.category_id
  LEFT JOIN categories pc ON pc.id = c.parent_id
`;

export type ProductFilterParams = {
  categorySlug?: string;
  modificationId?: number;
  manufacturerId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: string;
};

// id категорії + id всіх її підкатегорій
export function getCategoryIdsWithChildren(slug: string): number[] | null {
  const category = db
    .prepare("SELECT id FROM categories WHERE slug = ?")
    .get(slug) as { id: number } | undefined;
  if (!category) return null;

  const children = db
    .prepare("SELECT id FROM categories WHERE parent_id = ?")
    .all(category.id) as { id: number }[];

  return [category.id, ...children.map((c) => c.id)];
}

export function getCategoryBySlug(slug: string): (CategoryType & { parent: CategoryType | null }) | null {
  const row = db
    .prepare(
      `SELECT id, parent_id AS parentId, name_uk AS nameUk, name_en AS nameEn, slug
       FROM categories WHERE slug = ?`
    )
    .get(slug) as CategoryType | undefined;
  if (!row) return null;

  const parent = row.parentId
    ? (db
        .prepare(
          `SELECT id, parent_id AS parentId, name_uk AS nameUk, name_en AS nameEn, slug
           FROM categories WHERE id = ?`
        )
        .get(row.parentId) as CategoryType)
    : null;

  return { ...row, parent };
}

export function getSubcategories(parentId: number): CategoryType[] {
  return db
    .prepare(
      `SELECT id, parent_id AS parentId, name_uk AS nameUk, name_en AS nameEn, slug
       FROM categories WHERE parent_id = ? ORDER BY name_uk`
    )
    .all(parentId) as CategoryType[];
}

export function getProducts(params: ProductFilterParams): ProductListItemType[] {
  const conditions: string[] = [];
  const args: (string | number)[] = [];
  let join = "";

  if (params.categorySlug) {
    const ids = getCategoryIdsWithChildren(params.categorySlug);
    if (!ids) return [];
    conditions.push(`p.category_id IN (${ids.map(() => "?").join(",")})`);
    args.push(...ids);
  }

  if (params.modificationId) {
    join = " JOIN product_compatibility pcomp ON pcomp.product_id = p.id ";
    conditions.push("pcomp.modification_id = ?");
    args.push(params.modificationId);
  }

  if (params.manufacturerId) {
    conditions.push("p.manufacturer_id = ?");
    args.push(params.manufacturerId);
  }
  if (params.minPrice !== undefined) {
    conditions.push("p.price >= ?");
    args.push(params.minPrice);
  }
  if (params.maxPrice !== undefined) {
    conditions.push("p.price <= ?");
    args.push(params.maxPrice);
  }
  if (params.inStock) {
    conditions.push("p.stock_quantity > 0");
  }

  const orderBy =
    params.sort === "price_asc"
      ? "p.price ASC"
      : params.sort === "price_desc"
      ? "p.price DESC"
      : params.sort === "newest"
      ? "p.id DESC"
      : "p.name_uk ASC";

  const where = conditions.length ? " WHERE " + conditions.join(" AND ") : "";

  return db
    .prepare(`${PRODUCT_SELECT} ${join} ${where} ORDER BY ${orderBy}`)
    .all(...args) as ProductListItemType[];
}

// Пошук за назвою, артикулом або виробником (без урахування регістру)
export function searchProducts(query: string, limit = 60): ProductListItemType[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const like = `%${q}%`;

  return db
    .prepare(
      `${PRODUCT_SELECT}
       WHERE lc(p.name_uk) LIKE ? OR lc(p.name_en) LIKE ?
          OR lc(p.article_number) LIKE ? OR lc(m.name) LIKE ?
       ORDER BY p.name_uk ASC LIMIT ?`
    )
    .all(like, like, like, like, limit) as ProductListItemType[];
}

export function getLatestProducts(limit = 8): ProductListItemType[] {
  return db
    .prepare(`${PRODUCT_SELECT} WHERE p.stock_quantity > 0 ORDER BY p.id DESC LIMIT ?`)
    .all(limit) as ProductListItemType[];
}

export function getRelatedProducts(productId: number, limit = 4): ProductListItemType[] {
  return db
    .prepare(
      `${PRODUCT_SELECT}
       WHERE p.category_id = (SELECT category_id FROM products WHERE id = ?)
         AND p.id != ?
       ORDER BY p.stock_quantity > 0 DESC, p.id LIMIT ?`
    )
    .all(productId, productId, limit) as ProductListItemType[];
}

export function getProductById(id: number): ProductDetailType | null {
  const row = db.prepare(`${PRODUCT_SELECT} WHERE p.id = ?`).get(id);
  return (row as ProductDetailType) ?? null;
}

// Для сторінок «Обране» та «Порівняння»
export function getProductsByIds(ids: number[], modificationId?: number): ProductDetailType[] {
  if (ids.length === 0) return [];

  const rows = db
    .prepare(`${PRODUCT_SELECT} WHERE p.id IN (${ids.map(() => "?").join(",")})`)
    .all(...ids) as ProductDetailType[];

  const fits = modificationId
    ? new Set(
        (
          db
            .prepare("SELECT product_id FROM product_compatibility WHERE modification_id = ?")
            .all(modificationId) as { product_id: number }[]
        ).map((r) => r.product_id)
      )
    : null;

  // зберігаємо порядок, у якому користувач додавав товари
  return ids
    .map((id) => rows.find((r) => r.id === id))
    .filter((r): r is ProductDetailType => !!r)
    .map((r) => ({ ...r, fitsCar: fits ? fits.has(r.id) : null }));
}

export function getCategoryTree(): CategoryWithChildrenType[] {
  const rows = db
    .prepare(
      `SELECT id, parent_id AS parentId, name_uk AS nameUk, name_en AS nameEn, slug
       FROM categories ORDER BY name_uk`
    )
    .all() as CategoryType[];

  return rows
    .filter((c) => c.parentId === null)
    .map((parent) => ({
      ...parent,
      children: rows.filter((c) => c.parentId === parent.id),
    }));
}

// Лічильники для головної сторінки
export function getShopCounts() {
  const n = (sql: string) => (db.prepare(sql).get() as { n: number }).n;
  return {
    products: n("SELECT COUNT(*) AS n FROM products"),
    brands: n("SELECT COUNT(*) AS n FROM car_brands"),
    models: n("SELECT COUNT(*) AS n FROM car_models"),
    manufacturers: n("SELECT COUNT(*) AS n FROM manufacturers"),
  };
}
