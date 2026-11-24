"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, LogIn } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/useToast";
import CartSummary from "@/app/components/CartSummary/CartSummary";
import EmptyState from "@/app/components/EmptyState/EmptyState";

export default function CheckoutForm() {
  const router = useRouter();
  const { items, clearCart } = useCart();
  const { user, loading } = useUser();
  const { showToast } = useToast();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      // на сервер відправляємо лише id і кількість — ціни він бере з бази сам
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          phone,
          address,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      clearCart();
      showToast(`Замовлення №${data.orderId} оформлено!`);
      router.push("/profile");
    } catch {
      setError("Немає зв'язку з сервером. Спробуйте ще раз.");
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingCart}
        title="Кошик порожній"
        text="Додайте товари, щоб оформити замовлення."
        action={
          <Link href="/catalog" className="rounded-xl bg-brand px-6 py-2.5 font-semibold text-white hover:bg-brand-dark">
            До каталогу
          </Link>
        }
      />
    );
  }

  const input =
    "w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none transition focus:border-brand";

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-line bg-card p-6">
        <h2 className="text-lg font-bold">Контактні дані та доставка</h2>

        {!loading && !user && (
          <div className="flex items-center gap-3 rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-600">
            <LogIn size={18} className="shrink-0" />
            Щоб оформити замовлення, увійдіть в акаунт — іконка профілю у верхньому правому куті.
          </div>
        )}

        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>}

        {user && (
          <p className="text-sm text-muted">
            Замовлення оформлюється на <span className="font-semibold text-ink">{user.name}</span> ({user.email})
          </p>
        )}

        <div>
          <label className="mb-1 block text-sm font-semibold">Телефон</label>
          <input
            type="tel"
            placeholder="+380 50 123 45 67"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={input}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold">Адреса доставки</label>
          <textarea
            placeholder="Місто, вулиця, будинок або відділення Нової пошти"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className={input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting || !user}
          className="w-full rounded-xl bg-brand py-3 font-bold text-white transition hover:bg-brand-dark active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Оформлення..." : "Підтвердити замовлення"}
        </button>
      </form>

      <CartSummary>
        <ul className="space-y-1.5 text-xs text-muted">
          {items.map((i) => (
            <li key={i.productId} className="flex justify-between gap-2">
              <span className="truncate">{i.nameUk}</span>
              <span className="shrink-0">× {i.quantity}</span>
            </li>
          ))}
        </ul>
      </CartSummary>
    </div>
  );
}
