import type { Metadata } from "next";
import { Noto_Sans, IBM_Plex_Sans, DM_Sans } from "next/font/google";
import TradingNavbar from "@/components/TradingPanel/TradingNavbar";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

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
    <div
      className={`${notoSans.variable} ${ibmPlexSans.variable} ${dmSans.variable} font-sans h-screen overflow-hidden bg-[#050816] text-white flex flex-col`}
    >
      <TradingNavbar />
      <main className="flex-1 ">{children}</main>
    </div>
  );
}
