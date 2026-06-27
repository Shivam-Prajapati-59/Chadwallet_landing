import { NextResponse } from "next/server";
import { assertIsAddress } from "@solana/kit";

const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY;

export async function GET(request: Request) {
  try {
    if (!BIRDEYE_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Birdeye API key not configured" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const address = searchParams.get("address");

    // Validate Solana address using @solana/kit
    if (!address) {
      return NextResponse.json(
        { success: false, error: "Valid Solana address is required" },
        { status: 400 }
      );
    }
    try {
      assertIsAddress(address);
    } catch {
      return NextResponse.json(
        { success: false, error: "Valid Solana address is required" },
        { status: 400 }
      );
    }

    const options = {
      method: 'GET',
      headers: {
        'x-chain': 'solana',
        'X-API-KEY': BIRDEYE_API_KEY,
        'accept': 'application/json'
      }
    };

    // Use URLSearchParams for safe encoding
    const query = new URLSearchParams({ address }).toString();
    
    // Accurate rate limiting and try-catch around each fetch
    const startTime = Date.now();
    let marketDataRes: Response | null = null;
    let tradeDataRes: Response | null = null;

    try {
      marketDataRes = await fetch(`https://public-api.birdeye.so/defi/v3/token/market-data?${query}`, {
        ...options,
        signal: AbortSignal.timeout(5000)
      });
    } catch (e) {
      console.warn("Birdeye market-data network error", e);
    }
    
    const elapsed = Date.now() - startTime;
    if (elapsed < 1000) {
      await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
    }
    
    try {
      tradeDataRes = await fetch(`https://public-api.birdeye.so/defi/v3/token/trade-data/single?${query}`, {
        ...options,
        signal: AbortSignal.timeout(5000)
      });
    } catch (e) {
      console.warn("Birdeye trade-data network error", e);
    }

    // Gracefully handle 429s or other errors by parsing what we can
    let marketData = { success: false, data: {} as any };
    let tradeData = { success: false, data: {} as any };

    if (marketDataRes?.ok) {
      marketData = await marketDataRes.json().catch(() => ({ success: false, data: {} }));
    }
    
    if (tradeDataRes?.ok) {
      tradeData = await tradeDataRes.json().catch(() => ({ success: false, data: {} }));
    }

    // If both completely failed (e.g. invalid API key)
    if (!marketData.success && !tradeData.success) {
       return NextResponse.json(
        { success: false, error: "Birdeye API rate limit exceeded on both endpoints." },
        { status: 500 }
      );
    }

    // Combine the data into our new TokenOverview structure
    const m = marketData.success ? marketData.data : {};
    const t = tradeData.success ? tradeData.data : {};

    const overview = {
      address: m.address || address,
      priceUsd: m.price || 0,
      marketCap: m.market_cap || 0,
      fdv: m.fdv || 0,
      totalSupply: m.total_supply || 0,
      circulatingSupply: m.circulating_supply || 0,
      liquidity: m.liquidity || 0,
      holders: m.holder || 0,
      
      // Price changes
      priceChange: {
        m5: t.price_change_5m_percent || 0,
        h1: t.price_change_1h_percent || 0,
        h4: t.price_change_4h_percent || 0,
        h24: t.price_change_24h_percent || 0,
      },
      
      // Volume
      volume: {
        m5: t.volume_5m_usd || 0,
        h1: t.volume_1h_usd || 0,
        h4: t.volume_4h_usd || 0,
        h24: t.volume_24h_usd || 0,
      },
      
      // Transactions (Buys/Sells)
      txns: {
        m5: { buys: t.buy_5m || 0, sells: t.sell_5m || 0, buyVolume: t.volume_buy_5m_usd || 0, sellVolume: t.volume_sell_5m_usd || 0 },
        h1: { buys: t.buy_1h || 0, sells: t.sell_1h || 0, buyVolume: t.volume_buy_1h_usd || 0, sellVolume: t.volume_sell_1h_usd || 0 },
        h4: { buys: t.buy_4h || 0, sells: t.sell_4h || 0, buyVolume: t.volume_buy_4h_usd || 0, sellVolume: t.volume_sell_4h_usd || 0 },
        h24: { buys: t.buy_24h || 0, sells: t.sell_24h || 0, buyVolume: t.volume_buy_24h_usd || 0, sellVolume: t.volume_sell_24h_usd || 0 },
      }
    };

    return NextResponse.json({ success: true, data: overview });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
