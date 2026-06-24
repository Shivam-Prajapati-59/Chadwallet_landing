"use client";

import React, { useState } from "react";
import TokenSidebar from "./TokenSidebar";
import TradingViewWidget from "./TradingViewWidget";
import TradingOrderPanel from "./TradingOrderPanel";
import TradingHistoryPanel from "./TradingHistoryPanel";

const TradingDashboard = () => {
  // Default to Wrapped SOL
  const [selectedToken, setSelectedToken] = useState<{
    address: string;
    symbol: string;
    logoURI?: string;
  }>({
    address: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    logoURI:
      "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
  });

  return (
    <section className="h-full w-full max-w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-[20%_1fr_25%] gap-2">
      {/* Left Column: Sidebar */}
      <div className="h-full min-h-0">
        <TokenSidebar onSelectToken={(token) => setSelectedToken(token)} />
      </div>

      {/* Center Column: Trading View & Order History */}
      <div className="grid grid-rows-7 gap-2 h-full min-h-0">
        {/* Trading View (Top) */}
        <div className="bg-[#050816]/50 border rounded-md row-span-5 min-h-0 relative overflow-hidden">
          <TradingViewWidget address={selectedToken.address} />
        </div>

        {/* Order History (Bottom) */}
        <div className="row-span-2 min-h-0 rounded-md overflow-hidden">
          <TradingHistoryPanel />
        </div>
      </div>

      {/* Right Column: Trading Order Panel */}
      <TradingOrderPanel
        symbol={selectedToken.symbol}
        address={selectedToken.address}
        logoURI={selectedToken.logoURI}
      />
    </section>
  );
};

export default TradingDashboard;
