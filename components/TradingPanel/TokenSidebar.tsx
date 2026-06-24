"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTokenList } from "@/hooks/useTokenList";
import type { BirdeyeToken } from "@/types/birdeye";

import { formatPrice, formatMarketCap, formatPercent } from "@/utils/formatters";

const FILTERS = [
  "Watchlist",
  "Crypto",
  "Trending",
  "Most held",
  "Graduated",
  "Bonding",
];

interface TokenSidebarProps {
  onSelectToken?: (token: { address: string; symbol: string; logoURI?: string }) => void;
}

const TokenSidebar = ({ onSelectToken }: TokenSidebarProps = {}) => {
  const [activeFilter, setActiveFilter] = useState("Watchlist");
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const { 
    data, 
    isLoading, 
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useTokenList({
    sort_by: "volume_24h_usd",
    sort_type: "desc",
    limit: 20,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten the pages returned by useInfiniteQuery into a single array
  const tokens: BirdeyeToken[] = data?.pages.flatMap((page) => page.tokens) ?? [];

  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      {/* Top Header Tabs */}
      <div className="p-3">
        <Tabs defaultValue="tokens" className="w-full">
          <TabsList className="w-full bg-background/80">
            <TabsTrigger value="alerts" className="py-3 rounded-md">
              Alerts
            </TabsTrigger>
            <TabsTrigger value="tokens" className="py-3 rounded-md">
              Tokens
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="py-3 rounded-md">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="feed" className="py-3 rounded-md">
              Feed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filters Scroll Area */}
      <div className="px-3 py-2">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-1">
            {FILTERS.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={`text-sm rounded-md transition-all ${
                  activeFilter === filter
                    ? "text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Table Content */}
      <div className="flex-1 px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">
              Loading tokens...
            </span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-12">
            <span className="text-sm text-destructive">
              Failed to load tokens
            </span>
          </div>
        ) : tokens.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <span className="text-sm text-muted-foreground">
              No tokens found
            </span>
          </div>
        ) : (
          <Table className="border-spacing-y-1">
            <TableBody>
              {tokens.map((token, idx) => {
                const isSelected = selectedToken === token.address;
                const isPositive = token.price_change_24h_percent >= 0;
                return (
                  <TableRow
                    key={token.address || idx}
                    onClick={() => {
                      setSelectedToken(token.address);
                      if (onSelectToken && token.address) {
                        onSelectToken({ address: token.address, symbol: token.symbol, logoURI: token.logo_uri || undefined });
                      }
                    }}
                    className="transition-colors group cursor-pointer border-0 hover:bg-transparent"
                  >
                    <TableCell
                      className={`p-3 align-middle rounded-l-xl transition-colors ${
                        isSelected
                          ? "bg-secondary/70"
                          : "group-hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {token.logo_uri ? (
                          <img
                            src={token.logo_uri}
                            alt={token.symbol}
                            className="w-8 h-8 rounded-full bg-secondary shrink-0 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                `https://ui-avatars.com/api/?name=${token.symbol}&background=random&size=32`;
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-secondary shrink-0 flex items-center justify-center text-xs font-bold text-foreground">
                            {token.symbol?.charAt(0) ?? "?"}
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors text-foreground truncate max-w-[80px]">
                            {token.symbol}
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {formatPrice(token.price)}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      className={`p-3 text-right align-middle rounded-r-xl transition-colors ${
                        isSelected
                          ? "bg-secondary/70"
                          : "group-hover:bg-secondary/40"
                      }`}
                    >
                      <div className="flex flex-col items-end gap-0.5">
                        <span className="font-semibold text-sm text-foreground">
                          {formatMarketCap(token.market_cap)}
                        </span>
                        <span
                          className={`font-medium text-xs flex items-center gap-1 ${
                            isPositive ? "text-green-500" : "text-destructive"
                          }`}
                        >
                          {isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {formatPercent(token.price_change_24h_percent)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <div ref={ref} className="py-4 flex justify-center h-10 shrink-0">
          {isFetchingNextPage && (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSidebar;
