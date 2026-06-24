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
  symbol,
  logoURI,
  amount,
  setAmount,
}) => {
  return (
    <div className="flex flex-col space-y-3 bg-[#0a0d16] p-4 rounded-xl border border-white/10">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-3xl font-medium text-white/40">
          <div className="flex items-center gap-2 mr-2">
            <img
              src={
                side === "buy"
                  ? USDC_LOGO
                  : logoURI ||
                    `https://ui-avatars.com/api/?name=${symbol}&background=random&size=32`
              }
              alt={side === "buy" ? "USDC" : symbol}
              className="w-12 h-9 rounded-full"
            />
          </div>
          {side === "buy" && <span>$</span>}
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="bg-transparent border-none outline-none w-full text-white/90 placeholder:text-white/40 ml-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <span className="text-md font-medium text-white/30 whitespace-nowrap">
          Enter amount
        </span>
      </div>

      {/* Quick amounts */}
      <div className="flex gap-2 items-center pt-2">
        {[10, 100, 500, 1000].map((val) => (
          <Button
            key={val}
            variant="outline"
            onClick={() => setAmount(val.toString())}
            className="flex-1 h-8 bg-transparent border-white/10 hover:bg-white/10 text-xs font-semibold text-white/70"
          >
            ${val}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0 bg-transparent border-white/10 hover:bg-white/10 text-white/70"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default OrderInputSection;
