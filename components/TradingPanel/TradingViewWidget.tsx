"use client";

import React, { useEffect, useRef } from "react";

let tvScriptLoadingPromise: Promise<void> | undefined;

interface TradingViewWidgetConfig {
  container_id: string;
  autosize: boolean;
  symbol: string;
  interval: string;
  timezone: string;
  theme: "dark" | "light";
  style: string;
  locale: string;
  toolbar_bg: string;
  enable_publishing: boolean;
  allow_symbol_change: boolean;
  drawings_access: {
    type: string;
    tools: Array<{ name: string }>;
  };
  hide_side_toolbar: boolean;
  withdateranges: boolean;
}

interface TradingViewWidgetInstance {
  remove?: () => void;
}

interface TradingViewNamespace {
  widget: new (config: TradingViewWidgetConfig) => TradingViewWidgetInstance;
}

declare global {
  interface Window {
    TradingView?: TradingViewNamespace;
  }
}

interface TradingViewWidgetProps {
  symbol: string;
  resolution: string;
}

function getCurrentTimezoneName() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timeZone;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  symbol,
  resolution,
}) => {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const widgetRef = useRef<TradingViewWidgetInstance | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = () => resolve();

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current(),
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      const TradingViewWidgetCtor = window.TradingView?.widget;
      if (!document.getElementById("tradingview") || !TradingViewWidgetCtor) {
        return;
      }

      // Remove the existing widget if it exists
      if (widgetRef.current) {
        widgetRef.current.remove?.();
        widgetRef.current = null;
      }

      widgetRef.current = new TradingViewWidgetCtor({
        container_id: "tradingview",
        autosize: true,
        symbol: `PYTH:${symbol}`,
        interval: resolution,
        timezone: getCurrentTimezoneName(),
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#050816",
        enable_publishing: false,
        allow_symbol_change: true,
        drawings_access: { type: "all", tools: [{ name: "Regression Trend" }] }, // Optional: specific tools
        hide_side_toolbar: false, // Shows the left drawing toolbar
        withdateranges: true, // Shows the bottom range selector (1D, 5D, 1M, etc.)
      });
    }
  }, [symbol, resolution]);

  return <div id="tradingview" className="w-full h-full" />;
};

export default TradingViewWidget;
