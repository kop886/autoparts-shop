import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const name = String(body.name || "").trim();

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Заповніть усі поля" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Введіть коректну пошту" }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "Пароль має містити не менше 6 символів" }, { status: 400 });
  }

  const existing = db.prepare("SELECT id FROM users WHERE lower(email) = ?").get(email);
  if (existing) {
    return NextResponse.json({ error: "Користувач з такою поштою вже існує" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = db
    .prepare("INSERT INTO users (email, password_hash, name, role) VALUES (?, ?, ?, 'user')")
    .run(email, passwordHash, name);

  const user = {
    id: result.lastInsertRowid as number,
    email,
    name,
    role: "user" as const,
  };

  const token = await createToken(user);
  const response = NextResponse.json({ user });
  response.cookies.set("session", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}