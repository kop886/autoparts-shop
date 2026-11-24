import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { requireAdmin } from "@/lib/adminAuth";

const MAX_SIZE = 5 * 1024 * 1024; // 5 МБ
const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(request: NextRequest) {
  // завантажувати фото може лише адміністратор
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Доступ заборонено" }, { status: 403 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "Файл не передано" }, { status: 400 });
  }

  const extension = allowedTypes[file.type];
  if (!extension) {
    return NextResponse.json({ error: "Дозволені лише зображення JPG, PNG, WEBP або GIF" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Файл завеликий (максимум 5 МБ)" }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), "public/uploads");
  await mkdir(uploadDir, { recursive: true });

  // розширення беремо зі списку дозволених, а не з імені файлу
  const fileName = `${Date.now()}-${Math.round(Math.random() * 1e6)}.${extension}`;
  await writeFile(path.join(uploadDir, fileName), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ imageUrl: `/uploads/${fileName}` });
}
