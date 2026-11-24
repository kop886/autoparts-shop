import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const manufacturers = db
    .prepare("SELECT id, name, country FROM manufacturers ORDER BY name")
    .all();
  return NextResponse.json(manufacturers);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { name, country } = await request.json();
  if (!name || !String(name).trim()) {
    return NextResponse.json({ error: "Вкажіть назву" }, { status: 400 });
  }

  try {
    const result = db
      .prepare("INSERT INTO manufacturers (name, country) VALUES (?, ?)")
      .run(String(name).trim(), country ? String(country).trim() : null);
    return NextResponse.json({ id: result.lastInsertRowid });
  } catch {
    return NextResponse.json({ error: "Такий виробник вже існує" }, { status: 400 });
  }
}
