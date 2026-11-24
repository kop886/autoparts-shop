import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getSubcategories } from "@/lib/queries";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";
import CategoryIcon from "@/app/components/CategoryIcon/CategoryIcon";
import CarBanner from "@/app/components/CarBanner/CarBanner";
import CategoryProducts from "@/app/components/CategoryProducts/CategoryProducts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  return { title: category ? `${category.nameUk} — AutoParts` : "Категорію не знайдено" };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const subcategories = getSubcategories(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Каталог", href: "/catalog" },
          ...(category.parent
            ? [{ label: category.parent.nameUk, href: `/catalog/${category.parent.slug}` }]
            : []),
          { label: category.nameUk },
        ]}
      />

      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
          <CategoryIcon slug={category.parent?.slug ?? category.slug} size={26} />
        </div>
        <h1 className="text-3xl font-extrabold">{category.nameUk}</h1>
      </div>

      {subcategories.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/catalog/${sub.slug}`}
              className="rounded-full border border-line bg-card px-4 py-1.5 text-sm font-medium transition hover:border-brand hover:text-brand"
            >
              {sub.nameUk}
            </Link>
          ))}
        </div>
      )}

      <CarBanner />
      <CategoryProducts categorySlug={category.slug} />
    </div>
  );
}
