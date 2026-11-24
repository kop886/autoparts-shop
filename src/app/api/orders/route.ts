import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

type IncomingItem = { productId: number; quantity: number };
type ProductRow = { id: number; name_uk: string; price: number; stock_quantity: number };

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  const user = token ? await verifyToken(token) : null;

  if (!user) {
    return NextResponse.json({ error: "Увійдіть, щоб оформити замовлення" }, { status: 401 });
  }

  const { items, phone, address } = (await request.json()) as {
    items: IncomingItem[];
    phone: string;
    address: string;
  };

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Кошик порожній" }, { status: 400 });
  }
  if (!phone || String(phone).replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Введіть коректний номер телефону" }, { status: 400 });
  }
  if (!address || String(address).trim().length < 5) {
    return NextResponse.json({ error: "Вкажіть адресу доставки" }, { status: 400 });
  }

  const getProduct = db.prepare(
    "SELECT id, name_uk, price, stock_quantity FROM products WHERE id = ?"
  );
  const insertOrder = db.prepare(
    `INSERT INTO orders (user_id, status, total_price, phone, address) VALUES (?, 'new', ?, ?, ?)`
  );
  const insertItem = db.prepare(
    `INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES (?, ?, ?, ?, ?)`
  );
  const reduceStock = db.prepare(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?"
  );

  // Усе в одній транзакції: або замовлення створюється повністю, або нічого
  const createOrder = db.transaction(() => {
    let total = 0;
    const rows: { product: ProductRow; quantity: number }[] = [];

    for (const item of items) {
      const quantity = Number(item.quantity);
      const product = getProduct.get(item.productId) as ProductRow | undefined;

      if (!product) throw new Error("Один із товарів більше не продається");
      if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Невірна кількість товару");
      if (product.stock_quantity < quantity) {
        throw new Error(
          `Недостатньо на складі: «${product.name_uk}» (залишилось ${product.stock_quantity} шт.)`
        );
      }

      // ціну беремо з бази, а не з браузера — її не можна підробити
      total += product.price * quantity;
      rows.push({ product, quantity });
    }

    const orderId = insertOrder.run(user.id, total, String(phone).trim(), String(address).trim())
      .lastInsertRowid as number;

    for (const { product, quantity } of rows) {
      insertItem.run(orderId, product.id, product.name_uk, product.price, quantity);
      reduceStock.run(quantity, product.id);
    }

    return orderId;
  });

  try {
    const orderId = createOrder();
    return NextResponse.json({ orderId });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Не вдалося оформити замовлення";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
