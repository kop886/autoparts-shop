import { MapPin, Phone } from "lucide-react";
import { OrderWithItemsType } from "@/app/types/OrderWithItemsType";
import { formatDate, formatPrice } from "@/lib/format";
import OrderStatus from "@/app/components/OrderStatus/OrderStatus";

export default function OrderCard({ order }: { order: OrderWithItemsType }) {
  return (
    <div className="animate-fade-up rounded-2xl border border-line bg-card p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="font-bold">Замовлення №{order.id}</p>
          <p className="text-sm text-muted">{formatDate(order.createdAt)}</p>
        </div>
        <OrderStatus status={order.status} />
      </div>

      <ul className="space-y-1.5 border-t border-line pt-3 text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between gap-3 text-muted">
            <span>
              {item.productName} <span className="opacity-60">× {item.quantity}</span>
            </span>
            <span className="shrink-0 font-medium text-ink">{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-line pt-3">
        <div className="space-y-1 text-sm text-muted">
          <p className="flex items-center gap-1.5"><MapPin size={14} /> {order.address}</p>
          <p className="flex items-center gap-1.5"><Phone size={14} /> {order.phone}</p>
        </div>
        <span className="text-xl font-extrabold">{formatPrice(order.totalPrice)}</span>
      </div>
    </div>
  );
}
