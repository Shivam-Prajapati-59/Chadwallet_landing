import { NextResponse } from "next/server";

const SOLANA_ADDRESS_RE = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const inputMint = searchParams.get("inputMint");
  const outputMint = searchParams.get("outputMint");
  const amount = searchParams.get("amount");
  const slippageBps = searchParams.get("slippageBps") || "50";

  if (!inputMint || !outputMint || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters: inputMint, outputMint, amount" },
      { status: 400 }
    );
  }

  // Validate mint addresses are valid base58 Solana addresses
  if (!SOLANA_ADDRESS_RE.test(inputMint) || !SOLANA_ADDRESS_RE.test(outputMint)) {
    return NextResponse.json(
      { error: "Invalid mint address format" },
      { status: 400 }
    );
  }

  // Validate amount is a positive integer
  if (!/^\d+$/.test(amount) || Number(amount) <= 0) {
    return NextResponse.json(
      { error: "Amount must be a positive integer (in smallest denomination)" },
      { status: 400 }
    );
  }

  // Validate slippageBps is a reasonable number
  const slippage = Number(slippageBps);
  if (isNaN(slippage) || slippage < 0 || slippage > 5000) {
    return NextResponse.json(
      { error: "slippageBps must be between 0 and 5000" },
      { status: 400 }
    );
  }

  try {
    // Build URL safely with URLSearchParams
    const params = new URLSearchParams({
      inputMint,
      outputMint,
      amount,
      slippageBps: String(slippage),
    });

    const url = `https://api.jup.ag/swap/v1/quote?${params.toString()}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Jupiter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Jupiter quote error:", error);
    const message = error instanceof Error ? error.message : "Failed to fetch quote from Jupiter";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
