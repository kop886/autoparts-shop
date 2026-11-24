import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

export type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  text?: string;
  action?: ReactNode;
};
