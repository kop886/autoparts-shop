import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import InfoPage from "@/app/components/InfoPage/InfoPage";

export const metadata: Metadata = { title: "Контакти — AutoParts" };

const contacts = [
  { icon: Phone, title: "Телефон", lines: ["0 (800) 123-456", "Безкоштовно по Україні"] },
  { icon: Mail, title: "Пошта", lines: ["info@autoparts.example", "Відповідаємо протягом доби"] },
  { icon: MapPin, title: "Адреса складу", lines: ["м. Миколаїв, Миколаївська обл.", "Самовивіз за домовленістю"] },
  { icon: Clock, title: "Графік роботи", lines: ["Пн–Нд: 8:00–20:00", "Без вихідних"] },
];

export default function ContactsPage() {
  return (
    <InfoPage title="Контакти" subtitle="Зв'яжіться з нами будь-яким зручним способом.">
      <div className="grid gap-4 sm:grid-cols-2">
        {contacts.map(({ icon: Icon, title, lines }) => (
          <div key={title} className="flex gap-4 rounded-2xl border border-line bg-card p-6">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-1 font-medium">{lines[0]}</p>
              <p className="text-sm text-muted">{lines[1]}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted">
        Для підбору деталі за VIN-кодом надішліть його на пошту разом із назвою потрібної запчастини.
      </p>
    </InfoPage>
  );
}
