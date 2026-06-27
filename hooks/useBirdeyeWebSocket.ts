import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketPriceData {
  o: number; // Open
  h: number; // High
  l: number; // Low
  c: number; // Close
  v: number; // Volume
  symbol: string;
  unixTime: number;
}

export const useBirdeyeWebSocket = (address: string) => {
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [liveData, setLiveData] = useState<WebSocketPriceData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const pingInterval = useRef<NodeJS.Timeout | null>(null);

  // Re-establish subscription when the address changes
  const subscribeToToken = useCallback((ws: WebSocket, tokenAddress: string) => {
    if (ws.readyState === WebSocket.OPEN) {
      const msg = {
        type: "SUBSCRIBE_PRICE",
        data: {
          queryType: "simple",
          chartType: "1m",
          address: tokenAddress,
          currency: "usd",
        },
      };
      ws.send(JSON.stringify(msg));
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    const connectWebSocket = async () => {
      try {
        // 1. Fetch API Key securely
        const res = await fetch("/api/config/birdeye");
        const { apiKey } = await res.json();

        if (!apiKey || !isActive) return;

        // 2. Establish Connection
        const wsUrl = `wss://public-api.birdeye.so/socket/solana?x-api-key=${apiKey}`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;

        ws.onopen = () => {
          if (!isActive) {
            ws.close();
            return;
          }
          setIsConnected(true);
          console.log("[Birdeye WS] Connected");
          
          // Setup ping-pong heartbeat every 15 seconds to keep connection alive
          pingInterval.current = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
              // The browser's native WebSocket doesn't support manual ping frames,
              // but many APIs accept empty payloads or custom string pings.
              // Note: For native WebSockets, we just listen to server pings if supported,
              // but some APIs require a dummy message. We will just log or rely on server pings.
            }
          }, 15000);

          if (address) {
            subscribeToToken(ws, address);
          }
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            if (data.type === "PRICE_DATA" && data.data) {
              const priceData: WebSocketPriceData = data.data;
              setLiveData(priceData);
              setLivePrice(priceData.c); // Use 'close' price as the current price
            } else if (data.type === "WELCOME") {
              // Automatically subscribed via onopen
            }
          } catch (e) {
            console.error("[Birdeye WS] Message parsing error", e);
          }
        };

        ws.onerror = (error) => {
          console.error("[Birdeye WS] Error:", error);
        };

        ws.onclose = () => {
          console.log("[Birdeye WS] Disconnected");
          setIsConnected(false);
          if (pingInterval.current) {
            clearInterval(pingInterval.current);
          }
        };
      } catch (err) {
        console.error("[Birdeye WS] Initialization error", err);
      }
    };

    connectWebSocket();

    // Cleanup on unmount or address change (if we want to reconnect entirely)
    return () => {
      isActive = false;
      if (pingInterval.current) {
        clearInterval(pingInterval.current);
      }
      if (wsRef.current) {
        // Close the socket gracefully
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [address, subscribeToToken]); 
  // We reconnect whenever the address changes to ensure a clean state, 
  // though we could theoretically just send a new SUBSCRIBE_PRICE message on the same socket.

  return { livePrice, liveData, isConnected };
};
