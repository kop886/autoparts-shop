"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { SelectedCarType } from "@/app/types/SelectedCarType";
import { CarContextType } from "@/app/types/CarContextType";

export const CarContext = createContext<CarContextType | null>(null);

const SAVED_CARS_KEY = "savedCars";
const ACTIVE_CAR_KEY = "activeCarId";
const MAX_CARS = 3;

export function CarProvider({ children }: { children: ReactNode }) {
  const [savedCars, setSavedCarsState] = useState<SelectedCarType[]>([]);
  const [activeCarId, setActiveCarIdState] = useState<number | null>(null);

  // при першому завантаженні читаємо гараж і активне авто з localStorage
  useEffect(() => {
    const savedCarsRaw = localStorage.getItem(SAVED_CARS_KEY);
    const activeCarRaw = localStorage.getItem(ACTIVE_CAR_KEY);
    if (savedCarsRaw) setSavedCarsState(JSON.parse(savedCarsRaw));
    if (activeCarRaw) setActiveCarIdState(Number(activeCarRaw));
  }, []);

  const persistCars = (cars: SelectedCarType[]) => {
    setSavedCarsState(cars);
    localStorage.setItem(SAVED_CARS_KEY, JSON.stringify(cars));
  };

  const setActiveCar = (modificationId: number | null) => {
    setActiveCarIdState(modificationId);
    if (modificationId === null) {
      localStorage.removeItem(ACTIVE_CAR_KEY);
    } else {
      localStorage.setItem(ACTIVE_CAR_KEY, String(modificationId));
    }
  };

  // повертає false, якщо гараж уже повний (3 авто)
  const addCar = (car: SelectedCarType): boolean => {
    const alreadyExists = savedCars.some((c) => c.modificationId === car.modificationId);
    if (alreadyExists) return true;

    if (savedCars.length >= MAX_CARS) return false;

    persistCars([...savedCars, car]);
    return true;
  };

  const removeCar = (modificationId: number) => {
    persistCars(savedCars.filter((c) => c.modificationId !== modificationId));
    if (activeCarId === modificationId) {
      setActiveCar(null);
    }
  };

  const selectedCar = savedCars.find((c) => c.modificationId === activeCarId) ?? null;

  return (
    <CarContext.Provider
      value={{ savedCars, activeCarId, selectedCar, addCar, removeCar, setActiveCar }}
    >
      {children}
    </CarContext.Provider>
  );
}