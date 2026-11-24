"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { ProductDetailType } from "@/app/types/ProductDetailType";
import { CompatibleCarType } from "@/app/types/CompatibleCarType";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/app/components/ProductImage/ProductImage";
import StockBadge from "@/app/components/StockBadge/StockBadge";
import FavoriteButton from "@/app/components/FavoriteButton/FavoriteButton";
import CompareButton from "@/app/components/CompareButton/CompareButton";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import FitmentNotice from "@/app/components/FitmentNotice/FitmentNotice";
import CompatibilityBadge from "@/app/components/CompatibilityBadge/CompatibilityBadge";

export default function ProductDetail({ product }: { product: ProductDetailType }) {
  const [compatibleCars, setCompatibleCars] = useState<CompatibleCarType[] | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/products/${product.id}/compatibility`)
      .then((res) => res.json())
      .then(setCompatibleCars);
  }, [product.id]);

  // групуємо сумісні авто за маркою
  const byBrand = new Map<string, CompatibleCarType[]>();
  for (const car of compatibleCars ?? []) {
    byBrand.set(car.brandName, [...(byBrand.get(car.brandName) ?? []), car]);
  }

  const maxQty = Math.max(1, product.stockQuantity);
  const specs = [
    ["Артикул", product.articleNumber],
    ["Виробник", product.manufacturerName],
    ["Країна виробника", product.manufacturerCountry ?? "—"],
    ["Категорія", product.categoryNameUk],
  ];

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Фото */}
        <div className="animate-fade-up">
          <div className="rounded-3xl border border-line bg-card p-4">
            <ProductImage
              imageUrl={product.imageUrl}
              alt={product.nameUk}
              categorySlug={product.categorySlug}
              parentSlug={product.parentSlug}
              size="lg"
            />
          </div>
        </div>

        {/* Інформація */}
        <div className="animate-fade-up delay-1">
          <p className="text-sm font-bold uppercase tracking-wide text-brand">
            {product.manufacturerName}
          </p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">
            {product.nameUk}
          </h1>
          <p className="mt-2 text-sm text-muted">Артикул: {product.articleNumber}</p>

          <div className="mt-5 rounded-2xl border border-line bg-card p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
              <StockBadge quantity={product.stockQuantity} />
            </div>

            <div className="mt-4">
              <FitmentNotice compatibleCars={compatibleCars ?? []} />
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center rounded-lg border border-line">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2.5 text-muted hover:text-brand"
                  aria-label="Менше"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  className="p-2.5 text-muted hover:text-brand"
                  aria-label="Більше"
                >
                  <Plus size={16} />
                </button>
              </div>

              <AddToCartButton product={product} quantity={quantity} />
              <FavoriteButton productId={product.id} className="h-11 w-11" />
              <CompareButton productId={product.id} className="h-11 w-11" />
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            {[
              { icon: Truck, text: "Доставка Новою поштою 1–3 дні" },
              { icon: ShieldCheck, text: "Гарантія 12 місяців" },
              { icon: RotateCcw, text: "Повернення протягом 14 днів" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-xl bg-soft px-3 py-2.5 text-muted">
                <Icon size={18} className="shrink-0 text-brand" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Опис і характеристики */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-3 text-xl font-bold">Опис</h2>
          <p className="leading-relaxed text-muted">
            {product.descriptionUk || "Опис товару поки відсутній."}
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-bold">Характеристики</h2>
          <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
            {specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 px-4 py-3 text-sm">
                <span className="text-muted">{label}</span>
                <span className="text-right font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Сумісність */}
      <div className="mt-10">
        <h2 className="mb-1 text-xl font-bold">Підходить до авто</h2>
        <p className="mb-4 text-sm text-muted">
          {compatibleCars === null
            ? "Завантаження..."
            : `Сумісних модифікацій: ${compatibleCars.length}`}
        </p>

        {compatibleCars !== null && compatibleCars.length === 0 && (
          <p className="text-sm text-muted">Немає даних про сумісність.</p>
        )}

        <div className="space-y-2">
          {[...byBrand.entries()].map(([brand, cars]) => (
            <details key={brand} className="group rounded-xl border border-line bg-card">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-semibold hover:text-brand">
                {brand}
                <span className="rounded-full bg-soft px-2.5 py-0.5 text-xs font-medium text-muted">
                  {cars.length}
                </span>
              </summary>
              <div className="grid gap-2 border-t border-line p-3 sm:grid-cols-2">
                {cars.map((car) => (
                  <CompatibilityBadge key={car.modificationId} car={car} />
                ))}
              </div>
            </details>
          ))}
        </div>

        <Link href="/select-car" className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
          Не знайшли своє авто? Додайте його в гараж →
        </Link>
      </div>
    </div>
  );
}
