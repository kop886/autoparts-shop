import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const categories = db
    .prepare(
      `SELECT c.id, c.parent_id AS parentId, c.name_uk AS nameUk, c.name_en AS nameEn, c.slug,
              p.name_uk AS parentNameUk
       FROM categories c
       LEFT JOIN categories p ON p.id = c.parent_id
       ORDER BY c.parent_id IS NOT NULL, c.name_uk`
    )
    .all();

  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { nameUk, nameEn, slug, parentId } = await request.json();

  if (!nameUk || !nameEn || !slug) {
    return NextResponse.json({ error: "Заповніть усі поля" }, { status: 400 });
  }

  try {
    const result = db
      .prepare("INSERT INTO categories (parent_id, name_uk, name_en, slug) VALUES (?, ?, ?, ?)")
      .run(parentId || null, nameUk, nameEn, slug);

    return NextResponse.json({ id: result.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: "Категорія з таким slug вже існує" }, { status: 400 });
  }
}