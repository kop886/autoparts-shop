"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { ManufacturerType } from "@/app/types/ManufacturerType";

export default function AdminManufacturerManager() {
  const [manufacturers, setManufacturers] = useState<ManufacturerType[]>([]);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/admin/manufacturers").then((res) => res.json()).then(setManufacturers);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/manufacturers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, country }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setName("");
    setCountry("");
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цього виробника?")) return;
    const res = await fetch(`/api/admin/manufacturers/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.error);
      return;
    }
    load();
  };

  const inputClass = "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="mb-3 font-semibold">Список виробників</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-card">
          {manufacturers.map((m) => (
            <div key={m.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">{m.name}</p>
                {m.country && <p className="text-xs text-muted">{m.country}</p>}
              </div>
              <button onClick={() => handleDelete(m.id)} className="text-muted hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Додати виробника</h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-line bg-card p-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <input placeholder="Назва" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
          <input placeholder="Країна (необов'язково)" value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass} />
          <button type="submit" className="w-full rounded-lg bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            Додати
          </button>
        </form>
      </div>
    </div>
  );
}