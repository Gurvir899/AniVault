import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SearchBar from "@/components/searchbar"
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
      <body className="min-h-screen bg-black text-white">
        <header className="border-b border-zinc-800 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-3xl font-bold">
              AniVault
            </h1>
            <div className="w-full max-w-lg">
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
