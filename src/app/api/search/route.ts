import { NextRequest, NextResponse } from "next/server";
import { searchProducts } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") || "";
  const limit = Number(request.nextUrl.searchParams.get("limit")) || 6;
  return NextResponse.json(searchProducts(q, Math.min(limit, 50)));
}
