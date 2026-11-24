import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cars = db
    .prepare(
      `SELECT cm.id AS modificationId, cb.name AS brandName, cmod.name AS modelName,
              cm.year_from AS yearFrom, cm.year_to AS yearTo,
              cm.body_type AS bodyType, cm.engine_type AS engineType, cm.engine_volume AS engineVolume
       FROM product_compatibility pc
       JOIN car_modifications cm ON cm.id = pc.modification_id
       JOIN car_models cmod ON cmod.id = cm.model_id
       JOIN car_brands cb ON cb.id = cmod.brand_id
       WHERE pc.product_id = ?
       ORDER BY cb.name, cmod.name`
    )
    .all(id);

  return NextResponse.json(cars);
}