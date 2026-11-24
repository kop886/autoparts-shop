import { CartItemType } from "@/app/types/CartItemType";

export type CartItemProps = {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};