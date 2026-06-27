"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const SOLANA_TOKENS = [
  {
    symbol: "SOL",
    address: "So11111111111111111111111111111111111111112",
    logoURI: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=029",
    price: "$144.32",
    change: "▲ 1.37%",
    isUp: true
  },
  {
    symbol: "RAY",
    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    logoURI: "https://cryptologos.cc/logos/raydium-ray-logo.svg?v=029",
    price: "$1.84",
    change: "▼ 0.60%",
    isUp: false
  },
  {
    symbol: "USDC",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    logoURI: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=029",
    price: "$1.00",
    change: "▲ 0.01%",
    isUp: true
  },
  {
    symbol: "USDT",
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    logoURI: "https://cryptologos.cc/logos/tether-usdt-logo.svg?v=029",
    price: "$1.00",
    change: "▲ 0.02%",
    isUp: true
  }
];

const TradingFooter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelectToken = (token: typeof SOLANA_TOKENS[0]) => {
    const params = new URLSearchParams();
    params.set("token", token.address);
    params.set("symbol", token.symbol);
    if (token.logoURI) {
      params.set("logoURI", token.logoURI);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="w-full h-8 bg-background border-t border-white/10 flex items-center justify-between px-4 text-[10px] md:text-xs text-muted-foreground shrink-0 overflow-hidden">
      {/* Left side: Tickers */}
      <div className="flex items-center gap-4 lg:gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
        {SOLANA_TOKENS.map((token) => (
          <button
            key={token.symbol}
            onClick={() => handleSelectToken(token)}
            className="flex items-center gap-1.5 font-medium hover:bg-white/5 px-1.5 py-0.5 rounded transition-colors"
          >
            <Image
              src={token.logoURI}
              alt={token.symbol}
              width={12}
              height={12}
            />
            <span className="text-white">${token.symbol} {token.price}</span>
            <span className={token.isUp ? "text-chart-green" : "text-red-500"}>
              {token.change}
            </span>
          </button>
        ))}
      </div>

      {/* Right side: Links & Status */}
      <div className="flex items-center gap-4 shrink-0 pl-4 bg-background">
        <div className="flex items-center gap-1.5 text-chart-green font-medium">
          <div className="w-1.5 h-1.5 rounded-full bg-chart-green" />
          Stable
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Help
          </a>
        </div>
        <div className="flex items-center gap-2.5 ml-2">
          <a
            href="https://x.com/getchadwallet"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg
              fill="currentColor"
              height="12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0.254 0.25 500 451.95400000000006"
            >
              <path d="M394.033.25h76.67L303.202 191.693l197.052 260.511h-154.29L225.118 294.205 86.844 452.204H10.127l179.16-204.77L.254.25H158.46l109.234 144.417zm-26.908 406.063h42.483L135.377 43.73h-45.59z" />
            </svg>
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <svg
              height="14"
              width="14"
              viewBox="-10.63 -.07077792 823.87 610.06955549"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m678.27 51.62c90.35 132.84 134.97 282.68 118.29 455.18-.07.73-.45 1.4-1.05 1.84-68.42 50.24-134.71 80.73-200.07 100.95a2.55 2.55 0 0 1 -2.81-.95c-15.1-21.01-28.82-43.16-40.84-66.42-.69-1.37-.06-3.02 1.36-3.56 21.79-8.21 42.51-18.05 62.44-29.7 1.57-.92 1.67-3.17.22-4.25-4.23-3.14-8.42-6.44-12.43-9.74-.75-.61-1.76-.73-2.61-.32-129.39 59.75-271.13 59.75-402.05 0-.85-.38-1.86-.25-2.59.35-4 3.3-8.2 6.57-12.39 9.71-1.45 1.08-1.33 3.33.25 4.25 19.93 11.43 40.65 21.49 62.41 29.74 1.41.54 2.08 2.15 1.38 3.52-11.76 23.29-25.48 45.44-40.86 66.45-.67.85-1.77 1.24-2.81.92-65.05-20.22-131.34-50.71-199.76-100.95-.57-.44-.98-1.14-1.04-1.87-13.94-149.21 14.47-300.29 118.18-455.18.25-.41.63-.73 1.07-.92 51.03-23.42 105.7-40.65 162.84-50.49 1.04-.16 2.08.32 2.62 1.24 7.06 12.5 15.13 28.53 20.59 41.63 60.23-9.2 121.4-9.2 182.89 0 5.46-12.82 13.25-29.13 20.28-41.63a2.47 2.47 0 0 1 2.62-1.24c57.17 9.87 111.84 27.1 162.83 50.49.45.19.82.51 1.04.95zm-339.04 283.7c.63-44.11-31.53-80.61-71.9-80.61-40.04 0-71.89 36.18-71.89 80.61 0 44.42 32.48 80.6 71.89 80.6 40.05 0 71.9-36.18 71.9-80.6zm265.82 0c.63-44.11-31.53-80.61-71.89-80.61-40.05 0-71.9 36.18-71.9 80.61 0 44.42 32.48 80.6 71.9 80.6 40.36 0 71.89-36.18 71.89-80.6z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TradingFooter;
