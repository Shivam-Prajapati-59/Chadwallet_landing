import TradingDashboard from "@/components/TradingPanel/TradingDashboard";

const page = () => {
  return (
    <div className="min-h-max lg:min-h-0 lg:h-[850px] w-full flex flex-col">
      <TradingDashboard />
    </div>
  );
};

export default page;
