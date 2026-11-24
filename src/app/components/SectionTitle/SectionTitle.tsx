import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionTitle({
  title,
  subtitle,
  href,
  linkText = "Дивитися все",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-brand hover:underline">
          {linkText} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
