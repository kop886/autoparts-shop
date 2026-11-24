"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/useToast";
import { ProductListItemType } from "@/app/types/ProductListItemType";

// Додає товар у кошик (з урахуванням залишку на складі)
export default function AddToCartButton({
  product,
  quantity = 1,
  compact = false,
}: {
  product: ProductListItemType;
  quantity?: number;
  compact?: boolean;
}) {
  const { items, addItem } = useCart();
  const { showToast } = useToast();
  const outOfStock = product.stockQuantity <= 0;

  const handleClick = () => {
    const inCart = items.find((i) => i.productId === product.id)?.quantity ?? 0;
    if (inCart + quantity > product.stockQuantity) {
      showToast(`На складі лише ${product.stockQuantity} шт.`, "error");
      return;
    }
    addItem(
      {
        productId: product.id,
        nameUk: product.nameUk,
        nameEn: product.nameEn,
        price: product.price,
        imageUrl: product.imageUrl,
        stockQuantity: product.stockQuantity,
      },
      quantity
    );
    showToast("Товар додано в кошик");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={outOfStock}
      className={`flex items-center justify-center gap-2 rounded-lg bg-brand font-semibold text-white transition hover:bg-brand-dark active:scale-95 disabled:cursor-not-allowed disabled:bg-line disabled:text-muted ${
        compact ? "h-9 w-9" : "flex-1 py-2.5"
      }`}
      title="Додати в кошик"
    >
      <ShoppingCart size={compact ? 17 : 18} />
      {!compact && "Додати в кошик"}
    </button>
  );
}
