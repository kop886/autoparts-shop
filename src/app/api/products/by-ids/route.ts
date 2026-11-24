import { NextRequest, NextResponse } from "next/server";
import { getProductsByIds } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const idsParam = request.nextUrl.searchParams.get("ids") || "";
  const ids = idsParam
    .split(",")
    .map(Number)
    .filter((n) => Number.isInteger(n) && n > 0)
    .slice(0, 50);

  const modificationId = Number(request.nextUrl.searchParams.get("modificationId")) || undefined;

  return NextResponse.json(getProductsByIds(ids, modificationId));
}
