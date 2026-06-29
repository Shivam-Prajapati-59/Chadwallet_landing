import React from "react";
import Image from "next/image";
import { Heart, Reply } from "lucide-react";
import { SolanaIcon } from "../../icons/TokenIcons";
import { dummyThesis } from "./data";

const ThesisTab = () => {
  return (
    <div className="flex flex-col w-full">
      {dummyThesis.map((thesis, idx) => (
        <div
          key={idx}
          className="flex gap-4 p-4"
        >
          {/* Left Column (Avatar + Line) */}
          <div className="flex flex-col items-center w-8 shrink-0 relative">
            <Image
              src={thesis.avatar}
              alt={thesis.username}
              width={32}
              height={32}
              className="rounded-full relative z-10"
              unoptimized
            />
            {/* The curved line pointing to the content */}
            <div className="absolute top-[32px] left-1/2 w-6 h-[22px] border-l-[1.5px] border-b-[1.5px] border-[#33353D] rounded-bl-xl"></div>
          </div>

          {/* Right Column (Content) */}
          <div className="flex flex-col flex-1 min-w-0">
            {/* Header: Username, Badge, Time */}
            <div className="flex justify-between items-center h-8 mb-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-[14px]">
                  {thesis.username}
                </span>
                <span className="bg-[#192147] text-[#4D65F3] text-[10px] font-bold px-1.5 py-0.5 rounded-sm">
                  Thesis
                </span>
              </div>
              <span className="text-[#474B52] text-[12px]">
                {thesis.time}
              </span>
            </div>

            {/* Indented Content Box */}
            <div className="pl-2">
              {/* Token Amount & PnL */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center">
                  <SolanaIcon />
                </div>
                <span className="font-bold text-white text-[13px]">
                  {thesis.tokenAmount}
                </span>
                <span className="text-chart-green text-[12px] font-medium">
                  ({thesis.pnl})
                </span>
              </div>

              {/* Thesis Text */}
              <div className="text-white/80 text-[13px] leading-relaxed mb-3 pr-4">
                {thesis.text}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center gap-4 text-[#474B52] text-[12px]">
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{thesis.likes}</span>
                </div>
                <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                  <Reply className="w-3.5 h-3.5" />
                  <span>{thesis.older} older</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThesisTab;
