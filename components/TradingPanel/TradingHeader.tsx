"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Copy,
  Globe,
  Search,
  Star,
  ExternalLink,
  CircleCheckBig,
} from "lucide-react";
import { usePythWebSocket } from "@/hooks/usePythWebSocket";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { formatMarketCap, formatPercent } from "@/utils/formatters";

interface TradingHeaderProps {
  symbol: string;
  address: string;
  logoURI?: string;
}

const TradingHeader: React.FC<TradingHeaderProps> = ({
  symbol,
  address,
  logoURI,
}) => {
  const { livePrice, liveData } = usePythWebSocket(address, symbol);

  // Fetch real details from DexScreener by address directly
  const { data: tokenOverview } = useTokenOverview(address);

  // Fetch from TokenList for Holders and accurate global Market Cap (for top 20 tokens)
  const { data: tokenListData } = useTokenList({
    sort_by: "volume_24h_usd",
    sort_type: "desc",
    limit: 20,
  });
  const allTokens = tokenListData?.pages.flatMap((page) => page.tokens) ?? [];
  const tokenListDetails = allTokens.find((t) => t.address === address);

  const [copied, setCopied] = useState(false);

  // Derive real values
  const rawMarketCap = tokenListDetails?.market_cap || tokenOverview?.marketCap || tokenOverview?.fdv;
  const displayMarketCap = rawMarketCap ? formatMarketCap(rawMarketCap) : "-";

  // Real-time 24h change from API data
  const change24h = tokenOverview?.priceChange?.h24 ?? tokenListDetails?.price_change_24h_percent ?? 0;
  const isPositiveChange = change24h >= 0;

  const displayVolume = tokenOverview?.volume?.h24
    ? formatMarketCap(tokenOverview.volume.h24)
    : (tokenListDetails?.volume_24h_usd ? formatMarketCap(tokenListDetails.volume_24h_usd) : "-");
  
  const displayLiquidity = tokenOverview?.liquidity?.usd
    ? formatMarketCap(tokenOverview.liquidity.usd)
    : (tokenListDetails?.liquidity ? formatMarketCap(tokenListDetails.liquidity) : "-");

  // DexScreener doesn't provide holders, rely entirely on Birdeye token list
  const displayHolders = tokenListDetails?.holder
    ? formatMarketCap(tokenListDetails.holder).replace("$", "")
    : "-";
  
  const top10Holding = undefined; // Neither DexScreener nor TokenList provides top 10 holding

  const displayName = tokenListDetails?.name || tokenOverview?.baseToken?.name || `${symbol}`;

  // Use livePrice from WebSocket if available, otherwise fallback to API price, then 0
  const displayPrice = livePrice || (tokenOverview?.priceUsd ? Number(tokenOverview.priceUsd) : (tokenListDetails?.price || 0));

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full p-3 bg-[#0a0e1c] border-b border rounded-t-md gap-4 shrink-0 overflow-hidden">
      {/* Left Section: Token Info */}
      <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto overflow-hidden">
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              logoURI ||
              `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`
            }
            alt={symbol}
            className="w-10 h-10 rounded-full border border-white/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`;
            }}
          />
          <div className="absolute -bottom-1 right-0 bg-blue-500 rounded-full p-0.5 border border-[#0a0e1c]">
            <CircleCheckBig className="w-3 h-3" />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold tracking-tight truncate">
              {symbol}
            </h2>
            <div className="flex items-center gap-1.5 text-muted-foreground ml-2 shrink-0">
              <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <ExternalLink className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Search className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Star className="w-4 h-4 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 shrink-0">
            <span className="font-medium">{displayName}</span>
            <span className="text-white/20">|</span>
            <span className="font-mono">{shortenAddress(address)}</span>
            <button
              onClick={handleCopy}
              className="hover:text-white transition-colors"
              title="Copy Address"
            >
              {copied ? (
                <span className="text-chart-green">Copied!</span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Stats Cards */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
        className="flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none w-full lg:w-auto lg:ml-auto"
      >
        {/* Price */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 px-3 py-1 min-w-[90px] justify-center items-center lg:items-start"
        >
          <span className="text-[11px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Price
          </span>
          <span className="text-xl font-bold text-white font-mono">
            $
            {displayPrice.toLocaleString(undefined, {
              maximumSignificantDigits: 6,
            })}
          </span>
        </motion.div>

        {/* Market Cap */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Market cap
          </span>
          <span className="text-sm font-semibold text-white">
            {displayMarketCap}
          </span>
        </motion.div>

        {/* 24H Change */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
            24H change
          </span>
          <span
            className={`text-sm font-semibold ${isPositiveChange ? "text-chart-green" : "text-red-500"}`}
          >
            {isPositiveChange ? "▲" : "▼"}{" "}
            {formatPercent(change24h).replace("-", "")}
          </span>
        </motion.div>

        {/* 24H Vol */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
            24H Vol.
          </span>
          <span className="text-sm font-semibold text-white">
            {displayVolume}
          </span>
        </motion.div>

        {/* Liquidity */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Liquidity
          </span>
          <span className="text-sm font-semibold text-white">
            {displayLiquidity}
          </span>
        </motion.div>

        {/* Holders */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Holders
          </span>
          <span className="text-sm font-semibold text-white">
            {displayHolders}
          </span>
        </motion.div>

        {/* Top 10 holding (conditionally rendered) */}
        {top10Holding && (
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 20 },
              show: { opacity: 1, x: 0 },
            }}
            className="flex flex-col shrink-0 bg-card rounded-md px-3 py-1.5 min-w-[90px]"
          >
            <span className="text-[10px] text-muted-foreground font-medium tracking-wider mb-0.5">
              Top 10 holding
            </span>
            <span className="text-sm font-semibold text-white">{top10Holding}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default TradingHeader;
