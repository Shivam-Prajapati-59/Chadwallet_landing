"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Clock } from "lucide-react";

const dummyHolders = [
  {
    username: "kersonsol",
    avgHold: "20h 1m avg. hold",
    positionValue: "$685.19",
    positionTokens: "3K JUP",
    pnlValue: "+$185.62",
    pnlPercent: "37.16%",
    avgEntryMc: "$543.6M MC",
    avgEntryPrice: "$0.164",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=kersonsol",
  },
  {
    username: "greenisgr",
    avgHold: "19h 44m avg. hold",
    positionValue: "$603.10",
    positionTokens: "2.6K JUP",
    pnlValue: "+$78.58",
    pnlPercent: "13.52%",
    avgEntryMc: "$646.7M MC",
    avgEntryPrice: "$0.195",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=greenisgr",
  },
  {
    username: "auramaxxer",
    avgHold: "1d 16h avg. hold",
    positionValue: "$374.15",
    positionTokens: "1.6K JUP",
    pnlValue: "+$124.26",
    pnlPercent: "49.73%",
    avgEntryMc: "$498M MC",
    avgEntryPrice: "$0.150",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=auramaxxer",
  },
  {
    username: "camel",
    avgHold: "1d 8h avg. hold",
    positionValue: "$291.30",
    positionTokens: "1.2K JUP",
    pnlValue: "+$41.88",
    pnlPercent: "16.79%",
    avgEntryMc: "$638.4M MC",
    avgEntryPrice: "$0.192",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=camel",
  },
  {
    username: "RedCallperRisk",
    avgHold: "12m avg. hold",
    positionValue: "$244.16",
    positionTokens: "1K JUP",
    pnlValue: "+$0.11",
    pnlPercent: "0.05%",
    avgEntryMc: "$745.3M MC",
    avgEntryPrice: "$0.224",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=RedCallperRisk",
  },
  {
    username: "cryptosamoyed_",
    avgHold: "4d 13h avg. hold",
    positionValue: "$237.65",
    positionTokens: "1K JUP",
    pnlValue: "+$40.84",
    pnlPercent: "17.32%",
    avgEntryMc: "$622M MC",
    avgEntryPrice: "$0.187",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=Crypto",
  },
  {
    username: "wymgangihavenoidea",
    avgHold: "4d 2h avg. hold",
    positionValue: "$224.57",
    positionTokens: "1K JUP",
    pnlValue: "+$68.50",
    pnlPercent: "43.55%",
    avgEntryMc: "$518.2M MC",
    avgEntryPrice: "$0.156",
    thesis: "—",
    avatar: "https://i.pravatar.cc/150?u=Wymgang",
  },
];

const TradingHistoryPanel = () => {
  const [thesisOnly, setThesisOnly] = useState(false);
  const [friendsOnly, setFriendsOnly] = useState(false);

  return (
    <div className="flex flex-col h-full w-full  border rounded-md text-md">
      <Tabs defaultValue="holders" className="flex flex-col w-full h-full">
        {/* Header Tabs & Filters */}
        <div className="flex items-center justify-between border-b border-white/10 pr-4">
          <TabsList className="w-fit justify-start rounded-none bg-transparent gap-2 px-4 h-14 items-center">
            <TabsTrigger
              value="holders"
              className="rounded-sm border border-transparent data-[state=active]:border-white/10 data-[state=active]:bg-white/5 px-3 py-1.5 text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none transition-none font-semibold text-sm"
            >
              Holders
            </TabsTrigger>
            <TabsTrigger
              value="swaps"
              className="rounded-sm border border-transparent data-[state=active]:border-white/10 data-[state=active]:bg-white/5 px-3 py-1.5 text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none transition-none font-semibold text-sm"
            >
              Swaps
            </TabsTrigger>
            <TabsTrigger
              value="thesis"
              className="rounded-sm border border-transparent data-[state=active]:border-white/10 data-[state=active]:bg-white/5 px-3 py-1.5 text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none transition-none font-semibold text-sm"
            >
              Thesis (3)
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={thesisOnly}
                onChange={(e) => setThesisOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded-sm border-white/20 bg-transparent checked:bg-blue-500 checked:border-blue-500 focus:ring-0 focus:ring-offset-0 accent-blue-500"
              />
              Thesis only
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <input
                type="checkbox"
                checked={friendsOnly}
                onChange={(e) => setFriendsOnly(e.target.checked)}
                className="w-3.5 h-3.5 rounded-sm border-white/20 bg-transparent checked:bg-blue-500 checked:border-blue-500 focus:ring-0 focus:ring-offset-0 accent-blue-500"
              />
              Friends only
            </label>
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <TabsContent value="holders" className="mt-0 h-full flex flex-col">
            <div className="w-full text-xs text-white/50">
              {/* Table Header */}
              <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] font-medium py-3 border-b border-white/5 px-4 sticky top-0 bg-[#0b0e14] z-10">
                <span>Trader</span>
                <span>Position</span>
                <span>PnL</span>
                <span>Avg. entry</span>
                <span>Thesis</span>
              </div>

              {/* Table Rows */}
              <div className="flex flex-col">
                {dummyHolders.map((holder, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[2fr_1.5fr_1.5fr_1.5fr_1fr] py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors px-4 items-center"
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
                        <span className="font-semibold text-white/90 truncate">
                          {holder.username}
                        </span>
                        <div className="flex items-center gap-1 mt-0.5 text-[10px] text-white/40">
                          <Clock className="w-3 h-3" />
                          <span className="truncate">{holder.avgHold}</span>
                        </div>
                      </div>
                    </div>

                    {/* Position */}
                    <div className="flex flex-col min-w-0 pr-2 justify-center">
                      <span className="font-semibold text-white/90">
                        {holder.positionValue}
                      </span>
                      <span className="text-[10px] text-white/40 mt-0.5">
                        {holder.positionTokens}
                      </span>
                    </div>

                    {/* PnL */}
                    <div className="flex flex-col min-w-0 pr-2 justify-center">
                      <span className="font-medium text-[#00c950]">
                        {holder.pnlValue}
                      </span>
                      <span className="text-[10px] text-[#00c950] mt-0.5">
                        ▲ {holder.pnlPercent}
                      </span>
                    </div>

                    {/* Avg. entry */}
                    <div className="flex flex-col min-w-0 pr-2 justify-center">
                      <span className="font-semibold text-white/90">
                        {holder.avgEntryMc}
                      </span>
                      <span className="text-[10px] text-white/40 mt-0.5">
                        {holder.avgEntryPrice}
                      </span>
                    </div>

                    {/* Thesis */}
                    <div className="flex items-center justify-start text-white/20">
                      {holder.thesis}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="swaps"
            className="mt-0 h-full p-4 flex items-center justify-center text-white/40 text-sm"
          >
            No swaps history available
          </TabsContent>

          <TabsContent
            value="thesis"
            className="mt-0 h-full p-4 flex items-center justify-center text-white/40 text-sm"
          >
            No thesis list available
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TradingHistoryPanel;
