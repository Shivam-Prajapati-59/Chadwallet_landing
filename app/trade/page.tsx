import TradingDashboard from "@/components/TradingPanel/TradingDashboard";
import TradingFooter from "@/components/TradingPanel/TradingFooter";

const page = () => {
  return (
    // Replaced hardcoded h-[850px] with h-full.
    // Added overflow-y-auto for mobile scrolling, and lg:overflow-hidden to lock desktop.
    <div className="h-full w-full bg-[#16161552] flex flex-col overflow-y-auto lg:overflow-hidden">
      <TradingDashboard />
      <TradingFooter />
    </div>
  );
};

export default page;
