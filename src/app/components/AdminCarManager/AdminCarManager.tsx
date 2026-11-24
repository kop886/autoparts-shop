"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { CarBrandType } from "@/app/types/CarBrandType";
import { CarModelType } from "@/app/types/CarModelType";
import { CarModificationType } from "@/app/types/CarModificationType";

export default function AdminCarManager() {
  const [brands, setBrands] = useState<CarBrandType[]>([]);
  const [models, setModels] = useState<CarModelType[]>([]);
  const [modifications, setModifications] = useState<CarModificationType[]>([]);

  const [selectedBrandId, setSelectedBrandId] = useState("");
  const [selectedModelId, setSelectedModelId] = useState("");

  const [newBrandName, setNewBrandName] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [engineType, setEngineType] = useState("");
  const [engineVolume, setEngineVolume] = useState("");

  const loadBrands = () => {
    fetch("/api/admin/car-brands").then((res) => res.json()).then(setBrands);
  };

  const loadModels = (brandId: string) => {
    if (!brandId) {
      setModels([]);
      return;
    }
    fetch(`/api/admin/car-models?brandId=${brandId}`).then((res) => res.json()).then(setModels);
  };

  const loadModifications = (modelId: string) => {
    if (!modelId) {
      setModifications([]);
      return;
    }
    fetch(`/api/admin/car-modifications?modelId=${modelId}`).then((res) => res.json()).then(setModifications);
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleSelectBrand = (brandId: string) => {
    setSelectedBrandId(brandId);
    setSelectedModelId("");
    setModifications([]);
    loadModels(brandId);
  };

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    loadModifications(modelId);
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/car-brands", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newBrandName }),
    });
    if (res.ok) {
      setNewBrandName("");
      loadBrands();
    }
  };

  const handleDeleteBrand = async (id: number) => {
    if (!confirm("Видалити марку разом з усіма моделями?")) return;
    await fetch(`/api/admin/car-brands/${id}`, { method: "DELETE" });
    loadBrands();
    if (String(id) === selectedBrandId) {
      setSelectedBrandId("");
      setModels([]);
      setModifications([]);
    }
  };

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrandId) return;
    const res = await fetch("/api/admin/car-models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId: Number(selectedBrandId), name: newModelName }),
    });
    if (res.ok) {
      setNewModelName("");
      loadModels(selectedBrandId);
    }
  };

  const handleDeleteModel = async (id: number) => {
    if (!confirm("Видалити модель разом з усіма модифікаціями?")) return;
    await fetch(`/api/admin/car-models/${id}`, { method: "DELETE" });
    loadModels(selectedBrandId);
    if (String(id) === selectedModelId) {
      setSelectedModelId("");
      setModifications([]);
    }
  };

  const handleAddModification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModelId) return;
    const res = await fetch("/api/admin/car-modifications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelId: Number(selectedModelId),
        yearFrom: Number(yearFrom),
        yearTo: yearTo ? Number(yearTo) : null,
        bodyType,
        engineType,
        engineVolume: Number(engineVolume),
      }),
    });
    if (res.ok) {
      setYearFrom("");
      setYearTo("");
      setBodyType("");
      setEngineType("");
      setEngineVolume("");
      loadModifications(selectedModelId);
    }
  };

  const handleDeleteModification = async (id: number) => {
    if (!confirm("Видалити цю модифікацію?")) return;
    await fetch(`/api/admin/car-modifications/${id}`, { method: "DELETE" });
    loadModifications(selectedModelId);
  };

  const inputClass = "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand";

  return (
    <div className="space-y-8">
      {/* Марки */}
      <div>
        <h2 className="mb-3 font-semibold">Марки</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="divide-y divide-line rounded-xl border border-line bg-card">
            {brands.map((b) => (
              <button
                key={b.id}
                onClick={() => handleSelectBrand(String(b.id))}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                  String(b.id) === selectedBrandId ? "bg-brand/10 text-brand" : "hover:bg-soft"
                }`}
              >
                {b.name}
                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteBrand(b.id);
                  }}
                  className="text-muted hover:text-red-600"
                >
                  <Trash2 size={14} />
                </span>
              </button>
            ))}
          </div>
          <form onSubmit={handleAddBrand} className="flex gap-2">
            <input
              placeholder="Нова марка (наприклад Mazda)"
              value={newBrandName}
              onChange={(e) => setNewBrandName(e.target.value)}
              className={inputClass}
              required
            />
            <button type="submit" className="rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">
              Додати
            </button>
          </form>
        </div>
      </div>

      {/* Моделі */}
      {selectedBrandId && (
        <div>
          <h2 className="mb-3 font-semibold">
            Моделі — {brands.find((b) => String(b.id) === selectedBrandId)?.name}
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="divide-y divide-line rounded-xl border border-line bg-card">
              {models.length === 0 && <p className="px-4 py-3 text-sm text-muted">Моделей ще немає</p>}
              {models.map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleSelectModel(String(m.id))}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                    String(m.id) === selectedModelId ? "bg-brand/10 text-brand" : "hover:bg-soft"
                  }`}
                >
                  {m.name}
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteModel(m.id);
                    }}
                    className="text-muted hover:text-red-600"
                  >
                    <Trash2 size={14} />
                  </span>
                </button>
              ))}
            </div>
            <form onSubmit={handleAddModel} className="flex gap-2">
              <input
                placeholder="Нова модель (наприклад CX-5)"
                value={newModelName}
                onChange={(e) => setNewModelName(e.target.value)}
                className={inputClass}
                required
              />
              <button type="submit" className="rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-dark">
                Додати
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Модифікації */}
      {selectedModelId && (
        <div>
          <h2 className="mb-3 font-semibold">
            Модифікації — {models.find((m) => String(m.id) === selectedModelId)?.name}
          </h2>

          <div className="mb-4 divide-y divide-line rounded-xl border border-line bg-card">
            {modifications.length === 0 && <p className="px-4 py-3 text-sm text-muted">Модифікацій ще немає</p>}
            {modifications.map((m) => (
              <div key={m.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                <span>
                  {m.yearFrom}
                  {m.yearTo ? `–${m.yearTo}` : "+"} · {m.bodyType} · {m.engineType} {m.engineVolume}л
                </span>
                <button onClick={() => handleDeleteModification(m.id)} className="text-muted hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleAddModification}
            className="grid gap-3 rounded-xl border border-line bg-card p-4 sm:grid-cols-2"
          >
            <input type="number" placeholder="Рік від" value={yearFrom} onChange={(e) => setYearFrom(e.target.value)} className={inputClass} required />
            <input type="number" placeholder="Рік до (необов'язково)" value={yearTo} onChange={(e) => setYearTo(e.target.value)} className={inputClass} />
            <input placeholder="Кузов (Седан, Хетчбек...)" value={bodyType} onChange={(e) => setBodyType(e.target.value)} className={inputClass} required />
            <input placeholder="Двигун (Бензин, Дизель...)" value={engineType} onChange={(e) => setEngineType(e.target.value)} className={inputClass} required />
            <input type="number" step="0.1" placeholder="Об'єм (напр. 1.6)" value={engineVolume} onChange={(e) => setEngineVolume(e.target.value)} className={inputClass} required />
            <button type="submit" className="rounded-lg bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark sm:col-span-2">
              Додати модифікацію
            </button>
          </form>
        </div>
      )}
    </div>
  );
}