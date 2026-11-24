import Link from "next/link";
import { Plus } from "lucide-react";
import AdminProductList from "@/app/components/AdminProductList/AdminProductList";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Товари</h1>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          <Plus size={16} /> Додати товар
        </Link>
      </div>
      <AdminProductList />
    </div>
  );
}