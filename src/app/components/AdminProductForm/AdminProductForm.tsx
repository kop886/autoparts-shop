"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import Image from "next/image";
import { CategoryType } from "@/app/types/CategoryType";
import { ManufacturerType } from "@/app/types/ManufacturerType";
import { ProductFormValuesType } from "@/app/types/ProductFormValuesType";
import AdminCompatibilityPicker from "@/app/components/AdminCompatibilityPicker/AdminCompatibilityPicker";

const emptyValues: ProductFormValuesType = {
  categoryId: "", manufacturerId: "", nameUk: "", nameEn: "", articleNumber: "",
  price: "", stockQuantity: "", imageUrl: "", descriptionUk: "", descriptionEn: "",
  compatibleModificationIds: [],
};

export default function AdminProductForm({ productId }: { productId?: string }) {
  const router = useRouter();
  const { showToast } = useToast();
  const isEdit = !!productId;

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [manufacturers, setManufacturers] = useState<ManufacturerType[]>([]);
  const [values, setValues] = useState<ProductFormValuesType>(emptyValues);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories").then((res) => res.json()).then(setCategories);
    fetch("/api/admin/manufacturers").then((res) => res.json()).then(setManufacturers);

    if (isEdit) {
      fetch(`/api/admin/products/${productId}`)
        .then((res) => res.json())
        .then((p) =>
          setValues({
            categoryId: String(p.categoryId),
            manufacturerId: String(p.manufacturerId),
            nameUk: p.nameUk,
            nameEn: p.nameEn,
            articleNumber: p.articleNumber,
            price: String(p.price),
            stockQuantity: String(p.stockQuantity),
            imageUrl: p.imageUrl || "",
            descriptionUk: p.descriptionUk || "",
            descriptionEn: p.descriptionEn || "",
            compatibleModificationIds: p.compatibleModificationIds,
          })
        );
    }
  }, [productId, isEdit]);

  const update = (field: keyof ProductFormValuesType, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    setUploading(false);

    if (res.ok) {
      update("imageUrl", data.imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      categoryId: Number(values.categoryId),
      manufacturerId: Number(values.manufacturerId),
      nameUk: values.nameUk,
      nameEn: values.nameEn,
      articleNumber: values.articleNumber,
      price: Number(values.price),
      stockQuantity: Number(values.stockQuantity),
      imageUrl: values.imageUrl,
      descriptionUk: values.descriptionUk,
      descriptionEn: values.descriptionEn,
      compatibleModificationIds: values.compatibleModificationIds,
    };

    const res = await fetch(isEdit ? `/api/admin/products/${productId}` : "/api/admin/products", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    showToast(isEdit ? "Зміни збережено" : "Товар додано");
    router.push("/admin/products");
  };

  const inputClass = "w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        <input placeholder="Назва (укр)" value={values.nameUk} onChange={(e) => update("nameUk", e.target.value)} className={inputClass} required />
        <input placeholder="Назва (eng)" value={values.nameEn} onChange={(e) => update("nameEn", e.target.value)} className={inputClass} required />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <select value={values.categoryId} onChange={(e) => update("categoryId", e.target.value)} className={inputClass} required>
          <option value="">Категорія</option>
          {/* підкатегорії групуємо під назвою розділу */}
          {categories
            .filter((c) => c.parentId === null)
            .map((root) => {
              const children = categories.filter((c) => c.parentId === root.id);
              return children.length > 0 ? (
                <optgroup key={root.id} label={root.nameUk}>
                  {children.map((c) => (
                    <option key={c.id} value={c.id}>{c.nameUk}</option>
                  ))}
                </optgroup>
              ) : (
                <option key={root.id} value={root.id}>{root.nameUk}</option>
              );
            })}
        </select>
        <select value={values.manufacturerId} onChange={(e) => update("manufacturerId", e.target.value)} className={inputClass} required>
          <option value="">Виробник</option>
          {manufacturers.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <input placeholder="Артикул" value={values.articleNumber} onChange={(e) => update("articleNumber", e.target.value)} className={inputClass} required />
        <input type="number" placeholder="Ціна, грн" value={values.price} onChange={(e) => update("price", e.target.value)} className={inputClass} required />
        <input type="number" placeholder="Кількість на складі" value={values.stockQuantity} onChange={(e) => update("stockQuantity", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-ink">Фото товару</label>
        <div className="flex items-center gap-4">
          {values.imageUrl && (
            <Image src={values.imageUrl} alt="" width={64} height={64} unoptimized className="rounded-lg border border-line object-contain" />
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
          {uploading && <span className="text-xs text-muted">Завантаження...</span>}
        </div>
      </div>

      <textarea placeholder="Опис (укр)" value={values.descriptionUk} onChange={(e) => update("descriptionUk", e.target.value)} rows={3} className={inputClass} />
      <textarea placeholder="Опис (eng)" value={values.descriptionEn} onChange={(e) => update("descriptionEn", e.target.value)} rows={3} className={inputClass} />

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">Сумісні авто</label>
        <AdminCompatibilityPicker
          selectedIds={values.compatibleModificationIds}
          onChange={(ids) => setValues((v) => ({ ...v, compatibleModificationIds: ids }))}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:bg-gray-300"
      >
        {submitting ? "Збереження..." : isEdit ? "Зберегти зміни" : "Додати товар"}
      </button>
    </form>
  );
}