import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const brandId = request.nextUrl.searchParams.get("brandId");
  if (!brandId) return NextResponse.json({ error: "Не вказано brandId" }, { status: 400 });

  const models = db
    .prepare("SELECT id, brand_id AS brandId, name FROM car_models WHERE brand_id = ? ORDER BY name")
    .all(brandId);

  return NextResponse.json(models);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { brandId, name } = await request.json();
  if (!brandId || !name) return NextResponse.json({ error: "Заповніть усі поля" }, { status: 400 });

  const result = db.prepare("INSERT INTO car_models (brand_id, name) VALUES (?, ?)").run(brandId, name);
  return NextResponse.json({ id: result.lastInsertRowid });
}