import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { id } = await params;

  const product = db
    .prepare(
      `SELECT id, category_id AS categoryId, manufacturer_id AS manufacturerId,
              name_uk AS nameUk, name_en AS nameEn, article_number AS articleNumber,
              price, stock_quantity AS stockQuantity, image_url AS imageUrl,
              description_uk AS descriptionUk, description_en AS descriptionEn
       FROM products WHERE id = ?`
    )
    .get(id);

  if (!product) return NextResponse.json({ error: "Товар не знайдено" }, { status: 404 });

  const compatibleModificationIds = (
    db.prepare("SELECT modification_id FROM product_compatibility WHERE product_id = ?").all(id) as {
      modification_id: number;
    }[]
  ).map((row) => row.modification_id);

  return NextResponse.json({ ...product, compatibleModificationIds });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();
  const {
    categoryId, manufacturerId, nameUk, nameEn, articleNumber,
    price, stockQuantity, imageUrl, descriptionUk, descriptionEn,
    compatibleModificationIds,
  } = body;

  try {
    db.prepare(
      `UPDATE products SET
         category_id = ?, manufacturer_id = ?, name_uk = ?, name_en = ?, article_number = ?,
         price = ?, stock_quantity = ?, image_url = ?, description_uk = ?, description_en = ?
       WHERE id = ?`
    ).run(
      categoryId, manufacturerId, nameUk, nameEn, articleNumber,
      price, stockQuantity || 0, imageUrl || null, descriptionUk || null, descriptionEn || null, id
    );

    db.prepare("DELETE FROM product_compatibility WHERE product_id = ?").run(id);
    const insertCompat = db.prepare(
      "INSERT INTO product_compatibility (product_id, modification_id) VALUES (?, ?)"
    );
    for (const modId of compatibleModificationIds || []) {
      insertCompat.run(id, modId);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Не вдалося оновити товар" }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { id } = await params;

  try {
    db.prepare("DELETE FROM product_compatibility WHERE product_id = ?").run(id);
    db.prepare("DELETE FROM products WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Неможливо видалити: товар присутній у замовленнях" },
      { status: 400 }
    );
  }
}