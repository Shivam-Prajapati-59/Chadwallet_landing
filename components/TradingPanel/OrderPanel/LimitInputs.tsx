import React from "react";

interface LimitInputsProps {
  limitPrice: string;
  setLimitPrice: (val: string) => void;
  marketRate: number;
}

const LimitInputs: React.FC<LimitInputsProps> = ({
  limitPrice,
  setLimitPrice,
  marketRate,
}) => {
  return (
    <div className="flex flex-col space-y-2 px-1">
      <div className="flex justify-between text-xs text-white/50">
        <span>Limit Price (USDC)</span>
        {marketRate > 0 && <span>Market: ${marketRate.toFixed(4)}</span>}
      </div>
      <div className="flex items-center  p-3 rounded-xl border">
        <span className="text-white/40 mr-2">$</span>
        <input
          type="number"
          value={limitPrice}
          onChange={(e) => setLimitPrice(e.target.value)}
          placeholder="0.00"
          className="bg-transparent border-none outline-none w-full text-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
    </div>
  );
};

export default LimitInputs;
