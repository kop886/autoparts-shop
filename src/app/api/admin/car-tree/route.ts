import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const brands = db.prepare("SELECT id, name FROM car_brands ORDER BY name").all() as {
    id: number;
    name: string;
  }[];

  const getModels = db.prepare("SELECT id, name FROM car_models WHERE brand_id = ? ORDER BY name");
  const getModifications = db.prepare(
    `SELECT id, model_id AS modelId, year_from AS yearFrom, year_to AS yearTo,
            body_type AS bodyType, engine_type AS engineType, engine_volume AS engineVolume
     FROM car_modifications WHERE model_id = ? ORDER BY year_from`
  );

  const tree = brands.map((brand) => {
    const models = getModels.all(brand.id) as { id: number; name: string }[];
    return {
      ...brand,
      models: models.map((model) => ({
        ...model,
        modifications: getModifications.all(model.id),
      })),
    };
  });

  return NextResponse.json(tree);
}