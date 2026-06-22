import type { Metadata } from "next";
import { Inter, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading" });
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChadWallet",
  description: "Hunt every memecoin. Every chain. One wallet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
        manrope.variable,
        geistMono.variable,
      )}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
