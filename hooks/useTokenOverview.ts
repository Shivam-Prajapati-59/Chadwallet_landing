import { useQuery } from "@tanstack/react-query";

interface DexScreenerPair {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: { buys: number; sells: number };
    h1: { buys: number; sells: number };
    h6: { buys: number; sells: number };
    h24: { buys: number; sells: number };
  };
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    m5: number;
    h1: number;
    h6: number;
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
}

export function useTokenOverview(address: string) {
  return useQuery({
    queryKey: ["tokenOverview", address],
    queryFn: async () => {
      if (!address) return null;
      
      const res = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${address}`);
      if (!res.ok) throw new Error("Failed to fetch token overview");
      
      const data = await res.json();
      
      if (!data.pairs || data.pairs.length === 0) {
        return null;
      }

      // Find the most liquid Solana pair for this token
      const solanaPairs = data.pairs.filter((p: DexScreenerPair) => p.chainId === "solana");
      if (solanaPairs.length === 0) return null;
      
      // Sort by liquidity
      solanaPairs.sort((a: DexScreenerPair, b: DexScreenerPair) => {
        const liqA = a.liquidity?.usd || 0;
        const liqB = b.liquidity?.usd || 0;
        return liqB - liqA;
      });

      return solanaPairs[0] as DexScreenerPair;
    },
    enabled: !!address,
    staleTime: 10 * 1000,
    refetchInterval: 30 * 1000,
  });
}
