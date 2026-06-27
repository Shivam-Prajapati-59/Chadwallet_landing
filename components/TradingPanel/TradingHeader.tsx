import React, { useState } from "react";
import { Copy, Globe, Search, Star, ExternalLink, ShieldCheck } from "lucide-react";
import { useBirdeyeWebSocket } from "@/hooks/useBirdeyeWebSocket";

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
  const { livePrice } = useBirdeyeWebSocket(address);
  const [copied, setCopied] = useState(false);

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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full p-3 bg-[#0a0e1c] border-b border-white/5 rounded-t-md gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none shrink-0">
      
      {/* Left Section: Token Info */}
      <div className="flex items-center gap-3 min-w-max">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoURI || `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`}
            alt={symbol}
            className="w-10 h-10 rounded-full border border-white/10"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`;
            }}
          />
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border border-[#0a0e1c]">
            <ShieldCheck className="w-3 h-3 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{symbol}</h2>
            <div className="flex items-center gap-1.5 text-muted-foreground ml-2">
              <Globe className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <ExternalLink className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Search className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
              <Star className="w-4 h-4 hover:text-yellow-400 cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
            <span className="font-medium">{symbol}Coin</span>
            <span className="text-white/20">|</span>
            <span className="font-mono">{shortenAddress(address)}</span>
            <button onClick={handleCopy} className="hover:text-white transition-colors" title="Copy Address">
              {copied ? <span className="text-green-400">Copied!</span> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Stats Grid */}
      <div className="flex items-center gap-6 min-w-max ml-auto">
        {/* Market Cap */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Market cap</span>
          <span className="text-sm font-semibold text-white">$1.8M</span>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Price</span>
          <span className="text-sm font-semibold text-[#14F195] font-mono">
            ${livePrice ? livePrice.toLocaleString(undefined, { maximumFractionDigits: 6 }) : "0.022662"}
          </span>
        </div>

        {/* 24H Change */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">24H change</span>
          <span className="text-sm font-semibold text-red-500">▼ 32.85%</span>
        </div>

        {/* 24H Vol */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">24H Vol.</span>
          <span className="text-sm font-semibold text-white">$1M</span>
        </div>

        {/* Liquidity */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Liquidity</span>
          <span className="text-sm font-semibold text-white">$121.2K</span>
        </div>

        {/* Holders */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Holders</span>
          <span className="text-sm font-semibold text-white">9K</span>
        </div>

        {/* Top 10 holding */}
        <div className="flex flex-col">
          <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Top 10 holding</span>
          <span className="text-sm font-semibold text-white">19.29%</span>
        </div>
      </div>
      
    </div>
  );
};

export default TradingHeader;
