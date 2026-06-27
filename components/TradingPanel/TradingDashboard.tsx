"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TokenSidebar from "./TokenSidebar";
import TradingViewWidget from "./TradingViewWidget";
import TradingOrderPanel from "./TradingOrderPanel";
import TradingHistoryPanel from "./TradingHistoryPanel";
import TradingHeader from "./TradingHeader";
import AboutTokenPanel from "./AboutTokenPanel";

const TradingDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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
    const logoURI = searchParams.get("logoURI");

    if (token && symbol) {
      setSelectedToken((prev) => {
        // Prevent overwriting if it's the same token, to preserve the real logo
        if (prev.address === token) return prev;
        return {
          address: token,
          symbol: symbol,
          logoURI: logoURI || undefined,
        };
      });
    }
  }, [searchParams]);

  const handleSelectToken = (token: {
    address: string;
    symbol: string;
    logoURI?: string;
  }) => {
    setSelectedToken(token);

    const params = new URLSearchParams();
    params.set("token", token.address);
    params.set("symbol", token.symbol);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="flex-1 w-full mx-auto p-2 md:p-4 flex flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)_280px] xl:grid-cols-[310px_minmax(0,1fr)_390px] gap-2 lg:overflow-hidden min-h-0">
      {/* Left Column: Sidebar */}
      <div className="h-[450px] lg:h-full min-h-0 min-w-0 flex flex-col overflow-hidden shrink-0 lg:shrink">
        <TokenSidebar onSelectToken={handleSelectToken} />
      </div>

      {/* Center Column: Header, Trading View & Order History */}
      <div className="flex flex-col gap-2 lg:h-full min-h-0 min-w-0 overflow-hidden shrink-0 lg:shrink">
        {/* Trading Header (Top) */}
        <div className="min-h-0 shrink-0">
          <TradingHeader
            address={selectedToken.address}
            symbol={selectedToken.symbol}
            logoURI={selectedToken.logoURI}
          />
        </div>

        {/* Trading View Chart (Middle) */}
        <div className=" border  rounded-md h-[500px] lg:h-[65%] min-h-0 min-w-0 w-full overflow-hidden flex flex-col z-10 shrink-0 lg:shrink">
          <TradingViewWidget
            address={selectedToken.address}
            symbol={selectedToken.symbol}
          />
        </div>

        {/* Order History (Bottom) */}
        <div className="h-[400px] lg:h-[35%] min-h-0 min-w-0 w-full rounded-md overflow-hidden flex flex-col z-10 shrink-0 lg:shrink">
          <TradingHistoryPanel />
        </div>
      </div>

      {/* Right Column: Trading Order Panel & About Token */}
      <div className="h-auto lg:h-full min-h-0 min-w-0 flex flex-col overflow-y-auto custom-scrollbar z-20 shrink-0 lg:shrink pb-4 pr-1">
        <TradingOrderPanel
          symbol={selectedToken.symbol}
          address={selectedToken.address}
          logoURI={selectedToken.logoURI}
        />
        <AboutTokenPanel
          symbol={selectedToken.symbol}
          address={selectedToken.address}
        />
      </div>
    </section>
  );
};

export default TradingDashboard;
