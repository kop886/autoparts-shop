import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return NextResponse.json({ error: "Не авторизовано" }, { status: 401 });
  }

  const orders = db
    .prepare(
      `SELECT id, user_id AS userId, status, total_price AS totalPrice,
              phone, address, created_at AS createdAt
       FROM orders WHERE user_id = ? ORDER BY created_at DESC`
    )
    .all(user.id) as { id: number }[];

  const getItems = db.prepare(
    `SELECT id, order_id AS orderId, product_id AS productId,
            product_name AS productName, price, quantity
     FROM order_items WHERE order_id = ?`
  );

  const ordersWithItems = orders.map((order) => ({
    ...order,
    items: getItems.all(order.id),
  }));

  return NextResponse.json(ordersWithItems);
}