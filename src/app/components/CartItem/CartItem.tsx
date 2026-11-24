import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, Package } from "lucide-react";
import { CartItemProps } from "@/app/types/CartItemProps";
import { formatPrice } from "@/lib/format";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  const atLimit = item.stockQuantity !== undefined && item.quantity >= item.stockQuantity;

  return (
    <div className="flex flex-wrap items-center gap-4 py-4 sm:flex-nowrap">
      <Link
        href={`/product/${item.productId}`}
        className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-soft"
      >
        {item.imageUrl ? (
          <Image src={item.imageUrl} alt={item.nameUk} fill unoptimized className="object-contain p-1" />
        ) : (
          <Package size={30} className="text-muted/60" />
        )}
      </Link>

      <div className="min-w-0 flex-1">
        <Link href={`/product/${item.productId}`} className="font-semibold leading-snug hover:text-brand">
          {item.nameUk}
        </Link>
        <p className="mt-0.5 text-sm text-muted">{formatPrice(item.price)} за шт.</p>
        {atLimit && <p className="mt-0.5 text-xs text-amber-500">Максимум на складі</p>}
      </div>

      <div className="flex items-center rounded-lg border border-line">
        <button onClick={onDecrease} className="p-2 text-muted hover:text-brand" aria-label="Менше">
          <Minus size={14} />
        </button>
        <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
        <button
          onClick={onIncrease}
          disabled={atLimit}
          className="p-2 text-muted hover:text-brand disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Більше"
        >
          <Plus size={14} />
        </button>
      </div>

      <span className="w-28 text-right text-lg font-extrabold">
        {formatPrice(item.price * item.quantity)}
      </span>

      <button onClick={onRemove} className="text-muted transition hover:text-red-500" aria-label="Видалити">
        <Trash2 size={18} />
      </button>
    </div>
  );
}
