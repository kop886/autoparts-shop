import { SelectedCarType } from "@/app/types/SelectedCarType";

export type CarContextType = {
  savedCars: SelectedCarType[];
  activeCarId: number | null;
  selectedCar: SelectedCarType | null;
  addCar: (car: SelectedCarType) => boolean;
  removeCar: (modificationId: number) => void;
  setActiveCar: (modificationId: number | null) => void;
};