"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil, Trash2, Search } from "lucide-react";
import { ProductAdminType } from "@/app/types/ProductAdminType";
import { formatPrice } from "@/lib/format";
import { useToast } from "@/hooks/useToast";
import ProductImage from "@/app/components/ProductImage/ProductImage";

export default function AdminProductList() {
  const { showToast } = useToast();
  const [products, setProducts] = useState<ProductAdminType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цей товар?")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      showToast(data.error, "error");
      return;
    }
    showToast("Товар видалено");
    load();
  };

  const q = search.trim().toLowerCase();
  const filtered = q
    ? products.filter((p) =>
        [p.nameUk, p.articleNumber, p.manufacturerName, p.categoryNameUk]
          .join(" ")
          .toLowerCase()
          .includes(q)
      )
    : products;

  return (
    <div>
      <div className="relative mb-4 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Пошук за назвою, артикулом, виробником..."
          className="w-full rounded-xl border border-line py-2.5 pl-9 pr-3 text-sm outline-none focus:border-brand"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-line bg-card">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-soft text-left text-xs uppercase text-muted">
            <tr>
              <th className="px-4 py-3">Товар</th>
              <th className="px-4 py-3">Категорія</th>
              <th className="px-4 py-3">Виробник</th>
              <th className="px-4 py-3">Ціна</th>
              <th className="px-4 py-3">Склад</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filtered.map((p) => (
              <tr key={p.id} className="transition hover:bg-soft/60">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <ProductImage
                      imageUrl={p.imageUrl}
                      alt={p.nameUk}
                      categorySlug={p.categorySlug}
                      parentSlug={p.parentSlug}
                      size="sm"
                    />
                    <div>
                      <p className="font-semibold">{p.nameUk}</p>
                      <p className="text-xs text-muted">{p.articleNumber}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-muted">{p.categoryNameUk}</td>
                <td className="px-4 py-2.5 text-muted">{p.manufacturerName}</td>
                <td className="whitespace-nowrap px-4 py-2.5 font-semibold">{formatPrice(p.price)}</td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      p.stockQuantity === 0
                        ? "bg-red-500/10 text-red-500"
                        : p.stockQuantity <= 5
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-green-500/10 text-green-600"
                    }`}
                  >
                    {p.stockQuantity}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-muted hover:text-brand" title="Редагувати">
                      <Pencil size={16} />
                    </Link>
                    <button onClick={() => handleDelete(p.id)} className="text-muted hover:text-red-500" title="Видалити">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <p className="px-4 py-8 text-center text-muted">Товарів не знайдено</p>
        )}
      </div>
      <p className="mt-3 text-xs text-muted">Показано {filtered.length} з {products.length}</p>
    </div>
  );
}
