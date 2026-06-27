import { useQuery } from "@tanstack/react-query";

export interface SearchTokenResult {
  name: string;
  symbol: string;
  address: string;
  network: string;
  logo_uri?: string;
  volume_24h_usd?: number;
  price?: number;
  price_change_24h_percent?: number;
  market_cap?: number;
}

async function fetchTokenSearch(keyword: string): Promise<SearchTokenResult[]> {
  if (!keyword || keyword.trim() === "") return [];
  
  const searchParams = new URLSearchParams({ keyword });
  const response = await fetch(`/api/token-search?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to search tokens: ${response.status}`);
  }

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error ?? "Unknown error searching tokens");
  }

  return data.data;
}

export function useTokenSearch(keyword: string) {
  return useQuery({
    queryKey: ["tokenSearch", keyword],
    queryFn: () => fetchTokenSearch(keyword),
    enabled: !!keyword && keyword.trim().length > 1,
    staleTime: 60 * 1000,
    retry: 1,
  });
}
