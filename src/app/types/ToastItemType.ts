import { ToastKindType } from "@/app/types/ToastKindType";

export type ToastItemType = {
  id: number;
  message: string;
  kind: ToastKindType;
};
