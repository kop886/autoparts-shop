"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/app/components/CartItem/CartItem";
import CartSummary from "@/app/components/CartSummary/CartSummary";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function CartList() {
  const { items, increaseItem, decreaseItem, removeItem, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Кошик порожній"
        text="Додайте товари з каталогу — вони з'являться тут."
        action={
          <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
            Перейти до каталогу
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <div className="rounded-2xl border border-line bg-card px-5">
        <div className="divide-y divide-line">
          {items.map((item) => (
            <CartItem
              key={item.productId}
              item={item}
              onIncrease={() => increaseItem(item.productId)}
              onDecrease={() => decreaseItem(item.productId)}
              onRemove={() => removeItem(item.productId)}
            />
          ))}
        </div>
        <div className="border-t border-line py-3">
          <button onClick={clearCart} className="flex items-center gap-1.5 text-sm text-muted hover:text-red-500">
            <Trash2 size={15} /> Очистити кошик
          </button>
        </div>
      </div>

      <CartSummary>
        <Link
          href="/checkout"
          className="block w-full rounded-xl bg-brand py-3 text-center font-bold text-white transition hover:bg-brand-dark active:scale-[0.98]"
        >
          Оформити замовлення
        </Link>
      </CartSummary>
    </div>
  );
}
