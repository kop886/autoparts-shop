import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const modelId = request.nextUrl.searchParams.get("modelId");

  if (!modelId) {
    return NextResponse.json({ error: "Не вказано modelId" }, { status: 400 });
  }

  const modifications = db
    .prepare(
      `SELECT id, model_id AS modelId, year_from AS yearFrom, year_to AS yearTo,
              body_type AS bodyType, engine_type AS engineType, engine_volume AS engineVolume
       FROM car_modifications WHERE model_id = ? ORDER BY year_from`
    )
    .all(modelId);

  return NextResponse.json(modifications);
}