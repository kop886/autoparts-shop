import { SearchX } from "lucide-react";
import { ProductListProps } from "@/app/types/ProductListProps";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Нічого не знайдено"
        text="Спробуйте змінити фільтри або вимкнути «Тільки сумісні з моїм авто»."
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
