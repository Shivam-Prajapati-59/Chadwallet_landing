import { useQuery } from "@tanstack/react-query";
import type {
  BirdeyeToken,
  TokenListParams,
  TokenListAPIResponse,
} from "@/types/birdeye";

/**
 * Fetches the token list from our internal API route.
 * The API route proxies the Birdeye V3 token list endpoint.
 */
async function fetchTokenList(
  params: TokenListParams = {}
): Promise<{ tokens: BirdeyeToken[]; total: number }> {
  const searchParams = new URLSearchParams();

  if (params.sort_by) searchParams.set("sort_by", params.sort_by);
  if (params.sort_type) searchParams.set("sort_type", params.sort_type);
  if (params.offset !== undefined)
    searchParams.set("offset", String(params.offset));
  if (params.limit !== undefined)
    searchParams.set("limit", String(params.limit));
  if (params.min_liquidity !== undefined)
    searchParams.set("min_liquidity", String(params.min_liquidity));
  if (params.max_liquidity !== undefined)
    searchParams.set("max_liquidity", String(params.max_liquidity));
  if (params.min_market_cap !== undefined)
    searchParams.set("min_market_cap", String(params.min_market_cap));
  if (params.max_market_cap !== undefined)
    searchParams.set("max_market_cap", String(params.max_market_cap));

  const response = await fetch(`/api/tokens?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tokens: ${response.status}`);
  }

  const data: TokenListAPIResponse = await response.json();

  if (!data.success) {
    throw new Error(data.error ?? "Unknown error fetching tokens");
  }

  return { tokens: data.data, total: data.total };
}

/**
 * Custom hook to fetch and cache the Birdeye V3 token list.
 *
 * @param params - Optional query parameters (sort, filters, pagination)
 * @param enabled - Whether the query should run (defaults to true)
 *
 * @example
 * ```tsx
 * const { data, isLoading, error } = useTokenList({
 *   sort_by: "volume_24h_usd",
 *   sort_type: "desc",
 *   limit: 20,
 * });
 * ```
 */
export function useTokenList(
  params: TokenListParams = {},
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ["tokenList", params],
    queryFn: () => fetchTokenList(params),
    enabled,
    staleTime: 30 * 1000, // 30 seconds before data is considered stale
    refetchInterval: 60 * 1000, // auto-refetch every 60 seconds
    refetchOnWindowFocus: true,
    retry: 2,
  });
}
