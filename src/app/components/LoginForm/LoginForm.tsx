"use client";

import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/useToast";

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { setUser } = useUser();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setUser(data.user);
      showToast(`Вітаємо, ${data.user.name}!`);
      onSuccess();
    } catch {
      setError("Немає зв'язку з сервером. Спробуйте ще раз.");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-xl border border-line px-4 py-2.5 text-sm outline-none transition focus:border-brand";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Пошта"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={input}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={input}
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand py-2.5 text-sm font-bold text-white transition hover:bg-brand-dark active:scale-[0.98] disabled:opacity-60"
      >
        {loading ? "Вхід..." : "Увійти"}
      </button>
    </form>
  );
}
