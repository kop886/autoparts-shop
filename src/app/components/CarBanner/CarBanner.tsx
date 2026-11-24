"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCar } from "@/hooks/useCar";

export default function CarBanner() {
  const { selectedCar } = useCar();

  if (selectedCar) {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600">
        <CheckCircle2 size={18} />
        Каталог налаштовано під {selectedCar.brandName} {selectedCar.modelName} (
        {selectedCar.yearFrom}
        {selectedCar.yearTo ? `–${selectedCar.yearTo}` : "+"}, {selectedCar.engineType}{" "}
        {selectedCar.engineVolume} л)
      </div>
    );
  }

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-600">
      <div className="flex items-center gap-2">
        <AlertTriangle size={18} />
        Авто не вибрано — не можемо гарантувати сумісність товарів
      </div>
      <Link href="/select-car" className="font-semibold underline hover:text-amber-500">
        Обрати авто
      </Link>
    </div>
  );
}
