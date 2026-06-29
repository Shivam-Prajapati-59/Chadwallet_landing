import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { dummyHolders } from "./data";

const HoldersTab = () => {
  return (
    <div className="w-full text-[14px] text-[#474B52]">
      {/* Table Header Group */}
      <div className="sticky top-0 z-10 bg-[#060510]">
        <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr] font-medium py-1.5 px-4 text-[12px] text-muted-foreground items-center">
          <span>Trader</span>
          <span>Position</span>
          <span>PnL</span>
          <span>Avg. entry</span>
          <span>Thesis</span>
        </div>
        <Separator />
      </div>
      {/* Table Rows */}
      <div className="flex flex-col">
        {dummyHolders.map((holder, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1.5fr] py-2.5 hover:bg-white/2 transition-colors px-4 items-center"
          >
            {/* Trader */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <Image
                src={holder.avatar}
                alt={holder.username}
                width={32}
                height={32}
                className="rounded-full shrink-0"
                unoptimized
              />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-white/90 truncate text-[14px]">
                  {holder.username}
                </span>
                <div className="flex items-center gap-1 mt-0.5 text-[12px] text-[#9899A3]">
                  <Clock className="w-3 h-3" />
                  <span className="truncate">{holder.avgHold}</span>
                </div>
              </div>
            </div>

            {/* Position */}
            <div className="flex flex-col min-w-0 pr-2 justify-center">
              <span className="font-bold text-white/90 text-[14px]">
                {holder.positionValue}
              </span>
              <span className="text-[12px] text-[#9899A3] mt-0.5">
                {holder.positionTokens}
              </span>
            </div>

            {/* PnL */}
            <div className="flex flex-col min-w-0 pr-2 justify-center">
              <span
                className={`font-semibold text-[14px] ${holder.isPnlPositive ? "text-chart-green" : "text-chart-red"}`}
              >
                {holder.pnlValue}
              </span>
              <span
                className={`text-[11px] mt-0.5 ${holder.isPnlPositive ? "text-chart-green" : "text-chart-red"}`}
              >
                {holder.isPnlPositive ? "▲" : "▼"} {holder.pnlPercent}
              </span>
            </div>

            {/* Avg. entry */}
            <div className="flex flex-col min-w-0 pr-2 justify-center">
              <span className="font-bold text-white/90 text-[14px]">
                {holder.avgEntryPrice}
              </span>
              <span className="text-[12px] text-[#9899A3] mt-0.5">
                {holder.avgEntryMc}
              </span>
            </div>

            {/* Thesis */}
            <div className="flex items-center justify-start text-white/20 h-full">
              {holder.thesis !== "—" ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-center">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#9899A3]"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span className="text-[10px] text-[#9899A3] mt-1">
                      {holder.thesisLikes}
                    </span>
                  </div>
                  <span className="text-[13px] text-white/90">
                    {holder.thesis}
                  </span>
                </div>
              ) : (
                <span className="text-white/20">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HoldersTab;
