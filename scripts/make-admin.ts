import { db } from "../src/lib/db";

const email = (process.argv[2] || "").trim().toLowerCase();

if (!email) {
  console.log("Використання: npm run make-admin -- ваша-пошта@example.com");
  process.exit(1);
}

const result = db
  .prepare("UPDATE users SET role = 'admin' WHERE lower(email) = ?")
  .run(email);

if (result.changes === 0) {
  console.log(`Користувача з поштою ${email} не знайдено. Спершу зареєструйтесь.`);
} else {
  console.log(`Готово! ${email} тепер адміністратор.`);
}
