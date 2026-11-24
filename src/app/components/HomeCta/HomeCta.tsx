import Link from "next/link";
import { Phone } from "lucide-react";

export default function HomeCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand to-orange-500 px-8 py-10 text-white sm:px-12">
        <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/15" />
        <h2 className="relative text-2xl font-extrabold sm:text-3xl">Не знайшли потрібну деталь?</h2>
        <p className="relative mt-2 max-w-xl text-orange-50">
          Зателефонуйте або напишіть нам — підберемо запчастину за VIN-кодом і привеземо під замовлення.
        </p>
        <div className="relative mt-6 flex flex-wrap gap-3">
          <Link
            href="/contacts"
            className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-brand transition hover:scale-105"
          >
            <Phone size={18} /> Зв&apos;язатися з нами
          </Link>
          <Link
            href="/delivery"
            className="rounded-xl border border-white/60 px-6 py-3 font-semibold transition hover:bg-white/15"
          >
            Умови доставки
          </Link>
        </div>
      </div>
    </section>
  );
}
