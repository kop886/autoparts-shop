import type { Metadata } from "next";
import { Truck, Store, CreditCard, Banknote } from "lucide-react";
import InfoPage from "@/app/components/InfoPage/InfoPage";

export const metadata: Metadata = { title: "Доставка і оплата — AutoParts" };

const blocks = [
  { icon: Truck, title: "Нова пошта", text: "Відправляємо в день замовлення. Доставка у відділення або поштомат займає 1–3 дні, вартість за тарифами перевізника." },
  { icon: Store, title: "Самовивіз", text: "Забирайте замовлення на нашому складі в м. Миколаїв щодня з 8:00 до 20:00 після підтвердження менеджером." },
  { icon: CreditCard, title: "Оплата карткою", text: "Visa та Mastercard. Оплату можна здійснити після підтвердження замовлення." },
  { icon: Banknote, title: "Готівкою при отриманні", text: "Розрахуйтеся при отриманні у відділенні Нової пошти або на складі (накладений платіж)." },
];

export default function DeliveryPage() {
  return (
    <InfoPage title="Доставка і оплата" subtitle="Прості та зрозумілі умови отримання замовлення.">
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-line bg-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-soft p-6 text-sm leading-relaxed text-muted">
        <h3 className="mb-2 text-base font-bold text-ink">Як це працює</h3>
        <ol className="list-inside list-decimal space-y-1">
          <li>Додайте товари в кошик і оформіть замовлення.</li>
          <li>Ми перевіримо наявність і зв&apos;яжемося з вами за вказаним телефоном.</li>
          <li>Відправимо замовлення та повідомимо номер накладної.</li>
          <li>Отримайте посилку та перевірте її при отриманні.</li>
        </ol>
      </div>
    </InfoPage>
  );
}
