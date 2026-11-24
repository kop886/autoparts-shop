"use client";

import Link from "next/link";
import { Heart, Scale, ShoppingCart, Phone } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import AuthMenu from "@/app/components/AuthMenu/AuthMenu";
import CarMenu from "@/app/components/CarMenu/CarMenu";
import CatalogMenu from "@/app/components/CatalogMenu/CatalogMenu";
import SearchBox from "@/app/components/SearchBox/SearchBox";
import ThemeToggle from "@/app/components/ThemeToggle/ThemeToggle";
import HeaderIconLink from "@/app/components/HeaderIconLink/HeaderIconLink";

export default function Header() {
  const { totalCount } = useCart();
  const { favoriteIds } = useFavorites();
  const { compareIds } = useCompare();

  return (
    <>
      {/* Верхня смужка */}
      <div className="bg-navy text-sm text-slate-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5">
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-brand" />
            <span>0 (800) 123-456</span>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/about" className="transition hover:text-white">Про нас</Link>
            <Link href="/delivery" className="transition hover:text-white">Доставка і оплата</Link>
            <Link href="/contacts" className="transition hover:text-white">Контакти</Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>

      {/* Основна шапка (липка) */}
      <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Auto<span className="text-brand">Parts</span>
          </Link>

          {/* на телефоні: «Каталог» + пошук в окремому рядку; на ПК — в одну лінію з логотипом */}
          <div className="order-2 flex w-full items-center gap-2 md:order-none md:contents">
            <CatalogMenu />
            <div className="min-w-0 flex-1">
              <SearchBox />
            </div>
          </div>

          <nav className="order-1 ml-auto flex items-center md:order-none md:ml-0">
            <CarMenu />
            <HeaderIconLink href="/favorites" icon={Heart} label="Обране" count={favoriteIds.length} />
            <HeaderIconLink href="/compare" icon={Scale} label="Порівняння" count={compareIds.length} />
            <HeaderIconLink href="/cart" icon={ShoppingCart} label="Кошик" count={totalCount} />
            <AuthMenu />
          </nav>
        </div>
      </header>
    </>
  );
}
