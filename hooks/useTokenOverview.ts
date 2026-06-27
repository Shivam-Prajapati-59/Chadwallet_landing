import { useQuery } from "@tanstack/react-query";

export interface TokenOverview {
  address: string;
  priceUsd: number;
  marketCap: number;
  fdv: number;
  totalSupply: number;
  circulatingSupply: number;
  liquidity: number;
  holders: number;
  priceChange: {
    m5: number;
    h1: number;
    h4: number;
    h24: number;
  };
  volume: {
    m5: number;
    h1: number;
    h4: number;
    h24: number;
  };
  txns: {
    m5: { buys: number; sells: number; buyVolume: number; sellVolume: number };
    h1: { buys: number; sells: number; buyVolume: number; sellVolume: number };
    h4: { buys: number; sells: number; buyVolume: number; sellVolume: number };
    h24: { buys: number; sells: number; buyVolume: number; sellVolume: number };
  };
}

export function useTokenOverview(address: string) {
  return useQuery({
    queryKey: ["tokenOverview", address],
    queryFn: async () => {
      if (!address) return null;
      
      const res = await fetch(`/api/token-overview?address=${address}`);
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to fetch token overview");
      }

      return data.data as TokenOverview;
    },
    enabled: !!address,
    refetchInterval: 15000, // Refresh every 15s to keep it real-time
    staleTime: 10000,
  });
}
