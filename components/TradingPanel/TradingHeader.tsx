"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Copy,
  Globe,
  Search,
  Send,
  ExternalLink,
  CircleCheckBig,
} from "lucide-react";
import { usePythWebSocket } from "@/hooks/usePythWebSocket";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenOverview } from "@/hooks/useTokenOverview";
import { formatMarketCap, formatPercent } from "@/utils/formatters";
import { SolanaIcon } from "@/components/icons/TokenIcons";

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
  const [imgError, setImgError] = useState(false);

  const getSafeUrl = (url: string | undefined) => {
    if (!url) return undefined;
    try {
      const parsed = new URL(url);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return parsed.toString();
      }
    } catch {
      // invalid URL
    }
    return undefined;
  };

  const exts = tokenListDetails?.extensions as any;
  const website = getSafeUrl(exts?.website || exts?.websiteUrl);
  const twitter = getSafeUrl(exts?.twitter || exts?.twitterUrl);
  const telegram = getSafeUrl(exts?.telegram || exts?.telegramUrl);

  // Derive real values from new global API
  const rawMarketCap =
    tokenOverview?.marketCap ||
    tokenOverview?.fdv ||
    tokenListDetails?.market_cap;
  const finalLogoURI =
    logoURI ||
    tokenListDetails?.logo_uri ||
    `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`;

  React.useEffect(() => {
    setImgError(false);
  }, [finalLogoURI]);
  const displayMarketCap = rawMarketCap ? formatMarketCap(rawMarketCap) : "-";

  // Real-time 24h change from API data
  const change24h =
    tokenOverview?.priceChange?.h24 ||
    tokenListDetails?.price_change_24h_percent ||
    0;
  const isPositiveChange = change24h >= 0;

  const displayVolume = tokenOverview?.volume?.h24
    ? formatMarketCap(tokenOverview.volume.h24)
    : tokenListDetails?.volume_24h_usd
      ? formatMarketCap(tokenListDetails.volume_24h_usd)
      : "-";

  const displayLiquidity = tokenOverview?.liquidity
    ? formatMarketCap(tokenOverview.liquidity)
    : tokenListDetails?.liquidity
      ? formatMarketCap(tokenListDetails.liquidity)
      : "-";

  const displayHolders = tokenOverview?.holders
    ? formatMarketCap(tokenOverview.holders).replace("$", "")
    : tokenListDetails?.holder
      ? formatMarketCap(tokenListDetails.holder).replace("$", "")
      : "-";

  const displayName = tokenListDetails?.name || `${symbol}`;

  // Use livePrice from WebSocket if available, otherwise fallback to API price, then 0
  const displayPrice =
    livePrice ||
    (tokenOverview?.priceUsd
      ? Number(tokenOverview.priceUsd)
      : tokenListDetails?.price || 0);

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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full p-3 bg-[#060510] gap-4 shrink-0 overflow-hidden">
      {/* Left Section: Token Info */}
      <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto overflow-hidden">
        <div className="relative shrink-0">
          <Image
            src={
              imgError
                ? `https://ui-avatars.com/api/?name=${symbol}&background=random&size=40`
                : finalLogoURI
            }
            alt={symbol}
            width={40}
            height={40}
            unoptimized
            className="w-10 h-10 rounded-full border border-white/10 object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute -bottom-1 right-0 bg-blue-500 rounded-full p-0.5 border border-[#0a0e1c]">
            <CircleCheckBig className="w-3 h-3" />
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1">
            <h2 className="text-2xl font-semibold tracking-tight truncate">
              {symbol}
            </h2>
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-white/5 border border-white/10 text-white">
                <SolanaIcon />
              </div>
              <span className="text-white/10 -ml-1">|</span>
              {website && (
                <button
                  aria-label="Website"
                  onClick={() =>
                    window.open(website, "_blank", "noopener noreferrer")
                  }
                  className="flex items-center justify-center w-6 h-6 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <Globe className="w-4 h-4" />
                </button>
              )}
              {twitter && (
                <button
                  aria-label="Twitter"
                  onClick={() =>
                    window.open(twitter, "_blank", "noopener noreferrer")
                  }
                  className="flex items-center justify-center  w-6 h-6 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 1200 1227"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              )}
              {telegram && (
                <button
                  aria-label="Telegram"
                  onClick={() =>
                    window.open(telegram, "_blank", "noopener noreferrer")
                  }
                  className="flex items-center justify-center  w-6 h-6 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
              <button
                aria-label="Solscan Explorer"
                onClick={() =>
                  window.open(
                    `https://solscan.io/token/${address}`,
                    "_blank",
                    "noopener noreferrer",
                  )
                }
                className="flex items-center justify-center  w-6 h-6 rounded bg-white/5 border border-white/10 hover:bg-white/10 text-muted-foreground hover:text-white transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 shrink-0">
            <span className="font-medium">{displayName}</span>
            <span className="text-white/10">|</span>
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
          className="flex flex-col shrink-0 px-3 py-1 min-w-[90px] justify-center items-center lg:items-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Price
          </span>
          <span className="text-xl font-medium text-white font-mono">
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
          className="bg-[#12111A] flex flex-col shrink-0  rounded-md px-3 py-1.5 min-w-[90px] text-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Market cap
          </span>
          <span className="text-[14px] font-semibold text-white">
            {displayMarketCap}
          </span>
        </motion.div>

        {/* 24H Change */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-[#12111A] rounded-md px-3 py-1.5 min-w-[90px] text-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            24H change
          </span>
          <span
            className={`text-[14px] font-semibold ${isPositiveChange ? "text-chart-green" : "text-red-500"}`}
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
          className="flex flex-col shrink-0 bg-[#12111A] rounded-md px-3 py-1.5 min-w-[90px] text-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            24H Vol.
          </span>
          <span className="text-[14px] font-semibold text-white">
            {displayVolume}
          </span>
        </motion.div>

        {/* Liquidity */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-[#12111A] rounded-md px-3 py-1.5 min-w-[90px] text-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Liquidity
          </span>
          <span className="text-[14px] font-semibold text-white">
            {displayLiquidity}
          </span>
        </motion.div>

        {/* Holders */}
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          className="flex flex-col shrink-0 bg-[#12111A] rounded-md px-3 py-1.5 min-w-[90px] text-center"
        >
          <span className="text-[12px] text-muted-foreground font-medium tracking-wider mb-0.5">
            Holders
          </span>
          <span className="text-[14px] font-semibold text-white">
            {displayHolders}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TradingHeader;
