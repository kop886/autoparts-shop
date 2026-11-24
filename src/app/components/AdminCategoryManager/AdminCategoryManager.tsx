"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { CategoryAdminType } from "@/app/types/CategoryAdminType";

export default function AdminCategoryManager() {
  const [categories, setCategories] = useState<CategoryAdminType[]>([]);
  const [nameUk, setNameUk] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [parentId, setParentId] = useState("");
  const [error, setError] = useState("");

  const load = () => {
    fetch("/api/admin/categories").then((res) => res.json()).then(setCategories);
  };

  useEffect(() => {
    load();
  }, []);

  const parentOptions = categories.filter((c) => c.parentId === null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameUk, nameEn, slug, parentId: parentId || null }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setNameUk("");
    setNameEn("");
    setSlug("");
    setParentId("");
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Видалити цю категорію?")) return;

    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
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
        <h2 className="mb-3 font-semibold">Список категорій</h2>
        <div className="divide-y divide-line rounded-xl border border-line bg-card">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">
                  {c.parentNameUk ? `${c.parentNameUk} → ` : ""}
                  {c.nameUk}
                </p>
                <p className="text-xs text-muted">{c.slug}</p>
              </div>
              <button onClick={() => handleDelete(c.id)} className="text-muted hover:text-red-600">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Додати категорію</h2>
        <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-line bg-card p-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <input placeholder="Назва (укр)" value={nameUk} onChange={(e) => setNameUk(e.target.value)} className={inputClass} required />
          <input placeholder="Назва (eng)" value={nameEn} onChange={(e) => setNameEn(e.target.value)} className={inputClass} required />
          <input placeholder="slug (наприклад: brake-discs)" value={slug} onChange={(e) => setSlug(e.target.value)} className={inputClass} required />

          <select value={parentId} onChange={(e) => setParentId(e.target.value)} className={inputClass}>
            <option value="">— Без батьківської категорії —</option>
            {parentOptions.map((p) => (
              <option key={p.id} value={p.id}>{p.nameUk}</option>
            ))}
          </select>

          <button type="submit" className="w-full rounded-lg bg-brand py-2 text-sm font-semibold text-white hover:bg-brand-dark">
            Додати
          </button>
        </form>
      </div>
    </div>
  );
}