import React from "react";
import { Card } from "@/components/ui/card";

const PositionsPanel = () => {
  return (
    <Card className="bg-[#060510] flex flex-col shrink-0 border border-white/10 rounded-xl mt-2 p-4 min-h-[160px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[15px] font-bold text-white">Your positions</h3>
        
        <div className="flex items-center bg-[#0d0c12] border border-white/5 rounded-lg p-0.5">
          <button className="flex items-center gap-1.5 px-3 py-1 bg-[#1a1c2e] rounded-md text-[11px] font-bold text-[#4D65F3]">
            Open <span className="w-1.5 h-1.5 rounded-full bg-[#4D65F3]"></span>
          </button>
          <button className="px-3 py-1 text-[11px] font-bold text-white/30 hover:text-white/50 transition-colors">
            Closed
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <span className="text-[14px] font-semibold text-white/20">No open positions</span>
      </div>
    </Card>
  );
};

export default PositionsPanel;
