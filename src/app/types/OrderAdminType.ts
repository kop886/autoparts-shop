import { OrderType } from "@/app/types/OrderType";
import { OrderItemType } from "@/app/types/OrderItemType";

export type OrderAdminType = OrderType & {
  userName: string;
  userEmail: string;
  items: OrderItemType[];
};