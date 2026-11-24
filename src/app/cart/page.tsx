import type { Metadata } from "next";
import CartList from "@/app/components/CartList/CartList";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = { title: "Кошик — AutoParts" };

export default function CartPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Кошик" }]} />
      <h1 className="mb-6 text-3xl font-extrabold">Кошик</h1>
      <CartList />
    </div>
  );
}
