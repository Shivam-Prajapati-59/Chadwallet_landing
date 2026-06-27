import { useInfiniteQuery } from "@tanstack/react-query";
import type { BirdeyeToken } from "@/types/birdeye";

interface TrendingResponse {
  tokens: BirdeyeToken[];
  total: number;
}

async function fetchTrendingTokens(
  offset: number = 0,
  limit: number = 20
): Promise<TrendingResponse> {
  const searchParams = new URLSearchParams({
    offset: offset.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`/api/token-trending?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch trending tokens: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error ?? "Unknown error fetching trending tokens");
  }

  // Map the trending token response to BirdeyeToken format
  const mappedTokens: BirdeyeToken[] = data.data.map((t: any) => ({
    address: t.address,
    decimals: t.decimals,
    symbol: t.symbol,
    name: t.name,
    logo_uri: t.logoURI,
    liquidity: t.liquidity,
    volume_24h_usd: t.volume24hUSD,
    market_cap: t.marketcap,
    price: t.price,
    price_change_24h_percent: t.price24hChangePercent,
  }));

  return { tokens: mappedTokens, total: data.total };
}

export function useTokenTrending(enabled: boolean = true) {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: ["tokenTrending"],
    queryFn: ({ pageParam = 0 }) => fetchTrendingTokens(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce((acc, page) => acc + page.tokens.length, 0);
      if (loadedCount >= lastPage.total || lastPage.tokens.length === 0) {
        return undefined;
      }
      return allPages.length * limit;
    },
    enabled,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
