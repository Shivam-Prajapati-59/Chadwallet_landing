import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { USDC_LOGO } from "../../../utils/constants";

interface OrderInputSectionProps {
  side: "buy" | "sell";
  symbol: string;
  logoURI?: string;
  amount: string;
  setAmount: (amount: string) => void;
}

const OrderInputSection: React.FC<OrderInputSectionProps> = ({
  side,
  amount,
  setAmount,
}) => {
  return (
    <div className="flex flex-col space-y-4 border-none">
      <div className="flex justify-between items-center px-4 py-6 bg-[#12111A] rounded-xl border border-white/5">
        <div className="flex items-center text-[32px] font-bold text-white/40 w-1/2">
          {side === "buy" && <span className="text-white/40 mr-1">$</span>}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="bg-transparent border-none outline-none w-full text-white/90 placeholder:text-white/40 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <span className="text-sm font-medium text-white/20 whitespace-nowrap">
          Enter amount
        </span>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2 items-center">
        {[10, 100, 500, 1000].map((val) => (
          <Button
            key={val}
            variant="ghost"
            onClick={() => setAmount(val.toString())}
            className="flex-1 h-9 bg-[#12111A] hover:bg-[#12111A]/80 text-[13px] font-bold text-white/70 rounded-lg transition-colors border border-white/5"
          >
            ${val}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Order Settings"
          className="h-9 w-9 shrink-0 bg-[#12111A] hover:bg-[#12111A]/80 text-white/50 rounded-lg transition-colors border border-white/5"
        >
          <Settings className="w-[16px] h-[16px]" />
        </Button>
      </div>
    </div>
  );
};

export default OrderInputSection;
