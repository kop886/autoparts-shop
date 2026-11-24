import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";
import { UserType } from "@/app/types/UserType";

export async function requireAdmin(request: NextRequest): Promise<UserType | null> {
  const token = request.cookies.get("session")?.value;
  if (!token) return null;

  const user = await verifyToken(token);
  if (!user || user.role !== "admin") return null;

  return user;
}