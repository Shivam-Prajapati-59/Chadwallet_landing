"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TokenSidebar from "./TokenSidebar";
import TradingViewWidget from "./TradingViewWidget";
import TradingOrderPanel from "./TradingOrderPanel";
import TradingHistoryPanel from "./TradingHistoryPanel";

const TradingDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

  useEffect(() => {
    const token = searchParams.get("token");
    const symbol = searchParams.get("symbol");
    if (token && symbol) {
      setSelectedToken({
        address: token,
        symbol: symbol,
        logoURI: `https://ui-avatars.com/api/?name=${symbol}&background=random&size=32`,
      });
    }
  }, [searchParams]);

  const handleSelectToken = (token: { address: string; symbol: string; logoURI?: string }) => {
    setSelectedToken(token);
    // Sync the URL with the newly selected token
    router.replace(`${pathname}?token=${token.address}&symbol=${token.symbol}`, { scroll: false });
  };

  return (
    <section className="h-full w-full max-w-full mx-auto p-4 flex flex-col lg:grid lg:grid-cols-[20%_1fr_25%] gap-2 lg:overflow-hidden">
      {/* Left Column: Sidebar */}
      <div className="h-[500px] lg:h-full min-h-0 shrink-0">
        <TokenSidebar onSelectToken={handleSelectToken} />
      </div>

      {/* Center Column: Trading View & Order History */}
      <div className="flex flex-col lg:grid lg:grid-rows-7 gap-2 lg:h-full min-h-0 shrink-0">
        {/* Trading View (Top) */}
        <div className="bg-[#050816]/50 border rounded-md h-[400px] lg:h-auto lg:row-span-5 min-h-0 relative overflow-hidden shrink-0">
          <TradingViewWidget address={selectedToken.address} />
        </div>

        {/* Order History (Bottom) */}
        <div className="h-[400px] lg:h-auto lg:row-span-2 min-h-0 rounded-md overflow-hidden shrink-0">
          <TradingHistoryPanel />
        </div>
      </div>

      {/* Right Column: Trading Order Panel */}
      <div className="min-h-[600px] lg:min-h-0 lg:h-full shrink-0">
        <TradingOrderPanel
          symbol={selectedToken.symbol}
          address={selectedToken.address}
          logoURI={selectedToken.logoURI}
        />
      </div>
    </section>
  );
};

export default TradingDashboard;
