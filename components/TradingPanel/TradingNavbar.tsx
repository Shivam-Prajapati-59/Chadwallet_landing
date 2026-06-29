"use client";

import React, { useState, useEffect, useRef } from "react";
import Dark_logo from "@/public/assets/dark_logo.png";
import Image from "next/image";
import Link from "next/link";
import { Search, Loader2, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectWallet from "@/components/custom/ConnectWallet";
import { usePrivy } from "@privy-io/react-auth";
import { useTokenSearch, SearchTokenResult } from "@/hooks/useTokenSearch";
import { useRouter, usePathname } from "next/navigation";
import {
  formatMarketCap,
  formatPrice,
  formatPercent,
} from "@/utils/formatters";

import {
  SolanaIcon,
  XIcon,
  StarIcon,
  VerifiedBadge,
} from "@/components/icons/TokenIcons";

// ── Deterministic avatar color per token symbol ────────────────────────────
const TOKEN_AVATAR_COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#3b82f6", // blue
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#ec4899", // pink
];
function getAvatarColor(symbol: string): string {
  let n = 0;
  for (let i = 0; i < symbol.length; i++) n += symbol.charCodeAt(i);
  return TOKEN_AVATAR_COLORS[n % TOKEN_AVATAR_COLORS.length];
}

// ── Badge label (MC / VOL) ─────────────────────────────────────────────────
const MetaBadge = ({ label }: { label: string }) => (
  <span className="border border-white/10 rounded-md px-1.5 py-0.5 text-[10px] text-muted-foreground bg-[#060510]/10 font-sans tracking-wider leading-none">
    {label}
  </span>
);

// ── Token row ──────────────────────────────────────────────────────────────
const TokenRow = ({
  token,
  onClick,
}: {
  token: SearchTokenResult;
  onClick: () => void;
}) => {
  const avatarColor = getAvatarColor(token.symbol ?? "?");

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-2.5 hover:bg-white/5 transition-colors text-left w-full"
    >
      {/* ── Avatar ── */}
      <div className="relative shrink-0">
        {token.logo_uri ? (
          <Image
            src={token.logo_uri}
            alt={token.symbol}
            width={38}
            height={38}
            unoptimized
            className="w-[38px] h-[38px] rounded-full object-cover"
            onError={(e) => {
              const el = e.target as HTMLImageElement;
              el.style.display = "none";
              el.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        {/* Fallback coloured avatar */}
        <div
          className={`w-[38px] h-[38px] rounded-full flex items-center justify-center text-[13px] font-bold text-white ${token.logo_uri ? "hidden" : ""}`}
          style={{ backgroundColor: avatarColor }}
        >
          {token.symbol?.charAt(0) ?? "?"}
        </div>
        <VerifiedBadge />
      </div>

      {/* ── Symbol + Name ── */}
      <div className="flex flex-col min-w-0 flex-1 justify-center gap-[3px]">
        {/* Row 1: symbol + chain/social icons */}
        <div className="flex items-center gap-1">
          <span className="font-bold text-[14px] tracking-tight text-white leading-none">
            {token.symbol}
          </span>

          {/* Chain / social icon pills */}
          <div className="flex items-center gap-1">
            <span className="w-[16px] h-[16px] rounded-md bg-white/5 border border-white/6 flex items-center justify-center p-[1.5px]">
              <SolanaIcon />
            </span>
            <span className="w-[16px] h-[16px] rounded-md bg-white/5 border border-white/6 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
              <XIcon />
            </span>
            <span className="w-[16px] h-[16px] rounded-md bg-white/5 border border-white/6 flex items-center justify-center text-muted-foreground hover:text-white transition-colors">
              <StarIcon />
            </span>
          </div>
        </div>

        {/* Row 2: name + truncated address */}
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground truncate leading-none">
          <span className="truncate max-w-[120px]">{token.name}</span>
          <span className="opacity-40 font-mono shrink-0">
            {token.address.slice(0, 4)}...{token.address.slice(-4)}
          </span>
        </div>
      </div>

      {/* ── Metrics ── */}
      <div className="flex items-center gap-5 text-[12.5px] font-semibold shrink-0 font-mono">
        {/* Market Cap — hidden on xs */}
        <div className="hidden sm:flex items-center gap-1 w-[88px]">
          {token.market_cap ? (
            <>
              <MetaBadge label="MC" />
              <span>{formatMarketCap(token.market_cap)}</span>
            </>
          ) : null}
        </div>

        {/* Price */}
        <div className="w-[68px] text-left text-white tabular-nums">
          {token.price ? (
            formatPrice(token.price)
          ) : (
            <span className="opacity-30">—</span>
          )}
        </div>

        {/* 24h % change */}
        <div
          className={`w-[64px] flex items-center justify-start gap-1 whitespace-nowrap tabular-nums font-medium ${
            token.price_change_24h_percent === undefined
              ? "opacity-0"
              : token.price_change_24h_percent >= 0
                ? "text-chart-green"
                : "text-chart-red"
          }`}
        >
          {token.price_change_24h_percent !== undefined && (
            <>
              {token.price_change_24h_percent >= 0 ? (
                <Triangle className="w-1.5 h-1.5 shrink-0 fill-current" />
              ) : (
                <Triangle className="w-1.5 h-1.5 shrink-0 fill-current rotate-180" />
              )}
              <span className="truncate">
                {formatPercent(Math.abs(token.price_change_24h_percent))}
              </span>
            </>
          )}
        </div>

        {/* Volume — hidden on < md */}
        <div className="hidden md:flex items-center justify-start gap-1 w-[88px]">
          {token.volume_24h_usd ? (
            <>
              <MetaBadge label="VOL" />
              <span className="text-white">
                {formatMarketCap(token.volume_24h_usd)}
              </span>
            </>
          ) : null}
        </div>
      </div>
    </button>
  );
};

// ── Main navbar ────────────────────────────────────────────────────────────
const TradingNavbar = () => {
  const { authenticated, user } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useTokenSearch(debouncedQuery);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFocused(false);
        setQuery("");
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelectToken = (token: SearchTokenResult) => {
    setQuery("");
    setDebouncedQuery("");
    setIsFocused(false);

    const params = new URLSearchParams();
    params.set("token", token.address);
    params.set("symbol", token.symbol);
    if (token.logo_uri) params.set("logoURI", token.logo_uri);

    router.push(`${pathname}?${params.toString()}`);
  };

  const isDropdownOpen = isFocused && query.trim().length > 1;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-[5px] px-4 py-2">
      <div className="flex items-center justify-between gap-4 h-12">
        {/* ── Logo ── */}
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <Image
            src={Dark_logo.src}
            alt="Logo"
            width={70}
            height={70}
            className="h-10 w-auto object-contain"
          />
          <span className="hidden sm:block text-lg font-bold tracking-tight">
            ChadWallet
          </span>
        </Link>

        {/* ── Search ── */}
        <div
          ref={containerRef}
          className={`relative mt-8 flex-1 max-w-2xl mx-auto transition-all ${isDropdownOpen ? "z-50" : ""}`}
        >
          {/* ── Dropdown Container (renders behind the search bar) ── */}
          {isDropdownOpen && (
            <div className="absolute sm:top-[-8px] sm:left-[-8px] sm:right-[-8px] bg-[#12111A] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col pt-[48px] sm:pt-[52px] pb-2 z-0 overflow-hidden">
              {/* Tab bar */}
              <div className="px-3 pt-2 shrink-0">
                <Tabs defaultValue="tokens" className="w-full">
                  <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start">
                    {["All", "Tokens", "Users"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab.toLowerCase()}
                        className="px-4 h-5 text-[13px] font-semibold rounded-lg data-[state=active]:bg-white/10 data-[state=active]:text-white text-muted-foreground hover:text-white transition-colors"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>

              {/* Results list */}
              <div className="max-h-[320px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
                {isLoading || query !== debouncedQuery ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                  </div>
                ) : isError ? (
                  <p className="text-sm text-chart-red p-8 text-center">
                    Failed to load results
                  </p>
                ) : searchResults && searchResults.length > 0 ? (
                  searchResults.map((token, idx) => (
                    <TokenRow
                      key={`${token.address}-${idx}`}
                      token={token}
                      onClick={() => handleSelectToken(token)}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground p-8 text-center">
                    No tokens found for &quot;{query}&quot;
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Search Input (floats on top) ── */}
          <div
            className={`relative z-10 flex items-center px-4 h-12 transition-colors bg-[#0C0E15] border border-white/10 rounded-xl hover:border-white/20`}
          >
            <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-3" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-white font-medium"
            />
            <kbd className="hidden sm:flex px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold text-muted-foreground ml-2 tracking-wider">
              ESC
            </kbd>
          </div>
        </div>

        {/* ── Right: Connect wallet ── */}
        <div className="flex items-center gap-2 shrink-0">
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default TradingNavbar;
