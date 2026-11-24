import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  const row = db.prepare("SELECT * FROM users WHERE lower(email) = ?").get(email) as
    | { id: number; email: string; password_hash: string; name: string; role: "user" | "admin" }
    | undefined;

  if (!row) {
    return NextResponse.json({ error: "Невірна пошта або пароль" }, { status: 401 });
  }

  const passwordMatches = await bcrypt.compare(password, row.password_hash);
  if (!passwordMatches) {
    return NextResponse.json({ error: "Невірна пошта або пароль" }, { status: 401 });
  }

  const user = { id: row.id, email: row.email, name: row.name, role: row.role };
  const token = await createToken(user);

  const response = NextResponse.json({ user });
  response.cookies.set("session", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}