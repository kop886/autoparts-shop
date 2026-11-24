import type { Metadata } from "next";
import Link from "next/link";
import { SearchX } from "lucide-react";
import { searchProducts } from "@/lib/queries";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ProductList from "@/app/components/ProductList/ProductList";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export const metadata: Metadata = { title: "Пошук — AutoParts" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const products = query ? searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Пошук" }]} />
      <h1 className="text-3xl font-extrabold">
        {query ? `Результати пошуку: «${query}»` : "Пошук товарів"}
      </h1>
      {query && <p className="mb-6 mt-1 text-muted">Знайдено товарів: {products.length}</p>}

      {!query ? (
        <p className="mt-4 text-muted">Введіть назву, артикул або виробника у рядок пошуку вгорі.</p>
      ) : products.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="Нічого не знайдено"
          text="Перевірте написання або спробуйте шукати за артикулом чи виробником."
          action={
            <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
              Переглянути каталог
            </Link>
          }
        />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
}
