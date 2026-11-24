import { CategoryType } from "@/app/types/CategoryType";

export type CategoryWithChildrenType = CategoryType & {
  children: CategoryType[];
};