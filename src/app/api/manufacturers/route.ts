import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const manufacturers = db
    .prepare("SELECT id, name, country FROM manufacturers ORDER BY name")
    .all();

  return NextResponse.json(manufacturers);
}