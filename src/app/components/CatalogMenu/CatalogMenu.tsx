"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LayoutGrid, ChevronRight } from "lucide-react";
import { CategoryWithChildrenType } from "@/app/types/CategoryWithChildrenType";
import CategoryIcon from "@/app/components/CategoryIcon/CategoryIcon";

// Випадаюче меню «Каталог»: ліворуч розділи, праворуч — підкатегорії
export default function CatalogMenu() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryWithChildrenType[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // категорії вантажимо один раз — при першому відкритті
  useEffect(() => {
    if (!open || categories.length > 0) return;
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: CategoryWithChildrenType[]) => {
        setCategories(data);
        setActiveId(data[0]?.id ?? null);
      });
  }, [open, categories.length]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const active = categories.find((c) => c.id === activeId);

  return (
    <div ref={ref} className="md:relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Каталог"
        className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-brand-dark active:scale-95"
      >
        <LayoutGrid size={20} />
        <span className="hidden sm:inline">Каталог</span>
      </button>

      {open && (
        <div className="animate-dropdown absolute left-2 right-2 top-full z-50 mt-2 flex md:left-0 md:right-auto md:w-[720px] overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
          <ul className="w-1/2 max-w-[280px] border-r border-line bg-soft/60 py-2">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/catalog/${c.slug}`}
                  onMouseEnter={() => setActiveId(c.id)}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition ${
                    c.id === activeId ? "bg-card text-brand" : "hover:text-brand"
                  }`}
                >
                  <CategoryIcon slug={c.slug} size={18} />
                  <span className="flex-1">{c.nameUk}</span>
                  <ChevronRight size={14} className="text-muted" />
                </Link>
              </li>
            ))}
            {categories.length === 0 && <li className="px-4 py-3 text-sm text-muted">Завантаження...</li>}
          </ul>

          <div className="flex-1 p-5">
            {active && (
              <>
                <h3 className="mb-3 text-lg font-bold">{active.nameUk}</h3>
                <ul className="grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                  {active.children.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/catalog/${child.slug}`}
                        onClick={() => setOpen(false)}
                        className="block rounded-md py-1 text-sm text-muted transition hover:translate-x-1 hover:text-brand"
                      >
                        {child.nameUk}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/catalog/${active.slug}`}
                  onClick={() => setOpen(false)}
                  className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
                >
                  Усі товари розділу →
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
