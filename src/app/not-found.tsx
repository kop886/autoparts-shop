import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 text-brand">
        <SearchX size={38} />
      </div>
      <p className="text-6xl font-extrabold text-brand">404</p>
      <h1 className="mt-2 text-2xl font-bold">Сторінку не знайдено</h1>
      <p className="mt-2 text-muted">Можливо, посилання застаріло або сторінку було видалено.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
          На головну
        </Link>
        <Link href="/catalog" className="rounded-xl border border-line px-6 py-2.5 font-semibold hover:border-brand hover:text-brand">
          До каталогу
        </Link>
      </div>
    </div>
  );
}
