export type OrderStatusType = "new" | "processing" | "shipped" | "completed" | "cancelled";

export type OrderType = {
  id: number;
  userId: number;
  status: OrderStatusType;
  totalPrice: number;
  phone: string;
  address: string;
  createdAt: string;
};