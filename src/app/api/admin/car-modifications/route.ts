import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const modelId = request.nextUrl.searchParams.get("modelId");
  if (!modelId) return NextResponse.json({ error: "Не вказано modelId" }, { status: 400 });

  const modifications = db
    .prepare(
      `SELECT id, model_id AS modelId, year_from AS yearFrom, year_to AS yearTo,
              body_type AS bodyType, engine_type AS engineType, engine_volume AS engineVolume
       FROM car_modifications WHERE model_id = ? ORDER BY year_from`
    )
    .all(modelId);

  return NextResponse.json(modifications);
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { modelId, yearFrom, yearTo, bodyType, engineType, engineVolume } = await request.json();

  if (!modelId || !yearFrom || !bodyType || !engineType || !engineVolume) {
    return NextResponse.json({ error: "Заповніть усі обов'язкові поля" }, { status: 400 });
  }

  const result = db
    .prepare(
      `INSERT INTO car_modifications (model_id, year_from, year_to, body_type, engine_type, engine_volume)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(modelId, yearFrom, yearTo || null, bodyType, engineType, engineVolume);

  return NextResponse.json({ id: result.lastInsertRowid });
}