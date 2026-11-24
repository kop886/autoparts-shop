"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <p className="py-16 text-center text-muted">Завантаження...</p>;
  }

  return <>{children}</>;
}