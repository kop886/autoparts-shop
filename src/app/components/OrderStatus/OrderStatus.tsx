import { OrderStatusType } from "@/app/types/OrderType";

export const statusLabels: Record<OrderStatusType, string> = {
  new: "Нове",
  processing: "Обробляється",
  shipped: "Відправлено",
  completed: "Виконано",
  cancelled: "Скасовано",
};

const statusColors: Record<OrderStatusType, string> = {
  new: "bg-blue-500/10 text-blue-500",
  processing: "bg-amber-500/10 text-amber-500",
  shipped: "bg-purple-500/10 text-purple-500",
  completed: "bg-green-500/10 text-green-600",
  cancelled: "bg-red-500/10 text-red-500",
};

export default function OrderStatus({ status }: { status: OrderStatusType }) {
  return (
    <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusColors[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
