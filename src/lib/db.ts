import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbPath = path.join(process.cwd(), "autoparts.db");
const schemaPath = path.join(process.cwd(), "src/lib/schema.sql");

const globalForDb = globalThis as unknown as { db?: Database.Database };

export const db = globalForDb.db ?? new Database(dbPath);

if (!globalForDb.db) {
  db.pragma("foreign_keys = ON");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schema);

  // SQLite сам не вміє LIKE без урахування регістру для кирилиці,
  // тому додаємо власну функцію lc() — переводить текст у нижній регістр
  db.function("lc", { deterministic: true }, (value) =>
    String(value ?? "").toLowerCase()
  );

  globalForDb.db = db;
}
