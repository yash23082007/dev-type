import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "DevType | Elite Developer Typing Trainer",
  description: "The typing trainer that looks and feels like your editor. Practice real code snippets with syntax highlighting, IDE chrome, and per-key analytics.",
};

import { ThemeProvider } from "../components/ThemeProvider";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { CommandPalette } from "../components/CommandPalette";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white/20`}
      >
        <ThemeProvider>
          <div className="noise-overlay" />
          <Navbar />
          <div className="pt-20">
            {children}
          </div>
          <Footer />
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  );
}
