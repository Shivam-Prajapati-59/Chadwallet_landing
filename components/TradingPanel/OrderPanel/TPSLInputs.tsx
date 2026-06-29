import React from "react";

interface TPSLInputsProps {
  tpPrice: string;
  setTpPrice: (val: string) => void;
  slPrice: string;
  setSlPrice: (val: string) => void;
}

const TPSLInputs: React.FC<TPSLInputsProps> = ({ tpPrice, setTpPrice, slPrice, setSlPrice }) => {
  return (
    <div className="flex gap-2 px-1">
      <div className="flex-1 flex flex-col space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <span className="text-[#14F195]/70">Take Profit (USDC)</span>
        </div>
        <div className="flex items-center bg-[#0a0d16] p-3 rounded-xl border border-[#14F195]/20">
          <span className="text-[#14F195]/50 mr-1">$</span>
          <input
            type="number"
            value={tpPrice}
            onChange={(e) => setTpPrice(e.target.value)}
            placeholder="0.00"
            className="bg-transparent text-sm border-none outline-none w-full text-white/90 placeholder:text-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <span className="text-chart-red/70">Stop Loss (USDC)</span>
        </div>
        <div className="flex items-center bg-[#0a0d16] p-3 rounded-xl border border-chart-red/20">
          <span className="text-chart-red/50 mr-1">$</span>
          <input
            type="number"
            value={slPrice}
            onChange={(e) => setSlPrice(e.target.value)}
            placeholder="0.00"
            className="bg-transparent text-sm border-none outline-none w-full text-white/90 placeholder:text-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
};

export default TPSLInputs;
