import type { Metadata } from "next";
import { Target, Users, Wrench, Award } from "lucide-react";
import InfoPage from "@/app/components/InfoPage/InfoPage";
import { getShopCounts } from "@/lib/queries";

// сторінка читає базу даних, тому завжди будується на сервері на запит
export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Про нас — AutoParts" };

export default function AboutPage() {
  const counts = getShopCounts();

  const values = [
    { icon: Target, title: "Точність", text: "Кожна деталь прив'язана до конкретних модифікацій авто, тож ризик помилки мінімальний." },
    { icon: Award, title: "Якість", text: "Працюємо з відомими виробниками з Німеччини, Японії, Італії та інших країн." },
    { icon: Wrench, title: "Практичність", text: "Каталог збудований так, як думає водій: спочатку авто, потім деталь." },
    { icon: Users, title: "Турбота", text: "Допомагаємо з вибором і супроводжуємо замовлення до отримання." },
  ];

  return (
    <InfoPage
      title="Про AutoParts"
      subtitle="Інтернет-магазин автозапчастин, який допомагає купувати лише те, що підходить саме вашому авто."
    >
      <p className="max-w-3xl text-lg leading-relaxed text-muted">
        AutoParts створено, щоб позбутися найпоширенішої проблеми при купівлі запчастин —
        невідповідності деталі автомобілю. Ви один раз додаєте авто до свого гаража, а каталог
        автоматично показує тільки сумісні товари.
      </p>

      <div className="my-10 grid gap-4 sm:grid-cols-3">
        {[
          { v: `${counts.products}+`, l: "товарів у каталозі" },
          { v: `${counts.models}`, l: "моделей авто" },
          { v: `${counts.manufacturers}`, l: "виробників" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border border-line bg-card p-6 text-center">
            <p className="text-4xl font-extrabold text-brand">{s.v}</p>
            <p className="mt-1 text-sm text-muted">{s.l}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-5 text-2xl font-bold">Наші принципи</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {values.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-line bg-card p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </InfoPage>
  );
}
