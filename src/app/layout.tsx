import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { UserProvider } from "@/context/UserContext";
import { CarProvider } from "@/context/CarContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { CompareProvider } from "@/context/CompareContext";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "AutoParts — інтернет-магазин автозапчастин",
  description: "Підбір автозапчастин за параметрами автомобіля",
};

// Ставимо тему ще до першого малювання сторінки, щоб не було «спалаху»
const themeScript = `
  try {
    var t = localStorage.getItem("theme");
    if (!t && window.matchMedia("(prefers-color-scheme: dark)").matches) t = "dark";
    document.documentElement.dataset.theme = t === "dark" ? "dark" : "light";
  } catch (e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col bg-surface text-ink`}>
        <ThemeProvider>
          <ToastProvider>
            <UserProvider>
              <CarProvider>
                <CartProvider>
                  <FavoritesProvider>
                    <CompareProvider>
                      <Header />
                      <main className="flex-1">{children}</main>
                      <Footer />
                    </CompareProvider>
                  </FavoritesProvider>
                </CartProvider>
              </CarProvider>
            </UserProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
