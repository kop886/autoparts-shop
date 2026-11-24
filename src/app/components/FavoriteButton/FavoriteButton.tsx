"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/useToast";

export default function FavoriteButton({
  productId,
  className = "",
}: {
  productId: number;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { showToast } = useToast();
  const active = isFavorite(productId);

  return (
    <button
      type="button"
      aria-label={active ? "Прибрати з обраного" : "Додати в обране"}
      title={active ? "Прибрати з обраного" : "Додати в обране"}
      onClick={() => {
        toggleFavorite(productId);
        showToast(active ? "Прибрано з обраного" : "Додано в обране", "info");
      }}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-line bg-card/90 backdrop-blur transition hover:scale-110 ${
        active ? "text-red-500" : "text-muted hover:text-red-500"
      } ${className}`}
    >
      <Heart size={17} className={active ? "fill-red-500" : ""} />
    </button>
  );
}
