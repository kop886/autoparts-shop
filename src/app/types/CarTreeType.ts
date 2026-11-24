import { CarModificationType } from "@/app/types/CarModificationType";

export type CarTreeModelType = {
  id: number;
  name: string;
  modifications: CarModificationType[];
};

export type CarTreeBrandType = {
  id: number;
  name: string;
  models: CarTreeModelType[];
};