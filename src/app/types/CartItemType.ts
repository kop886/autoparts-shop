export type CartItemType = {
  productId: number;
  nameUk: string;
  nameEn: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
  // скільки є на складі (щоб не дати замовити більше)
  stockQuantity?: number;
};
