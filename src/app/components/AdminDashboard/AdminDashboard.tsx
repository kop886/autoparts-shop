"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Package, ClipboardList, Bell, FolderTree, Users, Wallet, AlertTriangle } from "lucide-react";
import { AdminStatsType } from "@/app/types/AdminStatsType";
import { OrderStatusType } from "@/app/types/OrderType";
import { formatDate, formatPrice } from "@/lib/format";
import AdminStatCard from "@/app/components/AdminStatCard/AdminStatCard";
import OrderStatus, { statusLabels } from "@/app/components/OrderStatus/OrderStatus";

const barColors: Record<string, string> = {
  new: "bg-blue-500",
  processing: "bg-amber-500",
  shipped: "bg-purple-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStatsType | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats").then((res) => res.json()).then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-32" />
        ))}
      </div>
    );
  }

  const maxStatus = Math.max(1, ...Object.values(stats.ordersByStatus));

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminStatCard icon={Wallet} label="Виторг (без скасованих)" value={formatPrice(stats.revenue)} highlight />
        <AdminStatCard icon={ClipboardList} label="Усього замовлень" value={stats.ordersCount} />
        <AdminStatCard icon={Bell} label="Нових замовлень" value={stats.newOrdersCount} />
        <AdminStatCard icon={Package} label="Товарів у каталозі" value={stats.productsCount} />
        <AdminStatCard icon={FolderTree} label="Категорій" value={stats.categoriesCount} />
        <AdminStatCard icon={Users} label="Користувачів" value={stats.usersCount} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Замовлення за статусами */}
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="mb-4 font-bold">Замовлення за статусами</h2>
          {stats.ordersCount === 0 ? (
            <p className="text-sm text-muted">Замовлень ще немає</p>
          ) : (
            <div className="space-y-3">
              {(Object.keys(statusLabels) as OrderStatusType[]).map((s) => {
                const count = stats.ordersByStatus[s] ?? 0;
                return (
                  <div key={s}>
                    <div className="mb-1 flex justify-between text-sm">
                      <span className="text-muted">{statusLabels[s]}</span>
                      <span className="font-semibold">{count}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-soft">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${barColors[s]}`}
                        style={{ width: `${(count / maxStatus) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Закінчується на складі */}
        <div className="rounded-2xl border border-line bg-card p-5">
          <h2 className="mb-4 flex items-center gap-2 font-bold">
            <AlertTriangle size={18} className="text-amber-500" /> Закінчується на складі
          </h2>
          {stats.lowStock.length === 0 ? (
            <p className="text-sm text-muted">Усього вдосталь 👍</p>
          ) : (
            <ul className="divide-y divide-line">
              {stats.lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                  <Link href={`/admin/products/${p.id}`} className="min-w-0 truncate hover:text-brand">
                    {p.nameUk}
                    <span className="ml-2 text-xs text-muted">{p.articleNumber}</span>
                  </Link>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      p.stockQuantity === 0 ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {p.stockQuantity === 0 ? "немає" : `${p.stockQuantity} шт.`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Останні замовлення */}
      <div className="rounded-2xl border border-line bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Останні замовлення</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-brand hover:underline">
            Усі замовлення →
          </Link>
        </div>
        {stats.recentOrders.length === 0 ? (
          <p className="text-sm text-muted">Замовлень ще немає</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-line">
                {stats.recentOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 font-semibold">№{o.id}</td>
                    <td className="py-2.5">{o.userName}</td>
                    <td className="py-2.5 text-muted">{formatDate(o.createdAt)}</td>
                    <td className="py-2.5 font-semibold">{formatPrice(o.totalPrice)}</td>
                    <td className="py-2.5 text-right">
                      <OrderStatus status={o.status as OrderStatusType} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
