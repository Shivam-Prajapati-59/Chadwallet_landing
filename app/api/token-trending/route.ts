import { NextResponse } from "next/server";

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
    const rawOffset = parseInt(searchParams.get("offset") || "0", 10);
    const rawLimit = parseInt(searchParams.get("limit") || "20", 10);

    const offset = isNaN(rawOffset) ? 0 : Math.max(0, rawOffset);
    const limit = isNaN(rawLimit) ? 20 : Math.min(Math.max(1, rawLimit), 100);

    const options = {
      method: "GET",
      headers: {
        "x-chain": "solana",
        "X-API-KEY": BIRDEYE_API_KEY,
        accept: "application/json",
      },
      signal: AbortSignal.timeout(5000),
    };

    const query = new URLSearchParams({
      sort_by: "rank",
      interval: "24h",
      sort_type: "asc",
      offset: offset.toString(),
      limit: limit.toString(),
      ui_amount_mode: "scaled"
    }).toString();

    const response = await fetch(
      `https://public-api.birdeye.so/defi/token_trending?${query}`,
      options
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      return NextResponse.json(
        { success: false, error: `Birdeye API error: ${response.status} ${errorText}` },
        { status: response.status }
      );
    }

    const json = await response.json();
    return NextResponse.json({
      success: true,
      data: json.data?.tokens || [],
      total: json.data?.total || 0,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
