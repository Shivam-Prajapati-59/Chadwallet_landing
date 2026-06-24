import React from "react";
import TokenSidebar from "./TokenSidebar";
import TradingViewWidget from "./TradingViewWidget";

const TradingDashboard = () => {
  return (
    <section className="h-full w-full max-w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-[20%_1fr_25%] gap-2">
      {/* Left Column: Sidebar */}
      <div className="h-full min-h-0">
        <TokenSidebar />
      </div>

      {/* Center Column: Trading View & Order History */}
      <div className="grid grid-rows-7 gap-2 h-full min-h-0">
        {/* Trading View (Top) */}
        <div className="bg-[#050816]/50 border rounded-md row-span-5 min-h-0 relative overflow-hidden">
          <TradingViewWidget symbol="SOLUSD" resolution="60" />
        </div>

        {/* Order History (Bottom) */}
        <div className="bg-white/5 border rounded-md row-span-2 min-h-0 flex items-center justify-center text-muted-foreground font-medium">
          Order History Component Placeholder
        </div>
      </div>

      {/* Right Column: Trading Order Panel */}
      <div className="flex flex-col gap-4 h-full min-h-0">
        <div className="bg-white/5 border rounded-md p-4 h-full min-h-0 flex items-center justify-center text-muted-foreground font-medium">
          Trading Order Panel Placeholder
        </div>
      </div>
    </section>
  );
};

export default TradingDashboard;
