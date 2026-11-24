"use client";

import { useState, useEffect } from "react";
import { ProductListItemType } from "@/app/types/ProductListItemType";
import { ManufacturerType } from "@/app/types/ManufacturerType";
import { useCar } from "@/hooks/useCar";
import { useDebounce } from "@/hooks/useDebounce";
import ProductFilters from "@/app/components/ProductFilters/ProductFilters";
import ProductList from "@/app/components/ProductList/ProductList";
import ProductSkeleton from "@/app/components/ProductSkeleton/ProductSkeleton";

export default function CategoryProducts({ categorySlug }: { categorySlug: string }) {
  const { selectedCar } = useCar();

  const [manufacturers, setManufacturers] = useState<ManufacturerType[]>([]);
  const [products, setProducts] = useState<ProductListItemType[]>([]);
  const [loading, setLoading] = useState(true);

  const [manufacturerId, setManufacturerId] = useState("");
  const [sort, setSort] = useState("name");
  const [onlyCompatible, setOnlyCompatible] = useState(true);
  const [inStock, setInStock] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // ціну чекаємо 0.4 с після останньої клавіші, щоб не слати зайвих запитів
  const debouncedMin = useDebounce(minPrice, 400);
  const debouncedMax = useDebounce(maxPrice, 400);

  useEffect(() => {
    fetch("/api/manufacturers").then((res) => res.json()).then(setManufacturers);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const query = new URLSearchParams({ category: categorySlug, sort });
    if (manufacturerId) query.set("manufacturerId", manufacturerId);
    if (debouncedMin) query.set("minPrice", debouncedMin);
    if (debouncedMax) query.set("maxPrice", debouncedMax);
    if (inStock) query.set("inStock", "1");
    if (selectedCar && onlyCompatible) {
      query.set("modificationId", String(selectedCar.modificationId));
    }

    fetch(`/api/products?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // якщо фільтр змінився до завершення запиту — ігноруємо стару відповідь
    return () => {
      cancelled = true;
    };
  }, [categorySlug, manufacturerId, sort, onlyCompatible, inStock, debouncedMin, debouncedMax, selectedCar]);

  const reset = () => {
    setManufacturerId("");
    setSort("name");
    setOnlyCompatible(true);
    setInStock(false);
    setMinPrice("");
    setMaxPrice("");
  };

  return (
    <div>
      <ProductFilters
        manufacturers={manufacturers}
        selectedManufacturerId={manufacturerId}
        onManufacturerChange={setManufacturerId}
        sort={sort}
        onSortChange={setSort}
        hasCar={!!selectedCar}
        onlyCompatible={onlyCompatible}
        onToggleOnlyCompatible={() => setOnlyCompatible((v) => !v)}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        inStock={inStock}
        onToggleInStock={() => setInStock((v) => !v)}
        onReset={reset}
        resultCount={loading ? null : products.length}
      />

      {loading ? <ProductSkeleton /> : <ProductList products={products} />}
    </div>
  );
}
