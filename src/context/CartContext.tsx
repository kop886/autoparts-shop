"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { CartItemType } from "@/app/types/CartItemType";
import { CartContextType } from "@/app/types/CartContextType";

export const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItemsState] = useState<CartItemType[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setItemsState(JSON.parse(saved));
  }, []);

  const persist = (newItems: CartItemType[]) => {
    setItemsState(newItems);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
  };

  const addItem = (item: Omit<CartItemType, "quantity">, quantity = 1) => {
    const existing = items.find((i) => i.productId === item.productId);

    if (existing) {
      persist(
        items.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
        )
      );
    } else {
      persist([...items, { ...item, quantity }]);
    }
  };

  const increaseItem = (productId: number) => {
    persist(
      items.map((i) => {
        if (i.productId !== productId) return i;
        // не даємо замовити більше, ніж є на складі
        if (i.stockQuantity !== undefined && i.quantity >= i.stockQuantity) return i;
        return { ...i, quantity: i.quantity + 1 };
      })
    );
  };

  const decreaseItem = (productId: number) => {
    persist(
      items
        .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (productId: number) => {
    persist(items.filter((i) => i.productId !== productId));
  };

  const clearCart = () => {
    persist([]);
  };

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, increaseItem, decreaseItem, removeItem, clearCart, totalPrice, totalCount }}
    >
      {children}
    </CartContext.Provider>
  );
}