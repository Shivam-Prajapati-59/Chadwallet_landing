import { NextResponse } from "next/server";

export async function GET() {
  // We provide the API key to the client so it can establish a direct WebSocket connection.
  // Note: For production applications, exposing the API key to the client via query params
  // on a WebSocket URL is standard if the provider doesn't offer short-lived session tokens,
  // but you should restrict the API key's allowed domains in the Birdeye dashboard.
  return NextResponse.json({
    apiKey: process.env.BIRDEYE_API_KEY || "",
  });
}
