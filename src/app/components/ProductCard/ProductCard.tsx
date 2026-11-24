import Link from "next/link";
import { ProductCardProps } from "@/app/types/ProductCardProps";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/app/components/ProductImage/ProductImage";
import StockBadge from "@/app/components/StockBadge/StockBadge";
import FavoriteButton from "@/app/components/FavoriteButton/FavoriteButton";
import CompareButton from "@/app/components/CompareButton/CompareButton";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const href = `/product/${product.id}`;

  return (
    <div
      className="card-lift animate-fade-up group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card"
      style={{ animationDelay: `${Math.min(index, 11) * 40}ms` }}
    >
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
        <FavoriteButton productId={product.id} />
        <CompareButton productId={product.id} />
      </div>

      <Link href={href} className="block p-3 pb-0">
        <div className="transition duration-300 group-hover:scale-[1.03]">
          <ProductImage
            imageUrl={product.imageUrl}
            alt={product.nameUk}
            categorySlug={product.categorySlug}
            parentSlug={product.parentSlug}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-brand">
          {product.manufacturerName}
        </p>
        <Link href={href}>
          <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug hover:text-brand">
            {product.nameUk}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-muted">Арт. {product.articleNumber}</p>

        <div className="mt-auto pt-3">
          <StockBadge quantity={product.stockQuantity} />
          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-lg font-extrabold">{formatPrice(product.price)}</span>
            <AddToCartButton product={product} compact />
          </div>
        </div>
      </div>
    </div>
  );
}
