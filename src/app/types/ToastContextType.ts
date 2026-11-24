import { ToastKindType } from "@/app/types/ToastKindType";

export type ToastContextType = {
  showToast: (message: string, kind?: ToastKindType) => void;
};
