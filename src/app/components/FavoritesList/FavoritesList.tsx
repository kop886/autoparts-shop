"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductDetailType } from "@/app/types/ProductDetailType";
import { useFavorites } from "@/hooks/useFavorites";
import ProductList from "@/app/components/ProductList/ProductList";
import ProductSkeleton from "@/app/components/ProductSkeleton/ProductSkeleton";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function FavoritesList() {
  const { favoriteIds } = useFavorites();
  const [products, setProducts] = useState<ProductDetailType[]>([]);
  const [loading, setLoading] = useState(true);

  const idsKey = favoriteIds.join(",");

  useEffect(() => {
    if (!idsKey) {
      setProducts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetch(`/api/products/by-ids?ids=${idsKey}`)
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
  }, [idsKey]);

  if (loading) return <ProductSkeleton count={4} />;

  if (favoriteIds.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        title="В обраному поки порожньо"
        text="Натискайте на сердечко на картках товарів, щоб зберегти їх тут."
        action={
          <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
            До каталогу
          </Link>
        }
      />
    );
  }

  return <ProductList products={products} />;
}
