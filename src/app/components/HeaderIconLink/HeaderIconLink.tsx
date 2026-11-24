import Link from "next/link";
import { LucideIcon } from "lucide-react";

// Іконка-посилання в шапці з необов'язковим лічильником
export default function HeaderIconLink({
  href,
  icon: Icon,
  label,
  count = 0,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  count?: number;
}) {
  return (
    <Link
      href={href}
      title={label}
      className="relative flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1 text-xs text-muted transition hover:bg-soft hover:text-brand"
    >
      <Icon size={22} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
      <span className="hidden xl:inline">{label}</span>
    </Link>
  );
}
