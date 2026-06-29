"use client";
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import marqueeTokens from "@/config/marquee-tokens.json";
import { useRouter } from "next/navigation";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";

const TokenBanner = () => {
  const router = useRouter();

  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-6xl py-4 overflow-hidden shadow-sm relative">
        <Marquee>
          <MarqueeContent>
            {marqueeTokens.map((token, i) => (
              <MarqueeItem key={i} className="flex items-center">
                <div 
                  className="flex items-center gap-3 font-medium text-sm tracking-wide cursor-pointer transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] rounded-2xl px-6 py-3 mx-2 md:mx-4"
                  onClick={() => router.push(`/trade?token=${token.address}&symbol=${token.symbol}`)}
                >
                  <span className="font-bold text-white tracking-wider">{token.symbol}</span>
                  <span className="text-white/80">{token.price}</span>
                  <span
                    className={cn(
                      "flex items-center gap-1 font-bold",
                      token.isPositive ? "text-[#14F195]" : "text-chart-red",
                    )}
                  >
                    {token.isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {token.change}
                  </span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20 mx-2 md:mx-4" />
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
