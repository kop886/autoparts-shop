import { ProductListItemType } from "@/app/types/ProductListItemType";

export type ProductCardProps = {
  product: ProductListItemType;
  // порядковий номер — для каскадної анімації появи
  index?: number;
};
