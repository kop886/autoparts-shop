import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BreadcrumbItemType } from "@/app/types/BreadcrumbItemType";

export default function Breadcrumbs({ items }: { items: BreadcrumbItemType[] }) {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-1 text-sm text-muted">
      <Link href="/" className="hover:text-brand">Головна</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand">{item.label}</Link>
          ) : (
            <span className="font-medium text-ink">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
