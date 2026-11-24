import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  const user = await verifyToken(token);
  return NextResponse.json({ user });
}