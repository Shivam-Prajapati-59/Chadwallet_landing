import React, { useState, useEffect } from "react";
import { AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { USDC_MINT } from "@/utils/constants";
import type { JupiterQuote } from "@/types/jupiter";
import OrderTypeTabs, { OrderType } from "./OrderPanel/OrderTypeTabs";
import OrderInputSection from "./OrderPanel/OrderInputSection";
import LimitInputs from "./OrderPanel/LimitInputs";
import TPSLInputs from "./OrderPanel/TPSLInputs";
import QuoteSummary from "./OrderPanel/QuoteSummary";
import OrderActionButton from "./OrderPanel/OrderActionButton";
import { Separator } from "../ui/separator";

interface TradingOrderPanelProps {
  symbol: string;
  address: string;
  logoURI?: string;
}

const TradingOrderPanel: React.FC<TradingOrderPanelProps> = ({
  symbol,
  address,
  logoURI,
}) => {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [tpPrice, setTpPrice] = useState<string>("");
  const [slPrice, setSlPrice] = useState<string>("");

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

  const { data: quote, isLoading: isQuoting } = useQuery<JupiterQuote>({
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

  const marketRate = quote?.outAmount
    ? side === "buy"
      ? Number(quote.inAmount) /
        Math.pow(10, inputDecimals) /
        (Number(quote.outAmount) / Math.pow(10, outputDecimals))
      : Number(quote.outAmount) /
        Math.pow(10, outputDecimals) /
        (Number(quote.inAmount) / Math.pow(10, inputDecimals))
    : 0;

  // Set default limit price when quote loads and limit price is empty
  useEffect(() => {
    if (marketRate > 0 && orderType !== "market" && limitPrice === "") {
      setLimitPrice(marketRate.toFixed(4));
    }
    // Only auto-fill when switching to limit/tpsl mode with an empty price
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketRate, orderType]);

  const limitOutAmount =
    amount && limitPrice && Number(limitPrice) > 0
      ? side === "buy"
        ? Number(amount) / Number(limitPrice)
        : Number(amount) * Number(limitPrice)
      : 0;

  return (
    <Card className="flex flex-col h-full bg-background rounded-md">
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

        <OrderTypeTabs orderType={orderType} setOrderType={setOrderType} />

        <OrderInputSection
          side={side}
          symbol={symbol}
          logoURI={logoURI}
          amount={amount}
          setAmount={setAmount}
        />

        {orderType === "limit" && (
          <LimitInputs
            limitPrice={limitPrice}
            setLimitPrice={setLimitPrice}
            marketRate={marketRate}
          />
        )}

        {orderType === "tpsl" && (
          <TPSLInputs
            tpPrice={tpPrice}
            setTpPrice={setTpPrice}
            slPrice={slPrice}
            setSlPrice={setSlPrice}
          />
        )}
        <Separator />
        {/* Available Balance */}
        <div className="text-sm font-medium text-white/50 px-1">
          $0 available
        </div>

        <QuoteSummary
          orderType={orderType}
          amount={amount}
          isQuoting={isQuoting}
          quote={quote}
          limitOutAmount={limitOutAmount}
          limitPrice={limitPrice}
          tpPrice={tpPrice}
          slPrice={slPrice}
          side={side}
          symbol={symbol}
          logoURI={logoURI}
          inputDecimals={inputDecimals}
          outputDecimals={outputDecimals}
        />

        <OrderActionButton
          orderType={orderType}
          amount={amount}
          isQuoting={isQuoting}
          quote={quote}
          limitOutAmount={limitOutAmount}
          limitPrice={limitPrice}
          tpPrice={tpPrice}
          slPrice={slPrice}
          side={side}
          symbol={symbol}
          outputDecimals={outputDecimals}
        />
      </CardContent>

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
