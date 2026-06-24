import { NextResponse } from "next/server";

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

  try {
    const url = `https://api.jup.ag/swap/v1/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${slippageBps}`;
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
  } catch (error: any) {
    console.error("Jupiter quote error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch quote from Jupiter" },
      { status: 500 }
    );
  }
}
