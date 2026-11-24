import { InfoPageProps } from "@/app/types/InfoPageProps";

// Спільний каркас для інформаційних сторінок (про нас, доставка тощо)
export default function InfoPage({ title, subtitle, children }: InfoPageProps) {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy via-slate-800 to-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-4 py-12">
          <h1 className="animate-fade-up text-3xl font-extrabold sm:text-4xl">{title}</h1>
          {subtitle && <p className="animate-fade-up delay-1 mt-3 max-w-2xl text-slate-300">{subtitle}</p>}
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-10">{children}</div>
    </div>
  );
}
