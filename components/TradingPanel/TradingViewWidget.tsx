"use client";

import React, { memo } from "react";

interface TradingViewWidgetProps {
  address: string;
  symbol?: string;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({
  address,
  symbol,
}) => {
  if (!address) return null;

  return (
    <div className="w-full h-full min-h-[500px] rounded-md overflow-hidden bg-[#050816]">
      <iframe
        src={`https://birdeye.so/tv-widget/${address}?chain=solana&viewMode=pair&chartInterval=15&chartType=CANDLE&chartLeftToolbar=show&chartTopToolbar=show&theme=dark`}
        style={{ width: "100%", height: "100%", border: "none" }}
        title={`${symbol || "Token"} Chart`}
      />
    </div>
  );
};

export default memo(TradingViewWidget);
