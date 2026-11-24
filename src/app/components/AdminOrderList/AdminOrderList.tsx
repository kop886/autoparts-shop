"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, ClipboardList } from "lucide-react";
import { OrderAdminType } from "@/app/types/OrderAdminType";
import { OrderStatusType } from "@/app/types/OrderType";
import { formatDate, formatPrice } from "@/lib/format";
import { useToast } from "@/hooks/useToast";
import { statusLabels } from "@/app/components/OrderStatus/OrderStatus";
import EmptyState from "@/app/components/EmptyState/EmptyState";

const statuses = Object.keys(statusLabels) as OrderStatusType[];

export default function AdminOrderList() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<OrderAdminType[]>([]);
  const [filter, setFilter] = useState<OrderStatusType | "all">("all");
  const [loading, setLoading] = useState(true);

  const load = () => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      showToast("Статус оновлено");
      load();
    } else {
      showToast("Не вдалося змінити статус", "error");
    }
  };

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const tab = (active: boolean) =>
    `whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-semibold transition ${
      active ? "bg-brand text-white" : "bg-card text-muted hover:text-brand border border-line"
    }`;

  return (
    <div>
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        <button onClick={() => setFilter("all")} className={tab(filter === "all")}>
          Усі ({orders.length})
        </button>
        {statuses.map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={tab(filter === s)}>
            {statusLabels[s]} ({orders.filter((o) => o.status === s).length})
          </button>
        ))}
      </div>

      {!loading && visible.length === 0 && (
        <EmptyState icon={ClipboardList} title="Замовлень немає" text="За вибраним фільтром нічого не знайдено." />
      )}

      <div className="space-y-4">
        {visible.map((order) => (
          <div key={order.id} className="rounded-2xl border border-line bg-card p-5">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-bold">
                  Замовлення №{order.id} — {order.userName}
                </p>
                <p className="text-sm text-muted">
                  {order.userEmail} · {formatDate(order.createdAt)}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Phone size={13} /> {order.phone}
                </p>
                <p className="flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={13} /> {order.address}
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                className="rounded-xl border border-line px-3 py-2 text-sm font-semibold outline-none focus:border-brand"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>{statusLabels[s]}</option>
                ))}
              </select>
            </div>

            <ul className="space-y-1 border-t border-line pt-3 text-sm text-muted">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3">
                  <span>{item.productName} × {item.quantity}</span>
                  <span className="shrink-0 font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-line pt-3 text-right text-lg font-extrabold">
              {formatPrice(order.totalPrice)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
