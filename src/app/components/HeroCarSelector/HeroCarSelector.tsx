"use client";

import { useRouter } from "next/navigation";
import { Car } from "lucide-react";
import CarSelector from "@/app/components/CarSelector/CarSelector";

// Блок підбору авто на головній сторінці (як на dok.ua)
export default function HeroCarSelector() {
  const router = useRouter();

  return (
    <div className="animate-fade-up delay-2 rounded-3xl bg-card p-6 text-ink shadow-2xl ring-1 ring-white/10">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
          <Car size={22} />
        </div>
        <div>
          <h2 className="text-lg font-extrabold leading-tight">Підбір запчастин за авто</h2>
          <p className="text-xs text-muted">Покажемо лише сумісні деталі</p>
        </div>
      </div>
      <CarSelector submitLabel="Підібрати запчастини" onSuccess={() => router.push("/catalog")} />
    </div>
  );
}
