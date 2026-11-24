import { AdminRecentOrderType } from "@/app/types/AdminRecentOrderType";
import { AdminLowStockType } from "@/app/types/AdminLowStockType";

export type AdminStatsType = {
  productsCount: number;
  ordersCount: number;
  newOrdersCount: number;
  categoriesCount: number;
  usersCount: number;
  revenue: number;
  ordersByStatus: Record<string, number>;
  recentOrders: AdminRecentOrderType[];
  lowStock: AdminLowStockType[];
};
