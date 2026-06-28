import { useState, useEffect, useRef } from "react";

interface WebSocketPriceData {
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
  v: number; // Volume
  symbol: string;
  unixTime: number;
}

export const usePythWebSocket = (address: string, symbol: string = "") => {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [liveData, setLiveData] = useState<WebSocketPriceData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let isActive = true;

    // Reset live price when switching tokens so we don't show the old token's price
    setLivePrice(null);
    setLiveData(null);

    const connectPythWebSocket = async () => {
      if (!symbol || !isActive) return;

      try {
        // 1. Find Pyth Price Feed ID for the symbol
        // For Pyth, Solana tokens are usually formatted as Crypto.SOL/USD
        const searchUrl = `https://hermes.pyth.network/v2/price_feeds?query=${symbol.toUpperCase()}/USD&asset_type=crypto`;
        const res = await fetch(searchUrl);
        const feeds = await res.json();
        
        // Match the exact symbol to avoid taking similar feeds (like USOL)
        const feed = feeds.find((f: any) => f.attributes.symbol === `Crypto.${symbol.toUpperCase()}/USD`);
        if (!feed) {
          // [Pyth WS] No feed found fallback
          return;
        }

        const feedId = feed.id;

        // 2. Connect to Pyth WebSocket
        const ws = new WebSocket('wss://hermes.pyth.network/ws');
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isActive) {
            ws.close();
            return;
          }
          setIsConnected(true);
          // Connected
          ws.send(JSON.stringify({
            "type": "subscribe",
            "ids": [feedId]
          }));
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            // Pyth sends initial response and then streams price_updates
            if (data.type === 'price_update' && data.price_feed) {
              const priceData = data.price_feed.price;
              
              // Pyth price is represented as integer * 10^expo
              const realPrice = Number(priceData.price) * Math.pow(10, priceData.expo);
              
              setLivePrice(realPrice);
              
              // Mocking the interface to keep type compatibility with TradingHeader
              setLiveData({
                o: realPrice,
                h: realPrice,
                l: realPrice,
                c: realPrice,
                v: 0,
                symbol,
                unixTime: priceData.publish_time
              });
            }
          } catch (e) {
            console.error("[Pyth WS] Message parsing error", e);
          }
        };

        ws.onerror = (error) => {
          console.error("[Pyth WS] Error:", error);
        };

        ws.onclose = () => {
          // Disconnected
          setIsConnected(false);
        };
      } catch (err) {
        console.error("[Pyth WS] Initialization error", err);
      }
    };

    connectPythWebSocket();

    return () => {
      isActive = false;
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [symbol, address]);

  return { livePrice, liveData, isConnected };
};
