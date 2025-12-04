import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainNav from "@/src/components/MainNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RebateHub",
  description: "Cashback and affiliate prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F7F7F8] text-[#1A1A1A]`}
      >
        <div className="flex min-h-screen flex-col">
          {/* 全宽橙色导航栏：统一使用品牌橙 #FF7A1A */}
          <header className="sticky top-0 z-40 bg-[#FF7A1A]">
            <div className="mx-auto max-w-6xl">
              <MainNav />
            </div>
          </header>

          <main className="mx-auto flex-1 max-w-6xl px-4 py-8">{children}</main>

          <footer className="border-t border-zinc-200 bg-white/80">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[#6B7280] sm:flex-row">
              <p>© 2025 RebateHub. All rights reserved.</p>
              <div className="flex gap-4">
                <Link
                  href="/about"
                  className="hover:text-[#111827] transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-[#111827] transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-[#111827] transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
