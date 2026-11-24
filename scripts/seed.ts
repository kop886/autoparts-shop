import { db } from "../src/lib/db";
import { carBrandsSeed, carModelsSeed, carModificationsSeed } from "../src/app/data/cars";
import { categoriesSeed } from "../src/app/data/categories";
import { manufacturersSeed } from "../src/app/data/manufacturers";
import { productsSeed, FitType } from "../src/app/data/products";

console.log("Очищення таблиць (користувачі залишаються)...");
db.exec(`
  DELETE FROM product_compatibility;
  DELETE FROM order_items;
  DELETE FROM orders;
  DELETE FROM products;
  DELETE FROM categories;
  DELETE FROM manufacturers;
  DELETE FROM car_modifications;
  DELETE FROM car_models;
  DELETE FROM car_brands;
  DELETE FROM sqlite_sequence WHERE name IN
    ('products','categories','manufacturers','car_modifications','car_models','car_brands','orders','order_items');
`);

// чи підходить модифікація під правило сумісності товару
function fits(fit: FitType, brand: string, model: string, engineType: string): boolean {
  if (fit === null) return true;
  if (fit.fuel && fit.fuel !== engineType) return false;

  const hasBrandRule = !!fit.brands?.length;
  const hasModelRule = !!fit.models?.length;
  if (!hasBrandRule && !hasModelRule) return true; // лише обмеження за паливом

  return (
    (hasBrandRule && fit.brands!.includes(brand)) ||
    (hasModelRule && fit.models!.includes(`${brand} ${model}`))
  );
}

const seed = db.transaction(() => {
  console.log("Марки авто...");
  const brandIds = new Map<string, number>();
  for (const name of carBrandsSeed) {
    const r = db.prepare("INSERT INTO car_brands (name) VALUES (?)").run(name);
    brandIds.set(name, Number(r.lastInsertRowid));
  }

  console.log("Моделі авто...");
  const modelIds = new Map<string, number>();
  for (const { brand, name } of carModelsSeed) {
    const r = db
      .prepare("INSERT INTO car_models (brand_id, name) VALUES (?, ?)")
      .run(brandIds.get(brand), name);
    modelIds.set(`${brand}/${name}`, Number(r.lastInsertRowid));
  }

  console.log("Модифікації...");
  // зберігаємо ВСІ модифікації (а не лише останню для моделі)
  const modifications: { id: number; brand: string; model: string; engineType: string }[] = [];
  for (const m of carModificationsSeed) {
    const r = db
      .prepare(
        `INSERT INTO car_modifications (model_id, year_from, year_to, body_type, engine_type, engine_volume)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(modelIds.get(`${m.brand}/${m.model}`), m.yearFrom, m.yearTo, m.bodyType, m.engineType, m.engineVolume);
    modifications.push({
      id: Number(r.lastInsertRowid),
      brand: m.brand,
      model: m.model,
      engineType: m.engineType,
    });
  }

  console.log("Категорії...");
  const categoryIds = new Map<string, number>();
  for (const c of categoriesSeed.filter((c) => c.parent === null)) {
    const r = db
      .prepare("INSERT INTO categories (parent_id, name_uk, name_en, slug) VALUES (NULL, ?, ?, ?)")
      .run(c.nameUk, c.nameEn, c.slug);
    categoryIds.set(c.slug, Number(r.lastInsertRowid));
  }
  for (const c of categoriesSeed.filter((c) => c.parent !== null)) {
    const r = db
      .prepare("INSERT INTO categories (parent_id, name_uk, name_en, slug) VALUES (?, ?, ?, ?)")
      .run(categoryIds.get(c.parent!), c.nameUk, c.nameEn, c.slug);
    categoryIds.set(c.slug, Number(r.lastInsertRowid));
  }

  console.log("Виробники...");
  const manufacturerIds = new Map<string, number>();
  for (const m of manufacturersSeed) {
    const r = db
      .prepare("INSERT INTO manufacturers (name, country) VALUES (?, ?)")
      .run(m.name, m.country);
    manufacturerIds.set(m.name, Number(r.lastInsertRowid));
  }

  console.log("Товари та сумісність...");
  const insertProduct = db.prepare(
    `INSERT INTO products
       (category_id, manufacturer_id, name_uk, name_en, article_number, price, stock_quantity, description_uk, description_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );
  const insertCompat = db.prepare(
    "INSERT INTO product_compatibility (product_id, modification_id) VALUES (?, ?)"
  );

  let compatRows = 0;
  for (const p of productsSeed) {
    const categoryId = categoryIds.get(p.categorySlug);
    const manufacturerId = manufacturerIds.get(p.manufacturer);
    if (!categoryId) throw new Error(`Невідома категорія: ${p.categorySlug}`);
    if (!manufacturerId) throw new Error(`Невідомий виробник: ${p.manufacturer}`);

    const r = insertProduct.run(
      categoryId, manufacturerId, p.nameUk, p.nameEn, p.articleNumber,
      p.price, p.stockQuantity, p.descriptionUk, p.descriptionEn
    );
    const productId = Number(r.lastInsertRowid);

    for (const mod of modifications) {
      if (fits(p.fit, mod.brand, mod.model, mod.engineType)) {
        insertCompat.run(productId, mod.id);
        compatRows++;
      }
    }
  }

  console.log(
    `Готово: ${carBrandsSeed.length} марок, ${carModelsSeed.length} моделей, ` +
      `${modifications.length} модифікацій, ${categoriesSeed.length} категорій, ` +
      `${manufacturersSeed.length} виробників, ${productsSeed.length} товарів, ` +
      `${compatRows} зв'язків сумісності.`
  );
});

seed();
