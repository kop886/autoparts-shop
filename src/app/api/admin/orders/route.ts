import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const orders = db
    .prepare(
      `SELECT o.id, o.user_id AS userId, o.status, o.total_price AS totalPrice,
              o.phone, o.address, o.created_at AS createdAt,
              u.name AS userName, u.email AS userEmail
       FROM orders o
       JOIN users u ON u.id = o.user_id
       ORDER BY o.created_at DESC`
    )
    .all() as { id: number }[];

  const getItems = db.prepare(
    `SELECT id, order_id AS orderId, product_id AS productId,
            product_name AS productName, price, quantity
     FROM order_items WHERE order_id = ?`
  );

  const result = orders.map((order) => ({ ...order, items: getItems.all(order.id) }));

  return NextResponse.json(result);
}