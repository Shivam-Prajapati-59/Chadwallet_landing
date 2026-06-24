import React, { useState, useEffect } from "react";
import { Settings, AlertTriangle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface TradingOrderPanelProps {
  symbol: string;
  address: string;
  logoURI?: string;
}

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const USDC_LOGO =
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png";

const TradingOrderPanel: React.FC<TradingOrderPanelProps> = ({
  symbol,
  address,
  logoURI,
}) => {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("");
  const [debouncedAmount, setDebouncedAmount] = useState<string>("");

  // Debounce the amount input to avoid spamming the API
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedAmount(amount);
    }, 500);
    return () => clearTimeout(handler);
  }, [amount]);

  const isSol = address === "So11111111111111111111111111111111111111112";
  // Assuming 6 decimals for most meme coins/USDC, 9 for SOL
  const inputDecimals = side === "buy" ? 6 : isSol ? 9 : 6;
  const outputDecimals = side === "buy" ? (isSol ? 9 : 6) : 6;

  const inputMint = side === "buy" ? USDC_MINT : address;
  const outputMint = side === "buy" ? address : USDC_MINT;

  const rawAmount =
    debouncedAmount && !isNaN(Number(debouncedAmount))
      ? Math.floor(
          Number(debouncedAmount) * Math.pow(10, inputDecimals),
        ).toString()
      : "";

  const { data: quote, isLoading: isQuoting } = useQuery({
    queryKey: ["jup-quote", inputMint, outputMint, rawAmount],
    queryFn: async () => {
      const res = await fetch(
        `/api/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${rawAmount}`,
      );
      if (!res.ok) throw new Error("Quote failed");
      return res.json();
    },
    enabled: !!rawAmount && Number(rawAmount) > 0,
  });

  return (
    <Card className="flex flex-col h-full bg-[#050816]/50 border-white/10 rounded-md">
      <CardContent className="flex flex-col flex-1 p-4 space-y-4">
        {/* Top Tabs: Buy / Sell */}
        <div className="flex w-full gap-2">
          <Button
            variant="ghost"
            onClick={() => setSide("buy")}
            className={`flex-1 p-3 h-auto text-xl font-semibold rounded-md transition-colors ${
              side === "buy"
                ? "bg-green-900/30 text-green-600 hover:text-green-700"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            Buy
          </Button>
          <Button
            variant="ghost"
            onClick={() => setSide("sell")}
            className={`flex-1 p-3 h-auto text-xl font-semibold rounded-md transition-colors ${
              side === "sell"
                ? "bg-red-900/30 text-red-500 hover:bg-red-900/40 hover:text-red-400"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            Sell
          </Button>
        </div>

        {/* Input Area */}
        <div className="flex flex-col space-y-3 bg-[#0a0d16] p-4 rounded-xl border border-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center text-3xl font-medium text-white/40">
              <div className="flex items-center gap-2 mr-2">
                <img
                  src={
                    side === "buy"
                      ? USDC_LOGO
                      : logoURI ||
                        `https://ui-avatars.com/api/?name=${symbol}&background=random&size=32`
                  }
                  alt={side === "buy" ? "USDC" : symbol}
                  className="w-12 h-9 rounded-full"
                />
              </div>
              {side === "buy" && <span>$</span>}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="bg-transparent border-none outline-none w-full text-white/90 placeholder:text-white/40 ml-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <span className="text-md font-medium text-white/30 whitespace-nowrap">
              Enter amount
            </span>
          </div>

          {/* Quick amounts */}
          <div className="flex gap-2 items-center pt-2">
            {[10, 100, 500, 1000].map((val) => (
              <Button
                key={val}
                variant="outline"
                onClick={() => setAmount(val.toString())}
                className="flex-1 h-8 bg-transparent border-white/10 hover:bg-white/10 text-xs font-semibold text-white/70"
              >
                ${val}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 bg-transparent border-white/10 hover:bg-white/10 text-white/70"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Available Balance */}
        <div className="text-sm font-medium text-white/50 px-1">
          $0 available
        </div>

        {/* Jupiter Quote Result */}
        {Number(amount) > 0 && (
          <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-md border border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/50 font-medium">
                Expected Output:
              </span>
              <span className="font-mono text-[#14F195] font-bold flex items-center gap-2">
                {isQuoting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#14F195]" />
                ) : quote?.outAmount ? (
                  <>
                    <img
                      src={
                        side === "sell"
                          ? USDC_LOGO
                          : logoURI ||
                            `https://ui-avatars.com/api/?name=${symbol}&background=random&size=32`
                      }
                      alt={side === "sell" ? "USDC" : symbol}
                      className="w-5 h-5 rounded-full"
                    />
                    {`${(Number(quote.outAmount) / Math.pow(10, outputDecimals)).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${side === "buy" ? symbol : "USDC"}`}
                  </>
                ) : (
                  "No route found"
                )}
              </span>
            </div>

            {/* Extended Details */}
            {quote?.outAmount && !isQuoting && (
              <div className="flex flex-col gap-1.5 mt-2 pt-3 border-t border-white/10 text-xs text-white/50">
                {/* Rate */}
                <div className="flex justify-between">
                  <span>Rate:</span>
                  <span className="text-white/80 font-medium">
                    1 {side === "buy" ? symbol : "USDC"} ≈{" "}
                    {side === "buy"
                      ? (
                          Number(quote.inAmount) /
                          Math.pow(10, inputDecimals) /
                          (Number(quote.outAmount) /
                            Math.pow(10, outputDecimals))
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 6,
                        })
                      : (
                          Number(quote.outAmount) /
                          Math.pow(10, outputDecimals) /
                          (Number(quote.inAmount) / Math.pow(10, inputDecimals))
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 6,
                        })}{" "}
                    {side === "buy" ? "USDC" : symbol}
                  </span>
                </div>

                {/* Price Impact */}
                <div className="flex justify-between">
                  <span>Price Impact:</span>
                  <span
                    className={
                      Number(quote.priceImpactPct) > 0.05
                        ? "text-red-400 font-medium"
                        : "text-[#14F195] font-medium"
                    }
                  >
                    {(Number(quote.priceImpactPct) * 100).toFixed(2)}%
                  </span>
                </div>

                {/* Minimum Received */}
                <div className="flex justify-between">
                  <span>Minimum Received:</span>
                  <span className="text-white/80 font-medium">
                    {(
                      Number(quote.otherAmountThreshold) /
                      Math.pow(10, outputDecimals)
                    ).toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}{" "}
                    {side === "buy" ? symbol : "USDC"}
                  </span>
                </div>

                {/* Slippage */}
                <div className="flex justify-between">
                  <span>Slippage Tolerance:</span>
                  <span className="text-white/80 font-medium">
                    {(quote.slippageBps / 100).toFixed(1)}%
                  </span>
                </div>

                {/* Route */}
                <div className="flex justify-between">
                  <span>Route:</span>
                  <span
                    className="text-white/80 font-medium truncate max-w-[150px] text-right"
                    title={quote.routePlan
                      ?.map((r: any) => r.swapInfo.label)
                      .join(" → ")}
                  >
                    {quote.routePlan
                      ?.map((r: any) => r.swapInfo.label)
                      .join(" → ") || "Jupiter"}
                  </span>
                </div>

                {/* Swap Value */}
                {quote.swapUsdValue && (
                  <div className="flex justify-between">
                    <span>Est. USD Value:</span>
                    <span className="text-white/80 font-medium">
                      ~$
                      {Number(quote.swapUsdValue).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Main Action Button */}
        <Button
          disabled={isQuoting || !amount || Number(amount) <= 0}
          className={`w-full py-6 mt-auto rounded-xl border-none font-bold text-lg transition-colors ${
            !amount || Number(amount) <= 0 || isQuoting
              ? "bg-white/10 text-white/40 cursor-not-allowed"
              : side === "buy"
                ? "bg-[#14F195] hover:bg-[#14F195]/80 text-black"
                : "bg-[#a90b0b] hover:bg-[#8d0a0a] text-white"
          }`}
        >
          {!amount || Number(amount) <= 0
            ? `Enter Amount`
            : isQuoting
              ? `Finding best route...`
              : side === "buy" && quote?.outAmount
                ? `Buy ${(Number(quote.outAmount) / Math.pow(10, outputDecimals)).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${symbol}`
                : side === "sell" && quote?.outAmount
                  ? `Sell ${amount} ${symbol} for $${(Number(quote.outAmount) / Math.pow(10, outputDecimals)).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
                  : `${side === "buy" ? "Buy" : "Sell"} ${symbol}`}
        </Button>
      </CardContent>

      {/* Warning Footer */}
      <CardFooter className="p-4 pt-2 bg-background">
        <div className="flex w-full items-center justify-between text-xs font-medium text-white/40 px-1">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Verified token</span>
          </div>
          <Info className="w-4 h-4" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TradingOrderPanel;
