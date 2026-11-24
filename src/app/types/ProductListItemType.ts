import { ProductType } from "@/app/types/ProductType";

// товар для списків і карток: додатково містить назву виробника та категорії
export type ProductListItemType = ProductType & {
  manufacturerName: string;
  categoryNameUk: string;
  categorySlug: string;
  parentSlug: string | null;
};
