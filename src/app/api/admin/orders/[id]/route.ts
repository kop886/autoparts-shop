import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const allowedStatuses = ["new", "processing", "shipped", "completed", "cancelled"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const { id } = await params;
  const { status } = await request.json();

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Невірний статус" }, { status: 400 });
  }

  const order = db.prepare("SELECT status FROM orders WHERE id = ?").get(id) as
    | { status: string }
    | undefined;
  if (!order) return NextResponse.json({ error: "Замовлення не знайдено" }, { status: 404 });

  const items = db
    .prepare("SELECT product_id AS productId, quantity FROM order_items WHERE order_id = ?")
    .all(id) as { productId: number; quantity: number }[];

  const update = db.transaction(() => {
    // скасували замовлення — повертаємо товари на склад
    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of items) {
        db.prepare("UPDATE products SET stock_quantity = stock_quantity + ? WHERE id = ?").run(
          item.quantity,
          item.productId
        );
      }
    }
    // відновили скасоване — знову списуємо зі складу (не нижче нуля)
    if (order.status === "cancelled" && status !== "cancelled") {
      for (const item of items) {
        db.prepare(
          "UPDATE products SET stock_quantity = MAX(0, stock_quantity - ?) WHERE id = ?"
        ).run(item.quantity, item.productId);
      }
    }
    db.prepare("UPDATE orders SET status = ? WHERE id = ?").run(status, id);
  });

  update();
  return NextResponse.json({ success: true });
}
