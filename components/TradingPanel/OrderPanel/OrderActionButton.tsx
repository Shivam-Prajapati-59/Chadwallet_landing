import React from "react";
import { Button } from "@/components/ui/button";
import type { OrderType } from "../TradingOrderPanel";
import type { JupiterQuote } from "@/types/jupiter";

interface OrderActionButtonProps {
  orderType: OrderType;
  amount: string;
  isQuoting: boolean;
  quote: JupiterQuote | undefined;
  limitOutAmount: number;
  limitPrice: string;
  tpPrice: string;
  slPrice: string;
  side: "buy" | "sell";
  symbol: string;
  outputDecimals: number;
}

const OrderActionButton: React.FC<OrderActionButtonProps> = ({
  orderType,
  amount,
  isQuoting,
  quote,
  limitOutAmount,
  limitPrice,
  tpPrice,
  slPrice,
  side,
  symbol,
  outputDecimals,
}) => {
  const isDisabled =
    (orderType === "market" && (isQuoting || !amount || Number(amount) <= 0)) ||
    (orderType === "limit" &&
      (!amount ||
        Number(amount) <= 0 ||
        !limitPrice ||
        Number(limitPrice) <= 0)) ||
    (orderType === "tpsl" &&
      (!amount || Number(amount) <= 0 || (!tpPrice && !slPrice)));

  let buttonText = "";
  if (!amount || Number(amount) <= 0) {
    buttonText = `${side === "buy" ? "Buy" : "Sell"} ${symbol}`;
  } else if (orderType === "market" && isQuoting) {
    buttonText = "Finding best route...";
  } else if (orderType === "market") {
    if (side === "buy" && quote?.outAmount) {
      buttonText = `Buy ${(Number(quote.outAmount) / Math.pow(10, outputDecimals)).toLocaleString(undefined, { maximumFractionDigits: 4 })} ${symbol}`;
    } else if (side === "sell" && quote?.outAmount) {
      buttonText = `Sell ${amount} ${symbol} for $${(Number(quote.outAmount) / Math.pow(10, outputDecimals)).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    } else {
      buttonText = `${side === "buy" ? "Buy" : "Sell"} ${symbol}`;
    }
  } else if (orderType === "limit") {
    buttonText = `Limit ${side === "buy" ? "Buy" : "Sell"} ${side === "buy" ? limitOutAmount.toLocaleString(undefined, { maximumFractionDigits: 4 }) : amount} ${symbol}`;
  } else {
    buttonText = "Set TP/SL Orders";
  }

  return (
    <Button
      disabled={isDisabled}
      className={`w-full py-4 mt-auto rounded-md border-none font-bold text-[17px] transition-colors ${
        isDisabled
          ? "bg-[#181920] text-white/70 opacity-100 cursor-not-allowed hover:bg-[#181920]"
          : side === "buy"
            ? "bg-green-500 hover:bg-green-400 text-black"
            : "bg-[#a90b0b] hover:bg-[#8d0a0a] text-white"
      }`}
    >
      {buttonText}
    </Button>
  );
};

export default OrderActionButton;
