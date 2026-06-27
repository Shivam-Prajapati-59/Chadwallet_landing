"use client";

import React, { useEffect, useRef, memo } from "react";

interface TradingViewWidgetProps {
  address: string;
  symbol?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  address,
  symbol,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    // Clear the container on each address/symbol change to prevent duplicate scripts
    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    // Use the symbol if provided, otherwise default to SOL for a fallback
    // Usually mapped like CRYPTO:WIFUSD or similar. TradingView uses specific exchange prefixes.
    const tvSymbol = symbol ? `CRYPTO:${symbol}USD` : "CRYPTO:SOLUSD";

    script.innerHTML = `
      {
        "allow_symbol_change": true,
        "calendar": false,
        "details": false,
        "hide_side_toolbar": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "hide_volume": false,
        "hotlist": false,
        "interval": "15",
        "locale": "en",
        "save_image": true,
        "style": "1",
        "symbol": "${tvSymbol}",
        "theme": "dark",
        "timezone": "Etc/UTC",
        "backgroundColor": "#050816",
        "gridColor": "rgba(255, 255, 255, 0.05)",
        "watchlist": [],
        "withdateranges": true,
        "compareSymbols": [],
        "show_popup_button": true,
        "popup_height": "650",
        "popup_width": "1000",
        "studies": [],
        "autosize": true
      }`;

    container.current.appendChild(script);

    // Cleanup script on unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [address, symbol]); // re-run when address or symbol changes

  if (!address) return null;

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%" }}
    />
  );
};

export default memo(TradingViewWidget);
