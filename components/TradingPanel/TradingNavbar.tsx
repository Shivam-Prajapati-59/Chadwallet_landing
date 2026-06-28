"use client";

import React, { useState, useEffect, useRef } from "react";
import Dark_logo from "@/public/assets/dark_logo.png";
import Image from "next/image";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConnectWallet from "@/components/custom/ConnectWallet";
import { usePrivy } from "@privy-io/react-auth";
import { useTokenSearch, SearchTokenResult } from "@/hooks/useTokenSearch";
import { useRouter, usePathname } from "next/navigation";
import { formatMarketCap, formatPrice, formatPercent } from "@/utils/formatters";

const TradingNavbar = () => {
  const { authenticated, user } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: searchResults, isLoading, isError } = useTokenSearch(debouncedQuery);



  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectToken = (token: SearchTokenResult) => {
    setQuery("");
    setDebouncedQuery("");
    setIsFocused(false);

    const params = new URLSearchParams();
    params.set("token", token.address);
    params.set("symbol", token.symbol);
    if (token.logo_uri) {
      params.set("logoURI", encodeURIComponent(token.logo_uri));
    }
    
    // If we're already on the trade page, replace/push with new params
    // Otherwise route to the trade page. Assuming this navbar is rendered in /trade layout.
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#050816]/95 backdrop-blur-2xl px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <Image
            src={Dark_logo.src}
            alt="Logo Light"
            width={70}
            height={70}
            className="h-10 w-auto object-contain "
          />

          <span className="hidden sm:block text-lg font-bold tracking-tight">
            ChadWallet
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div 
          ref={containerRef}
          className="relative flex-1 max-w-xl mx-auto flex items-center bg-white/5 border rounded-md px-3 py-2.5 transition-colors focus-within:border-green-400/50 focus-within:bg-white/10"
        >
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Search tokens..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
          />

          {/* Search Results Dropdown */}
          {isFocused && query.trim().length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#12141a] border border-white/10 rounded-md shadow-xl overflow-hidden z-50 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]">
              {isLoading || query !== debouncedQuery ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                </div>
              ) : isError ? (
                <div className="text-sm text-red-400 p-4 text-center">
                  Failed to load results
                </div>
              ) : searchResults && searchResults.length > 0 ? (
                <div className="flex flex-col">
                  {searchResults.map((token, idx) => (
                    <button
                      key={`${token.address}-${idx}`}
                      onClick={() => handleSelectToken(token)}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left border-b border-white/5 last:border-0"
                    >
                      {token.logo_uri ? (
                        <Image
                          src={token.logo_uri}
                          alt={token.symbol}
                          width={28}
                          height={28}
                          unoptimized
                          className="w-7 h-7 rounded-full bg-black/50 shrink-0 object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${token.symbol}&background=random&size=28`;
                          }}
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-black/50 shrink-0 flex items-center justify-center text-[10px] font-bold text-foreground">
                          {token.symbol?.charAt(0) ?? "?"}
                        </div>
                      )}
                      
                      <div className="flex flex-col min-w-0 flex-1 justify-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm tracking-tight text-white">{token.symbol}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground truncate gap-1">
                          <span>{token.name}</span>
                          <span className="opacity-50">{token.address.slice(0, 4)}...{token.address.slice(-4)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs font-medium shrink-0 ml-2">
                        {token.market_cap ? (
                          <div className="flex items-center gap-1.5 hidden sm:flex">
                            <span className="border border-white/10 rounded px-1 text-[9px] font-bold text-muted-foreground bg-white/5">MC</span>
                            <span className="text-white">{formatMarketCap(token.market_cap)}</span>
                          </div>
                        ) : null}
                        
                        {token.price ? (
                          <span className="text-white hidden sm:block">{formatPrice(token.price)}</span>
                        ) : null}
                        
                        {token.price_change_24h_percent !== undefined ? (
                          <span className={token.price_change_24h_percent >= 0 ? "text-green-500" : "text-red-500"}>
                            {token.price_change_24h_percent >= 0 ? "▲" : "▼"} {formatPercent(token.price_change_24h_percent)}
                          </span>
                        ) : null}
                        
                        {token.volume_24h_usd ? (
                          <div className="flex items-center gap-1.5 hidden md:flex">
                            <span className="border border-white/10 rounded px-1 text-[9px] font-bold text-muted-foreground bg-white/5">VOL</span>
                            <span className="text-white">{formatMarketCap(token.volume_24h_usd)}</span>
                          </div>
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground p-4 text-center">
                  No tokens found
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Deposit + Connect Wallet */}
        <div className="flex items-center gap-2 shrink-0">

          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default TradingNavbar;
