/** Format price to a readable string */
export function formatPrice(price: number): string {
  if (price >= 1) return `$${price.toFixed(2)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  return `$${price.toFixed(6)}`;
}

/** Format market cap to a short readable string */
export function formatMarketCap(mc: number): string {
  if (mc >= 1_000_000_000) return `$${(mc / 1_000_000_000).toFixed(1)}B MC`;
  if (mc >= 1_000_000) return `$${(mc / 1_000_000).toFixed(1)}M MC`;
  if (mc >= 1_000) return `$${(mc / 1_000).toFixed(1)}K MC`;
  return `$${mc.toFixed(0)} MC`;
}

/** Format percentage change */
export function formatPercent(pct: number): string {
  return `${Math.abs(pct).toFixed(2)}%`;
}
