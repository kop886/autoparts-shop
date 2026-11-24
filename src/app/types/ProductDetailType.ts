import { ProductListItemType } from "@/app/types/ProductListItemType";

export type ProductDetailType = ProductListItemType & {
  manufacturerCountry: string | null;
  // true/false — чи підходить до вибраного авто; null — авто не вибрано
  fitsCar?: boolean | null;
};
