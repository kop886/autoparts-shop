import type { Metadata } from "next";
import CompareTable from "@/app/components/CompareTable/CompareTable";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = { title: "Порівняння товарів — AutoParts" };

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Порівняння" }]} />
      <h1 className="mb-6 text-3xl font-extrabold">Порівняння товарів</h1>
      <CompareTable />
    </div>
  );
}
