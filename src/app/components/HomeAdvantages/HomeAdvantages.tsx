import { Car, ShieldCheck, Truck, Headphones } from "lucide-react";

const advantages = [
  { icon: Car, title: "Підбір за авто", text: "Марка, модель, рік, кузов і двигун — до 3 авто у вашому гаражі" },
  { icon: ShieldCheck, title: "Гарантія сумісності", text: "Показуємо лише деталі, які підходять саме до вашої модифікації" },
  { icon: Truck, title: "Швидка доставка", text: "Відправляємо Новою поштою в день замовлення, 1–3 дні по Україні" },
  { icon: Headphones, title: "Підтримка 7 днів", text: "Допоможемо з вибором деталі та оформленням замовлення" },
];

export default function HomeAdvantages() {
  return (
    <section className="border-y border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {advantages.map(({ icon: Icon, title, text }, i) => (
          <div key={title} className="animate-fade-up flex gap-4" style={{ animationDelay: `${i * 70}ms` }}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
