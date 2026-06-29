import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TradingNavbar from "@/components/TradingPanel/TradingNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChadWallet Trade",
  description: "Trade tokens instantly on ChadWallet",
};

export default function TradeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} h-screen overflow-hidden bg-[#060510] text-white flex flex-col`}>
      <TradingNavbar />
      {/* Ensure main keeps flex-1 and min-h-0 so children don't push it off screen */}
      <main className="flex-1 min-h-0 flex flex-col">{children}</main>
    </div>
  );
}
