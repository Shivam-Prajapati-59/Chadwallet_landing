"use client";

import React from "react";

interface TradingViewWidgetProps {
  address: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ address }) => {
  return (
    <iframe
      src={`https://embed.birdeye.so/tv-widget/${address}?chain=solana`}
      className="w-full h-full border-none"
      title="Birdeye Chart"
      allow="clipboard-write"
    />
  );
};

export default TradingViewWidget;
