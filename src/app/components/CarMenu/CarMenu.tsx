"use client";

import { useState, useRef, useEffect } from "react";
import { Car, X, Plus, Check } from "lucide-react";
import { useCar } from "@/hooks/useCar";
import CarSelector from "@/app/components/CarSelector/CarSelector";

const MAX_CARS = 3;

export default function CarMenu() {
  const { savedCars, activeCarId, selectedCar, setActiveCar, removeCar } = useCar();
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
        setShowAddForm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
          selectedCar ? "bg-brand/10 text-brand" : "text-muted hover:bg-soft hover:text-brand"
        }`}
      >
        <Car size={20} />
        <span className="hidden max-w-[130px] truncate lg:inline">
          {selectedCar ? `${selectedCar.brandName} ${selectedCar.modelName}` : "Додати авто"}
        </span>
        {selectedCar && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setActiveCar(null);
            }}
            className="rounded-full p-0.5 hover:bg-brand/20"
            title="Скасувати вибір авто"
          >
            <X size={14} />
          </span>
        )}
      </button>

      {open && (
        <div className="animate-dropdown absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border border-line bg-card p-4 shadow-2xl md:left-auto md:right-0 md:w-80">
          {showAddForm ? (
            <>
              <button
                onClick={() => setShowAddForm(false)}
                className="mb-3 text-sm text-muted hover:text-brand"
              >
                ← Назад до гаража
              </button>
              <CarSelector
                onSuccess={() => {
                  setShowAddForm(false);
                  setOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <h3 className="mb-3 text-sm font-bold">Мій гараж</h3>

              {savedCars.length === 0 && (
                <p className="mb-3 text-sm text-muted">
                  Додайте авто, і ми покажемо лише запчастини, що підходять саме йому.
                </p>
              )}

              <ul className="mb-3 space-y-1">
                {savedCars.map((car) => {
                  const active = car.modificationId === activeCarId;
                  return (
                    <li
                      key={car.modificationId}
                      className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                        active ? "bg-brand/10 text-brand" : "hover:bg-soft"
                      }`}
                    >
                      <button
                        onClick={() => {
                          setActiveCar(car.modificationId);
                          setOpen(false);
                        }}
                        className="flex flex-1 items-center gap-2 text-left"
                      >
                        {active && <Check size={14} />}
                        <span>
                          <span className="block font-semibold">
                            {car.brandName} {car.modelName}
                          </span>
                          <span className="block text-xs opacity-70">
                            {car.yearFrom}
                            {car.yearTo ? `–${car.yearTo}` : "+"} · {car.engineType} {car.engineVolume} л
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={() => removeCar(car.modificationId)}
                        className="ml-2 rounded p-1 text-muted hover:bg-line hover:text-red-500"
                        title="Видалити з гаража"
                      >
                        <X size={14} />
                      </button>
                    </li>
                  );
                })}
              </ul>

              {savedCars.length < MAX_CARS ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-line py-2.5 text-sm font-medium text-muted transition hover:border-brand hover:text-brand"
                >
                  <Plus size={16} />
                  Додати авто
                </button>
              ) : (
                <p className="text-center text-xs text-muted">
                  Максимум {MAX_CARS} авто. Видаліть одне, щоб додати нове.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
