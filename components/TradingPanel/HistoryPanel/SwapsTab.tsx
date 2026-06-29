import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { dummySwaps } from "./data";

const SwapsTab = () => {
  return (
    <div className="w-full text-[14px] text-[#474B52]">
      {/* Table Header Group */}
      <div className="sticky top-0 z-10 bg-[#060510]">
        <div className="grid grid-cols-[1fr_80px_100px_100px_60px] font-medium py-1.5 px-4 text-[12px] text-muted-foreground items-center">
          <span>Trader</span>
          <span>Action</span>
          <span>Amount</span>
          <span>Price</span>
          <span className="text-right">Time</span>
        </div>
        <Separator />
      </div>
      {/* Table Rows */}
      <div className="flex flex-col">
        {dummySwaps.map((swap, idx) => (
          <div
            key={idx}
            className="grid grid-cols-[1fr_80px_100px_100px_60px] py-2 hover:bg-white/2 transition-colors px-4 items-center"
          >
            {/* Trader */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <Image
                src={swap.avatar}
                alt={swap.username}
                width={28}
                height={28}
                className="rounded-full shrink-0"
                unoptimized
              />
              <span className="font-semibold text-white/90 truncate text-[14px]">
                {swap.username}
              </span>
            </div>

            {/* Action */}
            <div className="flex items-center min-w-0 pr-2">
              <span
                className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                  swap.action === "Sell"
                    ? "bg-chart-red/20 text-chart-red"
                    : "bg-chart-green/20 text-chart-green"
                }`}
              >
                {swap.action}
              </span>
            </div>

            {/* Amount */}
            <div className="flex items-center min-w-0 pr-2">
              <span className="font-semibold text-white/90 text-[14px]">
                {swap.amount}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center min-w-0 pr-2">
              <span className="font-semibold text-white/90 text-[14px]">
                {swap.price}
              </span>
            </div>

            {/* Time */}
            <div className="flex items-center justify-end min-w-0">
              <span className="text-[12px] text-[#9899A3]">
                {swap.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SwapsTab;
