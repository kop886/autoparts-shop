import type { Metadata } from "next";
import { RotateCcw, ShieldCheck, FileCheck } from "lucide-react";
import InfoPage from "@/app/components/InfoPage/InfoPage";

export const metadata: Metadata = { title: "Повернення і обмін — AutoParts" };

export default function ReturnsPage() {
  const items = [
    { icon: RotateCcw, title: "14 днів на повернення", text: "Ви можете повернути або обміняти товар належної якості протягом 14 днів після отримання." },
    { icon: FileCheck, title: "Умови повернення", text: "Деталь не була в експлуатації, збережено упаковку, товарний вигляд і документи про покупку." },
    { icon: ShieldCheck, title: "Гарантія 12 місяців", text: "На всі запчастини діє гарантія виробника. У разі браку замінимо деталь або повернемо кошти." },
  ];

  return (
    <InfoPage title="Повернення і обмін" subtitle="Якщо деталь не підійшла, ми допоможемо виправити ситуацію.">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon size={24} />
            </div>
            <h3 className="font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Електричні деталі (стартери, генератори, датчики) після встановлення поверненню не
        підлягають, окрім випадків заводського браку.
      </p>
    </InfoPage>
  );
}
