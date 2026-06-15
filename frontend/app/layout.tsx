import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Math With Love",
  description: "Интерактивная платформа для изучения векторов. Багрут 572.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
