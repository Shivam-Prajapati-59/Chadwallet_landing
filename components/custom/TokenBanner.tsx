import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

const mockTokens = [
  { symbol: "CHAD", price: "$1.42", change: "12.5%", isPositive: true },
  { symbol: "PEPE", price: "$0.0000084", change: "5.2%", isPositive: true },
  { symbol: "DOGE", price: "$0.18", change: "1.4%", isPositive: false },
  { symbol: "WIF", price: "$3.24", change: "24.1%", isPositive: true },
  { symbol: "SHIB", price: "$0.000023", change: "2.1%", isPositive: true },
  { symbol: "BONK", price: "$0.000021", change: "4.2%", isPositive: false },
  { symbol: "FLOKI", price: "$0.0002", change: "8.7%", isPositive: true },
  { symbol: "BOME", price: "$0.015", change: "15.3%", isPositive: true },
];

const TokenBanner = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-6xl py-4 overflow-hidden shadow-sm relative">
        <Marquee>
          <MarqueeContent>
            {mockTokens.map((token, i) => (
              <MarqueeItem key={i} className="mx-6">
                <div className="flex items-center gap-3 font-medium text-sm tracking-wide">
                  <span className="font-bold">{token.symbol}</span>
                  <span>{token.price}</span>
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      token.isPositive ? "text-green-400" : "text-red-400",
                    )}
                  >
                    {token.isPositive ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {token.change}
                  </span>
                </div>
              </MarqueeItem>
            ))}
          </MarqueeContent>
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />
        </Marquee>
      </div>
    </section>
  );
};

export default TokenBanner;
