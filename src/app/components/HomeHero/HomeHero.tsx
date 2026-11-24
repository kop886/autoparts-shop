import { Check } from "lucide-react";
import { getShopCounts } from "@/lib/queries";
import HeroCarSelector from "@/app/components/HeroCarSelector/HeroCarSelector";

export default function HomeHero() {
  const counts = getShopCounts();

  const stats = [
    { value: `${counts.products}+`, label: "товарів у каталозі" },
    { value: `${counts.brands}`, label: "марок авто" },
    { value: `${counts.manufacturers}`, label: "виробників запчастин" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy via-slate-800 to-slate-900 text-white">
      {/* декоративні кола */}
      <div className="animate-float pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand/25 blur-3xl" />
      <div className="animate-float pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl [animation-delay:2s]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.15fr_1fr] lg:py-20">
        <div>
          <span className="animate-fade-up inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-orange-300 ring-1 ring-white/15">
            Інтернет-магазин автозапчастин
          </span>
          <h1 className="animate-fade-up delay-1 mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Запчастини, які <span className="text-brand">точно підійдуть</span> до вашого авто
          </h1>
          <p className="animate-fade-up delay-2 mt-5 max-w-xl text-lg text-slate-300">
            Оберіть марку, модель і двигун — і каталог покаже лише сумісні деталі. Без
            помилок, зайвих дзвінків і повернень.
          </p>

          <ul className="animate-fade-up delay-3 mt-6 space-y-2 text-slate-200">
            {["Перевірена сумісність з вашим авто", "Оригінальні виробники з Європи та Японії", "Доставка Новою поштою по всій Україні"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/20 text-brand">
                    <Check size={13} />
                  </span>
                  {t}
                </li>
              )
            )}
          </ul>

          <div className="animate-fade-up delay-4 mt-9 flex flex-wrap gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-brand">{s.value}</p>
                <p className="text-sm text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <HeroCarSelector />
      </div>
    </section>
  );
}
