import { getLatestProducts } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

export default function HomeProducts() {
  const products = getLatestProducts(8);
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14">
      <SectionTitle title="Новинки в каталозі" subtitle="Щойно додані товари в наявності" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
