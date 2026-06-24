import React from "react";

const TradingDashboard = () => {
  return (
    <section className="flex-1 w-full max-w-full mx-auto p-4 grid grid-cols-1 lg:grid-cols-[20%_1fr_25%] gap-4">
      {/* Left Column: Sidebar */}
      <div className="hidden lg:flex flex-col gap-4">
        <div className="bg-white/5 border  rounded-md p-4 flex-1 min-h-150 flex items-center justify-center text-muted-foreground font-medium">
          Sidebar Placeholder
        </div>
      </div>

      {/* Center Column: Trading View & Order History */}
      <div className="flex flex-col gap-4">
        {/* Trading View (Top) */}
        <div className="bg-white/5 border  rounded-md p-4 min-h-125 flex items-center justify-center text-muted-foreground font-medium">
          Trading View Component Placeholder
        </div>

        {/* Order History (Bottom) */}
        <div className="bg-white/5 border  rounded-md p-4 min-h-76 flex items-center justify-center text-muted-foreground font-medium">
          Order History Component Placeholder
        </div>
      </div>

      {/* Right Column: Trading Order Panel */}
      <div className="flex flex-col gap-4">
        <div className="bg-white/5 border  rounded-md p-4 flex-1 min-h-150 flex items-center justify-center text-muted-foreground font-medium">
          Trading Order Panel Placeholder
        </div>
      </div>
    </section>
  );
};

export default TradingDashboard;
