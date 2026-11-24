"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Factory, Car, ClipboardList } from "lucide-react";

const links = [
  { href: "/admin", label: "Огляд", icon: LayoutDashboard },
  { href: "/admin/products", label: "Товари", icon: Package },
  { href: "/admin/categories", label: "Категорії", icon: FolderTree },
  { href: "/admin/manufacturers", label: "Виробники", icon: Factory },
  { href: "/admin/cars", label: "Авто", icon: Car },
  { href: "/admin/orders", label: "Замовлення", icon: ClipboardList },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="shrink-0 md:w-56">
      <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-line bg-card p-2 md:sticky md:top-28 md:flex-col">
        {links.map(({ href, label, icon: Icon }) => {
          // «Огляд» активний лише на /admin, решта — і на вкладених сторінках
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                active ? "bg-brand text-white shadow-sm" : "text-muted hover:bg-soft hover:text-ink"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
