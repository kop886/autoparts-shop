import type { Metadata } from "next";
import RequireAuth from "@/app/components/RequireAuth/RequireAuth";
import ProfileInfo from "@/app/components/ProfileInfo/ProfileInfo";
import OrderList from "@/app/components/OrderList/OrderList";

export const metadata: Metadata = { title: "Мій профіль — AutoParts" };

export default function ProfilePage() {
  return (
    <RequireAuth>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-extrabold">Мій профіль</h1>
        <ProfileInfo />
        <h2 className="mb-4 text-xl font-bold">Мої замовлення</h2>
        <OrderList />
      </div>
    </RequireAuth>
  );
}
