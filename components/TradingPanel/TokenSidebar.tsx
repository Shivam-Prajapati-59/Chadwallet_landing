"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Loader2, Bell, Triangle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useTokenList } from "@/hooks/useTokenList";
import { useTokenTrending } from "@/hooks/useTokenTrending";
import type { BirdeyeToken } from "@/types/birdeye";

import {
  formatPrice,
  formatMarketCap,
  formatPercent,
} from "@/utils/formatters";

const FILTERS = [
  "Watchlist",
  "Crypto",
  "Trending",
  "Most held",
  "Graduated",
  "Bonding",
];

interface TokenSidebarProps {
  onSelectToken?: (token: {
    address: string;
    symbol: string;
    logoURI?: string;
  }) => void;
}

const TokenSidebar = ({ onSelectToken }: TokenSidebarProps = {}) => {
  const [activeFilter, setActiveFilter] = useState("Watchlist");
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  const isTrending = activeFilter === "Trending";

  const {
    data: listData,
    isLoading: listIsLoading,
    error: listError,
    fetchNextPage: listFetchNextPage,
    hasNextPage: listHasNextPage,
    isFetchingNextPage: listIsFetchingNextPage,
  } = useTokenList(
    {
      sort_by: "volume_24h_usd",
      sort_type: "desc",
      limit: 20,
    },
    !isTrending,
  );

  const {
    data: trendingData,
    isLoading: trendingIsLoading,
    error: trendingError,
    fetchNextPage: trendingFetchNextPage,
    hasNextPage: trendingHasNextPage,
    isFetchingNextPage: trendingIsFetchingNextPage,
  } = useTokenTrending(isTrending);

  const data = isTrending ? trendingData : listData;
  const isLoading = isTrending ? trendingIsLoading : listIsLoading;
  const error = isTrending ? trendingError : listError;
  const fetchNextPage = isTrending ? trendingFetchNextPage : listFetchNextPage;
  const hasNextPage = isTrending ? trendingHasNextPage : listHasNextPage;
  const isFetchingNextPage = isTrending
    ? trendingIsFetchingNextPage
    : listIsFetchingNextPage;

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten the pages returned by useInfiniteQuery into a single array
  const tokens: BirdeyeToken[] =
    data?.pages.flatMap((page) => page.tokens) ?? [];

  return (
    <div className="bg-[#060510] flex flex-col h-full border border-white/10 rounded-xl overflow-hidden">
      {/* Top Header Tabs */}
      <div className="bg-[#12111A]">
        <Tabs defaultValue="tokens" className="w-full p-2">
          <TabsList className="w-full bg-[#12111A] flex overflow-x-auto scrollbar-none justify-start">
            <TabsTrigger
              value="alerts"
              className="py-3 border-none rounded-md shrink-0"
            >
              <Bell /> Alerts
            </TabsTrigger>
            <TabsTrigger
              value="tokens"
              className="py-3 border-none rounded-md shrink-0"
            >
              Tokens
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className="py-3 border-none rounded-md shrink-0"
            >
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="feed"
              className="py-3 border-none rounded-md shrink-0"
            >
              Feed
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {/* Filters Scroll Area */}
      <div className="px-3 py-1 overflow-hidden">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-1 rounded-lg p-1">
            {FILTERS.map((filter) => (
              <Button
                key={filter}
                variant="ghost"
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className={`text-sm rounded-md shrink-0 transition-all duration-200
        ${
          activeFilter === filter
            ? "bg-[#16161552] text-white border border-white/10"
            : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
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
      <div className="flex-1 px-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
            <span className="ml-5 text-sm text-muted-foreground">
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
          <div className="w-full overflow-hidden">
            <Table className="border-spacing-y-1 table-fixed w-full">
              <TableBody>
                {tokens.map((token, idx) => {
                  const isSelected = selectedToken === token.address;
                  const isPositive = token.price_change_24h_percent >= 0;
                  return (
                    <TableRow
                      key={`${token.address}-${idx}`}
                      onClick={() => {
                        setSelectedToken(token.address);
                        if (onSelectToken && token.address) {
                          onSelectToken({
                            address: token.address,
                            symbol: token.symbol,
                            logoURI: token.logo_uri || undefined,
                          });
                        }
                      }}
                      className="transition-colors group cursor-pointer border-0 hover:bg-transparent"
                    >
                      <TableCell
                        className={`py-2 px-1 sm:p-3 align-middle rounded-l-xl transition-colors w-[55%] sm:w-[60%] overflow-hidden ${
                          isSelected
                            ? "bg-secondary/70"
                            : "group-hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                          {token.logo_uri ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={token.logo_uri}
                              alt={token.symbol}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary shrink-0 object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  `https://ui-avatars.com/api/?name=${token.symbol}&background=random&size=32`;
                              }}
                            />
                          ) : (
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary shrink-0 flex items-center justify-center text-xs font-bold text-foreground">
                              {token.symbol?.charAt(0) ?? "?"}
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-sm tracking-tight group-hover:text-primary transition-colors text-foreground truncate max-w-[90px] sm:max-w-full">
                              {token.symbol}
                            </span>
                            <span className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">
                              {formatPrice(token.price)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`py-2 px-1 sm:p-3 text-right align-middle rounded-r-xl transition-colors w-[45%] sm:w-[40%] overflow-hidden ${
                          isSelected
                            ? "bg-secondary/70"
                            : "group-hover:bg-secondary/40"
                        }`}
                      >
                        <div className="flex flex-col items-end gap-0.5 min-w-0">
                          <span className="font-semibold text-[13px] sm:text-sm text-foreground truncate w-full text-right">
                            {formatMarketCap(token.market_cap)} MC
                          </span>
                          <span
                            className={`font-medium text-[11px] sm:text-xs flex items-center justify-end gap-1 w-full truncate ${
                              isPositive
                                ? "text-chart-green"
                                : "text-destructive"
                            }`}
                          >
                            {isPositive ? (
                              <Triangle className="w-1.5 h-1.5 shrink-0 fill-current" />
                            ) : (
                              <Triangle className="w-1.5 h-1.5 shrink-0 fill-current rotate-180" />
                            )}
                            <span className="truncate">
                              {formatPercent(token.price_change_24h_percent)}
                            </span>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
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
