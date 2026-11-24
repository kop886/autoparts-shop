import { useContext } from "react";
import { CarContext } from "@/context/CarContext";

export function useCar() {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error("useCar must be used inside CarProvider");
  }
  return context;
}