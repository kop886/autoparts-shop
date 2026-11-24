import { SignJWT, jwtVerify } from "jose";
import { UserType } from "@/app/types/UserType";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "navchalnyi-proiekt-sekret-2026"
);

export async function createToken(user: UserType): Promise<string> {
  return new SignJWT({ id: user.id, email: user.email, name: user.name, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<UserType | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as UserType;
  } catch {
    return null;
  }
}