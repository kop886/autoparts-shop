import { LucideIcon } from "lucide-react";

export type AdminStatCardProps = {
  icon: LucideIcon;
  label: string;
  value: number | string;
  highlight?: boolean;
};
