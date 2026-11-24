"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { OrderWithItemsType } from "@/app/types/OrderWithItemsType";
import OrderCard from "@/app/components/OrderCard/OrderCard";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function OrderList() {
  const [orders, setOrders] = useState<OrderWithItemsType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/my")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="skeleton h-40 w-full" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="Замовлень ще немає"
        text="Коли ви щось замовите, історія з'явиться тут."
        action={
          <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
            До каталогу
          </Link>
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
