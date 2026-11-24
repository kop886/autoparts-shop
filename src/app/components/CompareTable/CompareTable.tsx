"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Scale, X, Check, Minus } from "lucide-react";
import { ProductDetailType } from "@/app/types/ProductDetailType";
import { useCompare } from "@/hooks/useCompare";
import { useCar } from "@/hooks/useCar";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/app/components/ProductImage/ProductImage";
import StockBadge from "@/app/components/StockBadge/StockBadge";
import AddToCartButton from "@/app/components/AddToCartButton/AddToCartButton";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function CompareTable() {
  const { compareIds, toggleCompare, clearCompare } = useCompare();
  const { selectedCar } = useCar();
  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [loading, setLoading] = useState(true);

  const idsKey = compareIds.join(",");
  const carId = selectedCar?.modificationId;

  useEffect(() => {
    if (!idsKey) {
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const query = new URLSearchParams({ ids: idsKey });
    if (carId) query.set("modificationId", String(carId));

    fetch(`/api/products/by-ids?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [idsKey, carId]);

  if (loading) return <div className="skeleton h-72 w-full" />;

  if (compareIds.length === 0 || products.length === 0) {
    return (
      <EmptyState
        icon={Scale}
        title="Немає товарів для порівняння"
        text="Натисніть на іконку терезів на картці товару, щоб додати його (до 4 товарів)."
        action={
          <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
            До каталогу
          </Link>
        }
      />
    );
  }

  const cheapest = Math.min(...products.map((p) => p.price));

  // рядки таблиці: назва характеристики + як її показати для кожного товару
  const rows: { label: string; render: (p: ProductDetailType) => React.ReactNode }[] = [
    {
      label: "Ціна",
      render: (p) => (
        <span className={`text-lg font-extrabold ${p.price === cheapest && products.length > 1 ? "text-green-600" : ""}`}>
          {formatPrice(p.price)}
          {p.price === cheapest && products.length > 1 && (
            <span className="ml-2 rounded-full bg-green-500/10 px-2 py-0.5 text-[11px] font-semibold">найдешевший</span>
          )}
        </span>
      ),
    },
    { label: "Виробник", render: (p) => p.manufacturerName },
    { label: "Країна", render: (p) => p.manufacturerCountry ?? "—" },
    { label: "Артикул", render: (p) => p.articleNumber },
    { label: "Категорія", render: (p) => p.categoryNameUk },
    { label: "Наявність", render: (p) => <StockBadge quantity={p.stockQuantity} /> },
  ];

  if (selectedCar) {
    rows.push({
      label: `Підходить до ${selectedCar.brandName} ${selectedCar.modelName}`,
      render: (p) =>
        p.fitsCar ? (
          <span className="inline-flex items-center gap-1 font-semibold text-green-600"><Check size={16} /> Так</span>
        ) : (
          <span className="inline-flex items-center gap-1 font-semibold text-red-500"><Minus size={16} /> Ні</span>
        ),
    });
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={clearCompare} className="text-sm text-muted hover:text-red-500">
          Очистити порівняння
        </button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr>
              <th className="w-44 p-4" />
              {products.map((p) => (
                <th key={p.id} className="relative min-w-[200px] p-4 align-top font-normal">
                  <button
                    onClick={() => toggleCompare(p.id)}
                    className="absolute right-2 top-2 rounded-full p-1 text-muted hover:bg-soft hover:text-red-500"
                    aria-label="Прибрати"
                  >
                    <X size={16} />
                  </button>
                  <Link href={`/product/${p.id}`} className="block">
                    <div className="mx-auto mb-3 w-32">
                      <ProductImage
                        imageUrl={p.imageUrl}
                        alt={p.nameUk}
                        categorySlug={p.categorySlug}
                        parentSlug={p.parentSlug}
                      />
                    </div>
                    <p className="text-left font-semibold leading-snug hover:text-brand">{p.nameUk}</p>
                  </Link>
                  <div className="mt-3 flex">
                    <AddToCartButton product={p} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <td className="bg-soft/50 p-4 font-medium text-muted">{row.label}</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4">{row.render(p)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
