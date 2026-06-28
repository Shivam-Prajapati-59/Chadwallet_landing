import { useQuery } from "@tanstack/react-query";

export interface TokenMetadata {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  extensions?: {
    coingeckoId?: string;
    description?: string;
    discord?: string;
    telegram?: string;
    twitter?: string;
    website?: string;
  };
  logoURI?: string;
}

export function useTokenMetadata(address: string) {
  return useQuery({
    queryKey: ["tokenMetadata", address],
    queryFn: async () => {
      if (!address) return null;
      
      const res = await fetch(`/api/token-metadata?address=${address}`);
      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Failed to fetch token metadata");
      }

      return data.data as TokenMetadata;
    },
    enabled: !!address,
    staleTime: 60 * 60 * 1000, // 1 hour cache since metadata rarely changes
    retry: 2,
  });
}
