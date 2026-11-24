// 12500 -> "12 500 грн" (однаково на сервері й у браузері)
export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  return `${String(rounded).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0")}\u00A0грн`;
}

export function formatDate(value: string): string {
  // SQLite зберігає дату у форматі "2026-10-29 14:05:00" (UTC)
  const date = new Date(value.replace(" ", "T") + "Z");
  return date.toLocaleDateString("uk-UA", { day: "numeric", month: "long", year: "numeric" });
}
