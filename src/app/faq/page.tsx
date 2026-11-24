import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import InfoPage from "@/app/components/InfoPage/InfoPage";

export const metadata: Metadata = { title: "Часті запитання — AutoParts" };

const questions = [
  { q: "Як підібрати запчастини до свого авто?", a: "Додайте авто до гаража: оберіть марку, модель і модифікацію (рік, кузов, двигун). Після цього каталог покаже лише сумісні товари." },
  { q: "Скільки авто можна зберегти в гаражі?", a: "До трьох автомобілів. Між ними можна швидко перемикатися через іконку авто у верхній частині сайту." },
  { q: "Що означає «Підходить до вашого авто»?", a: "На сторінці товару ми порівнюємо його список сумісності з активним авто з вашого гаража та одразу показуємо результат." },
  { q: "Чи потрібна реєстрація для покупки?", a: "Переглядати каталог і наповнювати кошик можна без реєстрації. Для оформлення замовлення потрібно увійти в акаунт." },
  { q: "Де побачити статус мого замовлення?", a: "У розділі «Мій профіль» — там відображаються всі замовлення та їх поточний статус." },
  { q: "Можна порівняти кілька товарів?", a: "Так, натисніть іконку терезів на картці товару й відкрийте сторінку «Порівняння». Можна порівнювати до чотирьох товарів." },
];

export default function FaqPage() {
  return (
    <InfoPage title="Часті запитання" subtitle="Відповіді на те, що нас питають найчастіше.">
      <div className="max-w-3xl space-y-3">
        {questions.map(({ q, a }) => (
          <details key={q} className="group rounded-2xl border border-line bg-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold hover:text-brand">
              {q}
              <ChevronDown size={18} className="shrink-0 text-muted transition group-open:rotate-180" />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{a}</p>
          </details>
        ))}
      </div>
    </InfoPage>
  );
}
