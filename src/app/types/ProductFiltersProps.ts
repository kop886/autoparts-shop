import { ManufacturerType } from "@/app/types/ManufacturerType";

export type ProductFiltersProps = {
  manufacturers: ManufacturerType[];
  selectedManufacturerId: string;
  onManufacturerChange: (id: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  hasCar: boolean;
  onlyCompatible: boolean;
  onToggleOnlyCompatible: () => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  inStock: boolean;
  onToggleInStock: () => void;
  onReset: () => void;
  resultCount: number | null;
};
