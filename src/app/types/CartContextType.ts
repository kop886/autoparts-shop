import { CartItemType } from "@/app/types/CartItemType";

export type CartContextType = {
  items: CartItemType[];
  addItem: (item: Omit<CartItemType, "quantity">, quantity?: number) => void;
  increaseItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalCount: number;
};