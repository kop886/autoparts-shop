import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const brandId = request.nextUrl.searchParams.get("brandId");

  if (!brandId) {
    return NextResponse.json({ error: "Не вказано brandId" }, { status: 400 });
  }

  const models = db
    .prepare("SELECT id, brand_id AS brandId, name FROM car_models WHERE brand_id = ? ORDER BY name")
    .all(brandId);

  return NextResponse.json(models);
}