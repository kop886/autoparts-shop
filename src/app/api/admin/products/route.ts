import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";
import { PRODUCT_SELECT } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const products = db.prepare(`${PRODUCT_SELECT} ORDER BY p.id DESC`).all();

  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const body = await request.json();
  const {
    categoryId, manufacturerId, nameUk, nameEn, articleNumber,
    price, stockQuantity, imageUrl, descriptionUk, descriptionEn,
    compatibleModificationIds,
  } = body;

  if (!categoryId || !manufacturerId || !nameUk || !nameEn || !articleNumber || !price) {
    return NextResponse.json({ error: "Заповніть усі обов'язкові поля" }, { status: 400 });
  }

  try {
    const result = db
      .prepare(
        `INSERT INTO products
           (category_id, manufacturer_id, name_uk, name_en, article_number, price, stock_quantity, image_url, description_uk, description_en)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        categoryId, manufacturerId, nameUk, nameEn, articleNumber,
        price, stockQuantity || 0, imageUrl || null, descriptionUk || null, descriptionEn || null
      );

    const productId = result.lastInsertRowid as number;

    const insertCompat = db.prepare(
      "INSERT INTO product_compatibility (product_id, modification_id) VALUES (?, ?)"
    );
    for (const modId of compatibleModificationIds || []) {
      insertCompat.run(productId, modId);
    }

    return NextResponse.json({ id: productId });
  } catch {
    return NextResponse.json({ error: "Товар з таким артикулом вже існує" }, { status: 400 });
  }
}