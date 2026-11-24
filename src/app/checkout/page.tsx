import type { Metadata } from "next";
import CheckoutForm from "@/app/components/CheckoutForm/CheckoutForm";
import Breadcrumbs from "@/app/components/Breadcrumbs/Breadcrumbs";

export const metadata: Metadata = { title: "Оформлення замовлення — AutoParts" };

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ label: "Кошик", href: "/cart" }, { label: "Оформлення" }]} />
      <h1 className="mb-6 text-3xl font-extrabold">Оформлення замовлення</h1>
      <CheckoutForm />
    </div>
  );
}
