import TradingDashboard from "@/components/TradingPanel/TradingDashboard";

const page = () => {
  return (
    // Replaced hardcoded h-[850px] with h-full.
    // Added overflow-y-auto for mobile scrolling, and lg:overflow-hidden to lock desktop.
    <div className="h-full w-full flex flex-col overflow-y-auto lg:overflow-hidden">
      <TradingDashboard />
    </div>
  );
};

export default page;
