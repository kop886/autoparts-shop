import type { Metadata } from "next";
import CarBanner from "@/app/components/CarBanner/CarBanner";
import CategoryList from "@/app/components/CategoryList/CategoryList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

// сторінка читає базу даних, тому завжди будується на сервері на запит
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Каталог запчастин — AutoParts" };

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <h1 className="text-3xl font-extrabold">Каталог запчастин</h1>
      <p className="mb-6 mt-1 text-muted">Оберіть розділ, щоб переглянути товари</p>

      <CarBanner />
      <CategoryList />
    </div>
  );
}
