import { NextRequest, NextResponse } from "next/server";
import { getProductById } from "@/lib/queries";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    return NextResponse.json({ error: "Товар не знайдено" }, { status: 404 });
  }
  return NextResponse.json(product);
}
