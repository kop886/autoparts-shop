import { OrderType } from "@/app/types/OrderType";
import { OrderItemType } from "@/app/types/OrderItemType";

export type OrderWithItemsType = OrderType & {
  items: OrderItemType[];
};