import { getRelatedProducts } from "@/lib/queries";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import SectionTitle from "@/app/components/SectionTitle/SectionTitle";

export default function RelatedProducts({ productId }: { productId: number }) {
  const products = getRelatedProducts(productId, 4);
  if (products.length === 0) return null;

  return (
    <section className="mt-14">
      <SectionTitle title="Схожі товари" subtitle="З тієї ж категорії" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
