import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/adminAuth";

const count = (sql: string) => (db.prepare(sql).get() as { count: number }).count;

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const revenue = (
    db
      .prepare("SELECT COALESCE(SUM(total_price), 0) AS sum FROM orders WHERE status != 'cancelled'")
      .get() as { sum: number }
  ).sum;

  const statusRows = db
    .prepare("SELECT status, COUNT(*) AS count FROM orders GROUP BY status")
    .all() as { status: string; count: number }[];
  const ordersByStatus: Record<string, number> = {};
  for (const row of statusRows) ordersByStatus[row.status] = row.count;

  const recentOrders = db
    .prepare(
      `SELECT o.id, o.status, o.total_price AS totalPrice, o.created_at AS createdAt, u.name AS userName
       FROM orders o JOIN users u ON u.id = o.user_id
       ORDER BY o.created_at DESC, o.id DESC LIMIT 5`
    )
    .all();

  const lowStock = db
    .prepare(
      `SELECT id, name_uk AS nameUk, article_number AS articleNumber, stock_quantity AS stockQuantity
       FROM products WHERE stock_quantity <= 5 ORDER BY stock_quantity ASC, name_uk LIMIT 8`
    )
    .all();

  return NextResponse.json({
    productsCount: count("SELECT COUNT(*) AS count FROM products"),
    ordersCount: count("SELECT COUNT(*) AS count FROM orders"),
    newOrdersCount: count("SELECT COUNT(*) AS count FROM orders WHERE status = 'new'"),
    categoriesCount: count("SELECT COUNT(*) AS count FROM categories"),
    usersCount: count("SELECT COUNT(*) AS count FROM users"),
    revenue,
    ordersByStatus,
    recentOrders,
    lowStock,
  });
}
