"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";

// Блок «Разом» — використовується в кошику та на оформленні замовлення
export default function CartSummary({ children }: { children?: React.ReactNode }) {
  const { items, totalPrice, totalCount } = useCart();

  return (
    <div className="sticky top-28 rounded-2xl border border-line bg-card p-5">
      <h2 className="mb-4 text-lg font-bold">Ваше замовлення</h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-muted">
          <span>Товарів ({totalCount} шт.)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Доставка</span>
          <span>За тарифами перевізника</span>
        </div>
      </div>

      <div className="my-4 flex items-end justify-between border-t border-line pt-4">
        <span className="font-semibold">Разом</span>
        <span className="text-2xl font-extrabold text-brand">{formatPrice(totalPrice)}</span>
      </div>

      {items.length > 0 && children}
    </div>
  );
}
