import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const linkClass = "transition hover:text-brand";

export default function Footer() {
  return (
    <footer className="mt-16 bg-navy text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="text-2xl font-extrabold text-white">
            Auto<span className="text-brand">Parts</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Інтернет-магазин автозапчастин з підбором за вашим авто. Тільки сумісні деталі від
            перевірених виробників.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Каталог</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/catalog" className={linkClass}>Усі розділи</Link></li>
            <li><Link href="/select-car" className={linkClass}>Підбір за авто</Link></li>
            <li><Link href="/favorites" className={linkClass}>Обране</Link></li>
            <li><Link href="/compare" className={linkClass}>Порівняння товарів</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Покупцям</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className={linkClass}>Про нас</Link></li>
            <li><Link href="/delivery" className={linkClass}>Доставка і оплата</Link></li>
            <li><Link href="/returns" className={linkClass}>Повернення і обмін</Link></li>
            <li><Link href="/faq" className={linkClass}>Часті запитання</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">Контакти</h3>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-2"><Phone size={15} className="text-brand" /> 0 (800) 123-456</li>
            <li className="flex items-center gap-2"><Mail size={15} className="text-brand" /> info@autoparts.example</li>
            <li className="flex items-center gap-2"><MapPin size={15} className="text-brand" /> м. Миколаїв, Миколаївська обл.</li>
            <li className="flex items-center gap-2"><Clock size={15} className="text-brand" /> Пн–Нд: 8:00–20:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © 2026 AutoParts. Навчальний проєкт.
      </div>
    </footer>
  );
}
