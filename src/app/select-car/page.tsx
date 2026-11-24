"use client";

import { useRouter } from "next/navigation";
import { Car } from "lucide-react";
import CarSelector from "@/app/components/CarSelector/CarSelector";

export default function SelectCarPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <div className="animate-fade-up rounded-3xl border border-line bg-card p-8 shadow-lg">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
            <Car size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">Додати авто</h1>
            <p className="text-sm text-muted">Покажемо лише сумісні запчастини</p>
          </div>
        </div>
        <CarSelector submitLabel="Підібрати запчастини" onSuccess={() => router.push("/catalog")} />
      </div>
    </div>
  );
}
