import AdminOrderList from "@/app/components/AdminOrderList/AdminOrderList";

export default function AdminOrdersPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Замовлення</h1>
      <AdminOrderList />
    </div>
  );
}