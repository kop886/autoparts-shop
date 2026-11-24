"use client";

import { Scale } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";

export default function CompareButton({
  productId,
  className = "",
}: {
  productId: number;
  className?: string;
}) {
  const { isInCompare, toggleCompare } = useCompare();
  const active = isInCompare(productId);

  return (
    <button
      type="button"
      aria-label="Порівняти"
      title={active ? "Прибрати з порівняння" : "Додати до порівняння"}
      onClick={() => toggleCompare(productId)}
      className={`flex h-9 w-9 items-center justify-center rounded-full border transition hover:scale-110 ${
        active
          ? "border-brand bg-brand text-white"
          : "border-line bg-card/90 text-muted backdrop-blur hover:text-brand"
      } ${className}`}
    >
      <Scale size={17} />
    </button>
  );
}
