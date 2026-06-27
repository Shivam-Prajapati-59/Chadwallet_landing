// ─── Birdeye Token List V3 API Types ────────────────────────────────

/** Allowed sort fields for the token list endpoint */
export type TokenSortBy =
  | "liquidity"
  | "market_cap"
  | "fdv"
  | "recent_listing_time"
  | "last_trade_unix_time"
  | "holder"
  | "volume_1m_usd"
  | "volume_5m_usd"
  | "volume_30m_usd"
  | "volume_1h_usd"
  | "volume_2h_usd"
  | "volume_4h_usd"
  | "volume_8h_usd"
  | "volume_24h_usd"
  | "volume_7d_usd"
  | "volume_30d_usd"
  | "price_change_24h_percent"
  | "price_change_1h_percent"
  | "trade_24h_count"
  | "trade_1h_count";

/** Sort order direction */
export type TokenSortType = "desc" | "asc";

/** Query parameters for GET /defi/v3/token/list */
export interface TokenListParams {
  sort_by?: TokenSortBy;
  sort_type?: TokenSortType;
  min_liquidity?: number;
  max_liquidity?: number;
  min_market_cap?: number;
  max_market_cap?: number;
  min_fdv?: number;
  max_fdv?: number;
  min_24h_volume?: number;
  max_24h_volume?: number;
  offset?: number;
  limit?: number;
}

/** A single token returned from the Birdeye V3 token list */
export interface BirdeyeToken {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logo_uri: string | null;
  liquidity: number;
  market_cap: number;
  fdv: number;
  holder: number;
  price: number;
  price_change_24h_percent: number;
  volume_24h_usd: number;
  volume_1h_usd: number;
  volume_buy_24h_usd?: number;
  volume_sell_24h_usd?: number;
  total_supply?: number;
  trade_24h_count: number;
  trade_1h_count: number;
  last_trade_unix_time: number;
  recent_listing_time: number | null;
  extensions: Record<string, unknown> | null;
}

/** The data payload from the API response */
export interface BirdeyeTokenListData {
  tokens: BirdeyeToken[];
  total: number;
}

/** Full API response wrapper */
export interface BirdeyeTokenListResponse {
  success: boolean;
  data: BirdeyeTokenListData;
}

/** Internal API route response for our Next.js endpoint */
export interface TokenListAPIResponse {
  success: boolean;
  data: BirdeyeToken[];
  total: number;
  error?: string;
}
