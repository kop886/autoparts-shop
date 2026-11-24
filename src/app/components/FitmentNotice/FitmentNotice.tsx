"use client";

import Link from "next/link";
import { CheckCircle2, XCircle, Car } from "lucide-react";
import { useCar } from "@/hooks/useCar";
import { CompatibleCarType } from "@/app/types/CompatibleCarType";

// Повідомляє, чи підходить товар до авто, вибраного в гаражі
export default function FitmentNotice({ compatibleCars }: { compatibleCars: CompatibleCarType[] }) {
  const { selectedCar } = useCar();

  if (!selectedCar) {
    return (
      <Link
        href="/select-car"
        className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-soft px-4 py-3 text-sm text-muted transition hover:border-brand hover:text-brand"
      >
        <Car size={20} />
        Оберіть авто, щоб перевірити, чи підходить ця деталь
      </Link>
    );
  }

  const fits = compatibleCars.some((c) => c.modificationId === selectedCar.modificationId);
  const carName = `${selectedCar.brandName} ${selectedCar.modelName} ${selectedCar.yearFrom}${
    selectedCar.yearTo ? `–${selectedCar.yearTo}` : "+"
  }`;

  return fits ? (
    <div className="flex items-center gap-3 rounded-xl bg-green-500/10 px-4 py-3 text-sm font-medium text-green-600">
      <CheckCircle2 size={20} />
      Підходить до вашого авто: {carName}
    </div>
  ) : (
    <div className="flex items-center gap-3 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-500">
      <XCircle size={20} />
      Не підходить до вашого авто: {carName}
    </div>
  );
}
