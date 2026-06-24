import { NextRequest, NextResponse } from "next/server";
import type { TokenListAPIResponse } from "@/types/birdeye";

const BIRDEYE_API_BASE = "https://public-api.birdeye.so";
const BIRDEYE_API_KEY = process.env.BIRDEYE_API_KEY ?? "";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build query params – forward whatever the client sends
    const params = new URLSearchParams();
    params.set("sort_by", searchParams.get("sort_by") ?? "volume_24h_usd");
    params.set("sort_type", searchParams.get("sort_type") ?? "desc");
    params.set("offset", searchParams.get("offset") ?? "0");
    params.set("limit", searchParams.get("limit") ?? "20");

    // Optional filters
    const optionalParams = [
      "min_liquidity",
      "max_liquidity",
      "min_market_cap",
      "max_market_cap",
      "min_fdv",
      "max_fdv",
      "min_24h_volume",
      "max_24h_volume",
    ];

    for (const key of optionalParams) {
      const val = searchParams.get(key);
      if (val) params.set(key, val);
    }

    const url = `${BIRDEYE_API_BASE}/defi/v3/token/list?${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-chain": searchParams.get("chain") ?? "solana",
        "X-API-KEY": BIRDEYE_API_KEY,
      },
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[API /tokens] Birdeye error:", response.status, errorText.slice(0, 200));
      return NextResponse.json(
        {
          success: false,
          data: [],
          total: 0,
          error: `Birdeye API error: ${response.status}`,
        } satisfies TokenListAPIResponse,
        { status: response.status }
      );
    }

    const json = await response.json();

    if (!json.success || !json.data) {
      return NextResponse.json(
        {
          success: false,
          data: [],
          total: 0,
          error: "Birdeye API returned unsuccessful response",
        } satisfies TokenListAPIResponse,
        { status: 502 }
      );
    }

    // Birdeye V3 uses `items` not `tokens`
    const tokenArray = json.data.tokens ?? json.data.items ?? [];
    const total = json.data.total ?? tokenArray.length;

    return NextResponse.json({
      success: true,
      data: tokenArray,
      total,
    } satisfies TokenListAPIResponse);
  } catch (error) {
    console.error("[API /tokens] Exception:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        total: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      } satisfies TokenListAPIResponse,
      { status: 500 }
    );
  }
}
