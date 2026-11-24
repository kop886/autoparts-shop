"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { ProductListItemType } from "@/app/types/ProductListItemType";
import { useDebounce } from "@/hooks/useDebounce";
import { formatPrice } from "@/lib/format";
import ProductImage from "@/app/components/ProductImage/ProductImage";

export default function SearchBox() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductListItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const debounced = useDebounce(query.trim(), 250);

  // підказки під час введення
  useEffect(() => {
    if (debounced.length < 2) {
      setResults([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(debounced)}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setResults(Array.isArray(data) ? data : []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [debounced]);

  // закриваємо підказки при кліку поза полем
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const showDropdown = open && query.trim().length >= 2;

  return (
    <div ref={boxRef} className="relative w-full">
      <form onSubmit={submit} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="Пошук запчастин..."
          className="w-full rounded-xl border border-line bg-soft py-2.5 pl-4 pr-20 text-sm outline-none transition focus:border-brand focus:bg-card"
        />
        <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="rounded-full p-1 text-muted hover:text-ink"
              aria-label="Очистити"
            >
              <X size={16} />
            </button>
          )}
          <button type="submit" className="rounded-lg bg-brand p-1.5 text-white hover:bg-brand-dark" aria-label="Шукати">
            <Search size={16} />
          </button>
        </div>
      </form>

      {showDropdown && (
        <div className="animate-dropdown absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-line bg-card shadow-xl">
          {loading && results.length === 0 ? (
            <div className="flex items-center gap-2 px-4 py-4 text-sm text-muted">
              <Loader2 size={16} className="animate-spin" /> Пошук...
            </div>
          ) : results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-muted">Нічого не знайдено за запитом «{query}»</p>
          ) : (
            <>
              <ul>
                {results.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/product/${p.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 transition hover:bg-soft"
                    >
                      <ProductImage
                        imageUrl={p.imageUrl}
                        alt={p.nameUk}
                        categorySlug={p.categorySlug}
                        parentSlug={p.parentSlug}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{p.nameUk}</p>
                        <p className="text-xs text-muted">
                          {p.manufacturerName} · {p.articleNumber}
                        </p>
                      </div>
                      <span className="whitespace-nowrap text-sm font-bold">{formatPrice(p.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/search?q=${encodeURIComponent(query.trim())}`}
                onClick={() => setOpen(false)}
                className="block border-t border-line px-4 py-2.5 text-center text-sm font-semibold text-brand hover:bg-soft"
              >
                Усі результати
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
