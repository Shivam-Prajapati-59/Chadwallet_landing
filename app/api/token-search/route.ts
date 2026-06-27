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
    let rawKeyword = searchParams.get("keyword");
    let keyword = rawKeyword ? rawKeyword.trim() : "";

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: "Keyword is required" },
        { status: 400 }
      );
    }
    
    // Birdeye search edge-case: "sol" returns empty for tokens
    if (keyword.toLowerCase() === "sol") {
      keyword = "solana";
    }

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
      keyword,
      target: "token",
      sort_by: "volume_24h_usd",
      sort_type: "desc",
      offset: "0",
      limit: "10"
    }).toString();

    const response = await fetch(
      `https://public-api.birdeye.so/defi/v3/search?${query}`,
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
    
    // Birdeye search returns an array of categories in data.items.
    // We specifically want the category where type === "token"
    let tokens: any[] = [];
    if (json.data?.items && Array.isArray(json.data.items)) {
      const tokenCategory = json.data.items.find((item: any) => item.type === "token");
      if (tokenCategory && tokenCategory.result) {
        tokens = tokenCategory.result;
      }
    }

    return NextResponse.json({
      success: true,
      data: tokens,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
