import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SearchBar from "@/components/searchbar"
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AniVault",
  description: "Anime dsicovering and tracking website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-white text-black">
        <header className="border-b border-slate-700 pl-1 lg:pl-4 py-4 bg-slate-950">
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
            <Link href={'/'} className="text-lg sm:text-3xl font-bold text-sky-400 flex-shrink whitespace-nowrap">
              AniVault
            </Link>
            <div className="min-w-0 max-w-xs lg:max-w-lg">
              <SearchBar />
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
