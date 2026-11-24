import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductById, getCategoryBySlug } from "@/lib/queries";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import ProductDetail from "@/app/components/ProductDetail/ProductDetail";
import RelatedProducts from "@/app/components/RelatedProducts/RelatedProducts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));
  return { title: product ? `${product.nameUk} — AutoParts` : "Товар не знайдено" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(Number(id));
  if (!product) notFound();

  const category = getCategoryBySlug(product.categorySlug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          ...(category?.parent
            ? [{ label: category.parent.nameUk, href: `/catalog/${category.parent.slug}` }]
            : []),
          { label: product.categoryNameUk, href: `/catalog/${product.categorySlug}` },
          { label: product.nameUk },
        ]}
      />
      <ProductDetail product={product} />
      <RelatedProducts productId={product.id} />
    </div>
  );
}
