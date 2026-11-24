import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/lib/queries";

// перетворює параметр адреси у число (або undefined, якщо порожньо)
function toNumber(value: string | null): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

export async function GET(request: NextRequest) {
  const p = request.nextUrl.searchParams;

  const categorySlug = p.get("category");
  if (!categorySlug) {
    return NextResponse.json({ error: "Не вказано категорію" }, { status: 400 });
  }

  const products = getProducts({
    categorySlug,
    modificationId: toNumber(p.get("modificationId")),
    manufacturerId: toNumber(p.get("manufacturerId")),
    minPrice: toNumber(p.get("minPrice")),
    maxPrice: toNumber(p.get("maxPrice")),
    inStock: p.get("inStock") === "1",
    sort: p.get("sort") || "name",
  });

  return NextResponse.json(products);
}
