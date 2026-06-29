"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenMetadata } from "@/hooks/useTokenMetadata";
import { Copy, Check, Globe, Send } from "lucide-react";
import { formatMarketCap } from "@/utils/formatters";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface AboutTokenPanelProps {
  address: string;
  symbol: string;
}

const ProgressBar = ({
  leftValue,
  rightValue,
  leftLabel,
  rightLabel,
  leftSub,
  rightSub,
}: {
  leftValue: number;
  rightValue: number;
  leftLabel: string;
  rightLabel: string;
  leftSub: string;
  rightSub: string;
}) => {
  const total = leftValue + rightValue;
  const leftPercent = total === 0 ? 50 : (leftValue / total) * 100;

  return (
    <div className="flex flex-col gap-1 w-full mt-1">
      <div className="flex justify-between items-center text-xs font-semibold">
        <div>
          <span className="text-white">{leftLabel}</span>{" "}
          <span className="text-muted-foreground">{leftSub}</span>
        </div>
        <div>
          <span className="text-white">{rightLabel}</span>{" "}
          <span className="text-muted-foreground">{rightSub}</span>
        </div>
      </div>
      <div className="flex w-full h-1.5 gap-[3px] mt-1.5">
        <div
          className="h-full bg-chart-green rounded-full"
          style={{ width: `${leftPercent}%` }}
        />
        <div
          className="h-full bg-chart-red rounded-full"
          style={{ width: `${100 - leftPercent}%` }}
        />
      </div>
    </div>
  );
};

const TimeframeBox = ({
  label,
  value,
  isActive,
  onClick,
}: {
  label: string;
  value: number;
  isActive: boolean;
  onClick: () => void;
}) => {
  const isPositive = value >= 0;
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center border border-white/10 justify-center rounded-xl py-2 px-2 w-full transition-colors ${
        isActive ? "border-none bg-[#12111A]" : "hover:bg-[#1a1924]"
      }`}
    >
      <span
        className={`text-[12px] font-medium uppercase tracking-wider mb-0.5 transition-colors ${
          isActive ? "text-white/90" : "text-white/40"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-xs font-bold ${
          isPositive ? "text-chart-green" : "text-chart-red"
        }`}
      >
        {isPositive ? "▲" : "▼"} {Math.abs(value).toFixed(2)}%
      </span>
    </button>
  );
};

const AboutTokenPanel: React.FC<AboutTokenPanelProps> = ({
  address,
  symbol,
}) => {
  const { data: tokenOverview } = useTokenOverview(address);

  // Fetch reliable metadata for any token
  const { data: birdeyeDetails } = useTokenMetadata(address);

  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<
    "m5" | "h1" | "h4" | "h24"
  >("h24");
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortenAddress = (addr: string) => {
    if (!addr || addr.length < 10) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  // DexScreener values for active timeframe (now Birdeye global values)
  const buys = tokenOverview?.txns?.[activeTimeframe]?.buys || 0;
  const sells = tokenOverview?.txns?.[activeTimeframe]?.sells || 0;

  const buyVol = tokenOverview?.txns?.[activeTimeframe]?.buyVolume || 0;
  const sellVol = tokenOverview?.txns?.[activeTimeframe]?.sellVolume || 0;

  const createdTime = null; // Removed from global structure

  const displaySupply = tokenOverview?.totalSupply
    ? formatMarketCap(tokenOverview.totalSupply).replace("$", "")
    : null;

  const displayName = birdeyeDetails?.name || symbol;

  const description = birdeyeDetails?.extensions?.description as
    | string
    | undefined;

  const sanitizeUrl = (url?: string) => {
    if (!url) return undefined;
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return url;
      }
    } catch {
      // Invalid URL
    }
    return undefined;
  };

  const exts = birdeyeDetails?.extensions as any;
  const website = sanitizeUrl(exts?.website || exts?.websiteUrl);
  const twitter = sanitizeUrl(exts?.twitter || exts?.twitterUrl);
  const telegram = sanitizeUrl(exts?.telegram || exts?.telegramUrl);

  return (
    <Card className="w-full bg-[#060510] border border-white/10 rounded-xl relative overflow-visible flex flex-col flex-1 mt-2">
      <CardContent className="px-4 py-1 flex flex-col gap-2 h-full">
        <div>
          <h2 className="text-base font-bold text-white mb-1">
            About {displayName}
          </h2>
          {description && (
            <div className="relative mt-2">
              <p
                className={`text-xs text-muted-foreground leading-relaxed ${isDescExpanded ? "" : "line-clamp-2"}`}
              >
                {description}
              </p>
              {description.length > 90 && (
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="text-[11px] font-medium text-blue-400 hover:text-blue-300 mt-0.5 transition-colors"
                >
                  {isDescExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Timeframes */}
        <div className="grid grid-cols-4 gap-2">
          <TimeframeBox
            label="5M"
            value={tokenOverview?.priceChange?.m5 || 0}
            isActive={activeTimeframe === "m5"}
            onClick={() => setActiveTimeframe("m5")}
          />
          <TimeframeBox
            label="1H"
            value={tokenOverview?.priceChange?.h1 || 0}
            isActive={activeTimeframe === "h1"}
            onClick={() => setActiveTimeframe("h1")}
          />
          <TimeframeBox
            label="4H"
            value={tokenOverview?.priceChange?.h4 || 0}
            isActive={activeTimeframe === "h4"}
            onClick={() => setActiveTimeframe("h4")}
          />
          <TimeframeBox
            label="1D"
            value={tokenOverview?.priceChange?.h24 || 0}
            isActive={activeTimeframe === "h24"}
            onClick={() => setActiveTimeframe("h24")}
          />
        </div>

        {/* Bars */}
        <div className="flex flex-col gap-2 w-full mt-2">
          <ProgressBar
            leftLabel={buys.toLocaleString()}
            leftSub="buys"
            rightLabel={sells.toLocaleString()}
            rightSub="sells"
            leftValue={buys}
            rightValue={sells}
          />
          <ProgressBar
            leftLabel={formatMarketCap(buyVol)}
            leftSub="vol."
            rightLabel={formatMarketCap(sellVol)}
            rightSub="vol."
            leftValue={buyVol}
            rightValue={sellVol}
          />
          <ProgressBar
            leftLabel="167"
            leftSub="buyers"
            rightLabel="181"
            rightSub="sellers"
            leftValue={167}
            rightValue={181}
          />
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col gap-3 overflow-hidden"
            >
              <div className="flex items-center gap-2 mt-2 mb-2">
                {website && (
                  <button
                    onClick={() =>
                      window.open(website, "_blank", "noopener noreferrer")
                    }
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 bg-transparent hover:bg-white/5 text-[11px] text-white font-medium transition-colors flex-1"
                  >
                    <Globe className="w-3.5 h-3.5" /> Website
                  </button>
                )}
                {twitter && (
                  <button
                    onClick={() =>
                      window.open(twitter, "_blank", "noopener noreferrer")
                    }
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 bg-transparent hover:bg-white/5 text-[11px] text-white font-medium transition-colors flex-1"
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 1200 1227"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                        fill="currentColor"
                      />
                    </svg>{" "}
                    Twitter
                  </button>
                )}
                {telegram && (
                  <button
                    onClick={() =>
                      window.open(telegram, "_blank", "noopener noreferrer")
                    }
                    className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 bg-transparent hover:bg-white/5 text-[11px] text-white font-medium transition-colors flex-1"
                  >
                    <Send className="w-3.5 h-3.5" /> Telegram
                  </button>
                )}
              </div>

              {displaySupply && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground flex-1">Supply</span>
                  <span className="text-white/20 px-2 flex-1 border-b border-dashed border-white/10 relative -top-1"></span>
                  <span className="text-white font-medium">
                    {displaySupply}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex-1">Network</span>
                <span className="text-white/20 px-2 flex-1 border-b border-dashed border-white/10 relative -top-1"></span>
                <span className="text-white font-medium flex items-center gap-1.5">
                  <div className="flex items-center justify-center bg-[#1E1C27] w-4 h-4 rounded-[4px] border border-white/5">
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white/70"
                    >
                      <line x1="4" x2="20" y1="6" y2="6" />
                      <line x1="4" x2="20" y1="12" y2="12" />
                      <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                  </div>
                  Solana
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex-1">Created</span>
                <span className="text-white/20 px-2 flex-1 border-b border-dashed border-white/10 relative -top-1"></span>
                <span className="text-white font-medium">1 year ago</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground flex-1">
                  Contract address
                </span>
                <span className="text-white/20 px-2 flex-1 border-b border-dashed border-white/10 relative -top-1"></span>
                <button
                  onClick={handleCopy}
                  className="text-white font-medium flex items-center gap-1.5 hover:text-blue-400 transition-colors"
                >
                  {shortenAddress(address)}
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-chart-green" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details Toggle button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[11px] font-medium bg-[#161b2e] border border-white/5 hover:bg-[#1f263d] text-muted-foreground hover:text-white rounded-md px-4 py-1.5 transition-colors shadow-sm z-10"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </CardContent>
    </Card>
  );
};

export default AboutTokenPanel;
