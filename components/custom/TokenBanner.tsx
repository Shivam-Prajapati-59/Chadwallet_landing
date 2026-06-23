import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOKEN_DATA } from "@/config/landing";
import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";



const TokenBanner = () => {
  return (
    <section className="flex items-center justify-center">
      <div className="w-full max-w-6xl py-4 overflow-hidden shadow-sm relative">
        <Marquee>
          <MarqueeContent>
            {TOKEN_DATA.map((token, i) => (
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
