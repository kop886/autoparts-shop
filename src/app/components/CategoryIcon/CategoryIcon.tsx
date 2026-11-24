import {
  Cog, Filter, Disc3, ArrowUpDown, Settings2, Zap,
  Lightbulb, CarFront, Droplets, Thermometer, Package, LucideIcon,
} from "lucide-react";
import { CategoryIconProps } from "@/app/types/CategoryIconProps";

// кожному розділу каталогу — своя іконка
const icons: Record<string, LucideIcon> = {
  engine: Cog,
  filters: Filter,
  brakes: Disc3,
  suspension: ArrowUpDown,
  transmission: Settings2,
  electrical: Zap,
  lighting: Lightbulb,
  body: CarFront,
  fluids: Droplets,
  cooling: Thermometer,
};

export default function CategoryIcon({ slug, size = 24, className }: CategoryIconProps) {
  const Icon = (slug && icons[slug]) || Package;
  return <Icon size={size} className={className} />;
}
