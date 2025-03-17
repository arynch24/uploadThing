"use client";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/signin") || pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/utlogo.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          {!hideHeaderFooter && <Header />}
          <main className="w-full flex-grow">{children}</main>
          {!hideHeaderFooter && <Footer />}
        </SessionProvider>
      </body>
    </html>
  );
}
