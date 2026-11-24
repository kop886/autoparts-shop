"use client";

import { Car, CheckCircle2, RotateCcw } from "lucide-react";
import { ProductFiltersProps } from "@/app/types/ProductFiltersProps";

const control =
  "rounded-lg border border-line px-3 py-2 text-sm outline-none transition focus:border-brand";

export default function ProductFilters(props: ProductFiltersProps) {
  const {
    manufacturers, selectedManufacturerId, onManufacturerChange, sort, onSortChange,
    hasCar, onlyCompatible, onToggleOnlyCompatible, minPrice, maxPrice,
    onMinPriceChange, onMaxPriceChange, inStock, onToggleInStock, onReset, resultCount,
  } = props;

  const chip = (active: boolean) =>
    `flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
      active
        ? "border-brand bg-brand/10 text-brand"
        : "border-line text-muted hover:border-brand hover:text-brand"
    }`;

  return (
    <div className="mb-6 rounded-2xl border border-line bg-card p-4">
      <div className="flex flex-wrap items-center gap-3">
        {hasCar && (
          <button onClick={onToggleOnlyCompatible} className={chip(onlyCompatible)}>
            <Car size={16} />
            {onlyCompatible ? "Тільки сумісні з моїм авто" : "Показано всі товари"}
          </button>
        )}

        <button onClick={onToggleInStock} className={chip(inStock)}>
          <CheckCircle2 size={16} />
          В наявності
        </button>

        <select
          value={selectedManufacturerId}
          onChange={(e) => onManufacturerChange(e.target.value)}
          className={control}
        >
          <option value="">Усі виробники</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            min={0}
            placeholder="Ціна від"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className={`${control} w-28`}
          />
          <span className="text-muted">—</span>
          <input
            type="number"
            min={0}
            placeholder="до"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className={`${control} w-24`}
          />
        </div>

        <select value={sort} onChange={(e) => onSortChange(e.target.value)} className={`${control} sm:ml-auto`}>
          <option value="name">За назвою</option>
          <option value="price_asc">Спочатку дешевші</option>
          <option value="price_desc">Спочатку дорожчі</option>
          <option value="newest">Новинки</option>
        </select>

        <button
          onClick={onReset}
          className="flex items-center gap-1 text-sm text-muted transition hover:text-brand"
          title="Скинути фільтри"
        >
          <RotateCcw size={15} /> Скинути
        </button>
      </div>

      {resultCount !== null && (
        <p className="mt-3 text-sm text-muted">Знайдено товарів: {resultCount}</p>
      )}
    </div>
  );
}
