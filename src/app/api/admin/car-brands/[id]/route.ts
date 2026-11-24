import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { id } = await params;

  try {
    db.prepare("DELETE FROM car_brands WHERE id = ?").run(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Неможливо видалити: є пов'язані моделі" }, { status: 400 });
  }
}