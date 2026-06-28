import React from "react";
import { Loader2 } from "lucide-react";
import { USDC_LOGO } from "@/utils/constants";
import type { OrderType } from "../TradingOrderPanel";
import type { JupiterQuote } from "@/types/jupiter";

interface QuoteSummaryProps {
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
  logoURI?: string;
  inputDecimals: number;
  outputDecimals: number;
}

const QuoteSummary: React.FC<QuoteSummaryProps> = ({
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
  logoURI,
  inputDecimals,
  outputDecimals,
}) => {
  if (Number(amount) <= 0) return null;

  return (
    <div className="flex flex-col gap-1.5 p-2 bg-[#111319] rounded-lg border-none mt-1">
      <div className="flex justify-between items-center text-[11px]">
        <span className="font-semibold text-white/40">
          {orderType === "market" ? "Expected Output:" : "Target Output:"}
        </span>
        <span className="font-mono text-[#2cc461] font-bold text-[13px] flex items-center gap-1.5">
          {isQuoting && orderType === "market" ? (
            <Loader2 className="w-4 h-4 animate-spin text-[#14F195]" />
          ) : orderType === "market" && quote?.outAmount ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
          ) : orderType !== "market" && limitOutAmount > 0 ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
              {`${limitOutAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${side === "buy" ? symbol : "USDC"}`}
            </>
          ) : (
            "..."
          )}
        </span>
      </div>

      {/* Extended Details */}
      {orderType === "market" && quote?.outAmount && !isQuoting && (
        <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-white/5 text-[10px] text-white/40 font-medium">
          <div className="flex justify-between">
            <span>Rate:</span>
            <span className="text-white/80 font-medium">
              1 {side === "buy" ? symbol : "USDC"} ≈{" "}
              {side === "buy"
                ? (
                    Number(quote.inAmount) /
                    Math.pow(10, inputDecimals) /
                    (Number(quote.outAmount) / Math.pow(10, outputDecimals))
                  ).toLocaleString(undefined, { maximumFractionDigits: 6 })
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
          <div className="flex justify-between">
            <span>Minimum Received:</span>
            <span className="text-white/80 font-medium">
              {(
                Number(quote.otherAmountThreshold) /
                Math.pow(10, outputDecimals)
              ).toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
              {side === "buy" ? symbol : "USDC"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Slippage Tolerance:</span>
            <span className="text-white/80 font-medium">
              {(quote.slippageBps / 100).toFixed(1)}%
            </span>
          </div>
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
        </div>
      )}

      {/* Limit / TPSL Details */}
      {orderType !== "market" && limitOutAmount > 0 && (
        <div className="flex flex-col gap-1 mt-1 pt-2 border-t border-white/5 text-[10px] text-white/40 font-medium">
          <div className="flex justify-between">
            <span>Execution Price:</span>
            <span className="text-white/80">
              1 {side === "buy" ? symbol : "USDC"} ={" "}
              {Number(limitPrice).toLocaleString(undefined, {
                maximumFractionDigits: 4,
              })}{" "}
              {side === "buy" ? "USDC" : symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Platform Fee (Limit):</span>
            <span className="text-white/80 font-medium">0.1%</span>
          </div>
          {orderType === "tpsl" && (
            <div className="flex justify-between">
              <span>Active Triggers:</span>
              <span className="text-[#14F195] font-medium">
                {tpPrice ? "Take Profit" : ""} {tpPrice && slPrice ? " & " : ""}{" "}
                {slPrice ? <span className="text-red-400">Stop Loss</span> : ""}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteSummary;
