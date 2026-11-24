import type { Metadata } from "next";
import FavoritesList from "@/app/components/FavoritesList/FavoritesList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = { title: "Обране — AutoParts" };

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Обране" }]} />
      <h1 className="mb-6 text-3xl font-extrabold">Обране</h1>
      <FavoritesList />
    </div>
  );
}
