"use client";

import { useState, useEffect } from "react";
import { CarBrandType } from "@/app/types/CarBrandType";
import { CarModelType } from "@/app/types/CarModelType";
import { CarModificationType } from "@/app/types/CarModificationType";
import { useCar } from "@/hooks/useCar";

const selectClass =
  "w-full rounded-xl border border-line px-3 py-2.5 text-sm outline-none transition focus:border-brand disabled:cursor-not-allowed disabled:bg-soft disabled:text-muted";

export default function CarSelector({
  onSuccess,
  submitLabel = "Додати в гараж",
}: {
  onSuccess: () => void;
  submitLabel?: string;
}) {
  const { addCar, setActiveCar } = useCar();

  const [brands, setBrands] = useState<CarBrandType[]>([]);
  const [models, setModels] = useState<CarModelType[]>([]);
  const [modifications, setModifications] = useState<CarModificationType[]>([]);

  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [modificationId, setModificationId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/cars/brands").then((res) => res.json()).then(setBrands);
  }, []);

  // обрали марку — підвантажуємо її моделі
  useEffect(() => {
    setModelId("");
    setModifications([]);
    setModificationId("");
    if (!brandId) {
      setModels([]);
      return;
    }
    fetch(`/api/cars/models?brandId=${brandId}`).then((res) => res.json()).then(setModels);
  }, [brandId]);

  // обрали модель — підвантажуємо модифікації
  useEffect(() => {
    setModificationId("");
    if (!modelId) {
      setModifications([]);
      return;
    }
    fetch(`/api/cars/modifications?modelId=${modelId}`).then((res) => res.json()).then(setModifications);
  }, [modelId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const brand = brands.find((b) => b.id === Number(brandId));
    const model = models.find((m) => m.id === Number(modelId));
    const modification = modifications.find((m) => m.id === Number(modificationId));
    if (!brand || !model || !modification) return;

    const car = {
      brandId: brand.id,
      brandName: brand.name,
      modelId: model.id,
      modelName: model.name,
      modificationId: modification.id,
      yearFrom: modification.yearFrom,
      yearTo: modification.yearTo,
      bodyType: modification.bodyType,
      engineType: modification.engineType,
      engineVolume: modification.engineVolume,
    };

    if (!addCar(car)) {
      setError("У гаражі вже максимум авто. Видаліть одне, щоб додати нове.");
      return;
    }

    setActiveCar(car.modificationId);
    onSuccess();
  };

  const label = "mb-1 block text-xs font-semibold text-muted";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>}

      <div>
        <label className={label}>1. Марка</label>
        <select value={brandId} onChange={(e) => setBrandId(e.target.value)} className={selectClass} required>
          <option value="">Оберіть марку</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label}>2. Модель</label>
        <select value={modelId} onChange={(e) => setModelId(e.target.value)} className={selectClass} disabled={!brandId} required>
          <option value="">Оберіть модель</option>
          {models.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={label}>3. Рік, кузов і двигун</label>
        <select
          value={modificationId}
          onChange={(e) => setModificationId(e.target.value)}
          className={selectClass}
          disabled={!modelId}
          required
        >
          <option value="">Оберіть модифікацію</option>
          {modifications.map((m) => (
            <option key={m.id} value={m.id}>
              {m.yearFrom}{m.yearTo ? `–${m.yearTo}` : "+"} · {m.bodyType} · {m.engineType} {m.engineVolume} л
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-[0.98]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
