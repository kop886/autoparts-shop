"use client";

import { useState, useEffect } from "react";
import { CarTreeBrandType } from "@/app/types/CarTreeType";

type Props = {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
};

export default function AdminCompatibilityPicker({ selectedIds, onChange }: Props) {
  const [tree, setTree] = useState<CarTreeBrandType[]>([]);

  useEffect(() => {
    fetch("/api/admin/car-tree").then((res) => res.json()).then(setTree);
  }, []);

  const toggle = (modId: number) => {
    if (selectedIds.includes(modId)) {
      onChange(selectedIds.filter((id) => id !== modId));
    } else {
      onChange([...selectedIds, modId]);
    }
  };

  return (
    <div className="max-h-72 space-y-3 overflow-y-auto rounded-lg border border-line p-3">
      {tree.map((brand) => (
        <div key={brand.id}>
          <p className="mb-1 text-sm font-semibold text-ink">{brand.name}</p>
          {brand.models.map((model) => (
            <div key={model.id} className="ml-3 mb-1">
              <p className="text-xs font-medium text-muted">{model.name}</p>
              <div className="ml-2 flex flex-wrap gap-2">
                {model.modifications.map((mod) => (
                  <label
                    key={mod.id}
                    className="flex items-center gap-1.5 rounded border border-line px-2 py-1 text-xs hover:bg-soft"
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(mod.id)}
                      onChange={() => toggle(mod.id)}
                    />
                    {mod.yearFrom}
                    {mod.yearTo ? `–${mod.yearTo}` : "+"} {mod.bodyType} {mod.engineType} {mod.engineVolume}л
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      {tree.length === 0 && <p className="text-sm text-muted">Спершу додайте авто в розділі «Авто»</p>}
    </div>
  );
}