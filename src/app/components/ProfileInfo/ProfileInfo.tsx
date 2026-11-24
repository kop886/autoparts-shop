"use client";

import { Mail, Shield } from "lucide-react";
import { useUser } from "@/hooks/useUser";

export default function ProfileInfo() {
  const { user } = useUser();
  if (!user) return null;

  return (
    <div className="mb-8 flex items-center gap-5 rounded-2xl border border-line bg-card p-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-orange-400 text-2xl font-extrabold uppercase text-white">
        {user.name.charAt(0)}
      </div>
      <div>
        <p className="text-xl font-extrabold">{user.name}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <Mail size={14} /> {user.email}
        </p>
        {user.role === "admin" && (
          <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand">
            <Shield size={14} /> Адміністратор
          </p>
        )}
      </div>
    </div>
  );
}
