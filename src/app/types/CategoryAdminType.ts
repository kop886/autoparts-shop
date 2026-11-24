import { CategoryType } from "@/app/types/CategoryType";

export type CategoryAdminType = CategoryType & {
  parentNameUk: string | null;
};