"use client";

import { createContext, useState, ReactNode } from "react";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";
import { ToastContextType } from "@/app/types/ToastContextType";
import { ToastItemType } from "@/app/types/ToastItemType";
import { ToastKindType } from "@/app/types/ToastKindType";

export const ToastContext = createContext<ToastContextType | null>(null);

const icons = {
  success: <CheckCircle2 size={18} className="text-green-500" />,
  error: <AlertTriangle size={18} className="text-red-500" />,
  info: <Info size={18} className="text-brand" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItemType[]>([]);

  const showToast = (message: string, kind: ToastKindType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, kind }]);
    // прибираємо повідомлення через 2.8 секунди
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="animate-toast pointer-events-auto flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-3 text-sm font-medium text-ink shadow-lg"
          >
            {icons[t.kind]}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
