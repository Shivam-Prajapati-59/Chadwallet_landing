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

    const query = new URLSearchParams({ address }).toString();
    const options = {
      method: 'GET',
      headers: {
        'x-chain': 'solana',
        'X-API-KEY': BIRDEYE_API_KEY,
        'accept': 'application/json'
      }
    };

    const res = await fetch(`https://public-api.birdeye.so/defi/v3/token/profile-single?${query}`, {
      ...options,
      signal: AbortSignal.timeout(5000)
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { success: false, error: `Birdeye API error: ${res.status} ${errorText}` },
        { status: res.status }
      );
    }

    const data = await res.json();
    const raw = data?.data || {};
    
    // Map to expected DTO structure
    const metadata = {
      address: raw.address || address,
      name: raw.name || "Unknown",
      symbol: raw.symbol || "Unknown",
      decimals: raw.decimals || 0,
      extensions: {
        coingeckoId: raw.extensions?.coingeckoId,
        description: raw.extensions?.description,
        discord: raw.extensions?.discord,
        telegram: raw.extensions?.telegram,
        twitter: raw.extensions?.twitter,
        website: raw.extensions?.website,
      },
      logoURI: raw.logo_uri || raw.logoURI,
    };

    return NextResponse.json({ success: true, data: metadata });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
