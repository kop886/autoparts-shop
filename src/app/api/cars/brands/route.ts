import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const brands = db.prepare("SELECT id, name FROM car_brands ORDER BY name").all();
  return NextResponse.json(brands);
}