import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const brands = db.prepare("SELECT id, name FROM car_brands ORDER BY name").all();
  return NextResponse.json(brands);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: "Вкажіть назву марки" }, { status: 400 });

  try {
    const result = db.prepare("INSERT INTO car_brands (name) VALUES (?)").run(name);
    return NextResponse.json({ id: result.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: "Така марка вже існує" }, { status: 400 });
  }
}