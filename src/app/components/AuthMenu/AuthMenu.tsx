"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, LayoutDashboard, LogOut, UserCircle } from "lucide-react";
import LoginForm from "@/app/components/LoginForm/LoginForm";
import RegisterForm from "@/app/components/RegisterForm/RegisterForm";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/hooks/useToast";

export default function AuthMenu() {
  const { user, logout } = useUser();
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonClass =
    "flex flex-col items-center gap-0.5 rounded-lg px-2.5 py-1 text-xs text-muted transition hover:bg-soft hover:text-brand";

  if (user) {
    return (
      <div className="relative" ref={menuRef}>
        <button onClick={() => setOpen(!open)} className={buttonClass}>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand text-[11px] font-bold uppercase text-white">
            {user.name.charAt(0)}
          </span>
          <span className="hidden max-w-[70px] truncate xl:inline">{user.name}</span>
        </button>

        {open && (
          <div className="animate-dropdown absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-card py-2 shadow-2xl">
            <div className="border-b border-line px-4 pb-2 pt-1">
              <p className="truncate text-sm font-bold">{user.name}</p>
              <p className="truncate text-xs text-muted">{user.email}</p>
            </div>

            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-soft"
            >
              <UserCircle size={16} /> Мій профіль
            </Link>

            {user.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-soft"
              >
                <LayoutDashboard size={16} /> Адмін-панель
              </Link>
            )}

            <button
              onClick={() => {
                logout();
                setOpen(false);
                showToast("Ви вийшли з акаунта", "info");
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-500 hover:bg-soft"
            >
              <LogOut size={16} /> Вийти
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)} className={buttonClass}>
        <User size={22} />
        <span className="hidden xl:inline">Вхід</span>
      </button>

      {open && (
        <div className="animate-dropdown absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-line bg-card p-4 shadow-2xl">
          <div className="mb-4 flex rounded-xl bg-soft p-1 text-sm font-semibold">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-1.5 transition ${
                  tab === t ? "bg-card shadow-sm" : "text-muted"
                }`}
              >
                {t === "login" ? "Увійти" : "Реєстрація"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <LoginForm onSuccess={() => setOpen(false)} />
          ) : (
            <RegisterForm onSuccess={() => setOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}
