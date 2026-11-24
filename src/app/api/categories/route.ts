import { NextResponse } from "next/server";
import { getCategoryTree } from "@/lib/queries";

export async function GET() {
  return NextResponse.json(getCategoryTree());
}
