"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { Clock, Heart, Reply } from "lucide-react";
import { Separator } from "../ui/separator";
import { SolanaIcon } from "../icons/TokenIcons";

const dummyHolders = [
  {
    username: "BTCFORLIFE",
    avgHold: "1d 20h avg. hold",
    positionValue: "$154,762.95",
    positionTokens: "2.1K SOL",
    pnlValue: "- $28,330.29",
    pnlPercent: "2.85%",
    isPnlPositive: false,
    avgEntryPrice: "$73.60",
    avgEntryMc: "$41.8B MC",
    thesis: "—",
    thesisLikes: 0,
    avatar: "https://i.pravatar.cc/150?u=BTCFORLIFE",
  },
  {
    username: "jpegxbt",
    avgHold: "12h 37m avg. hold",
    positionValue: "$72,829.62",
    positionTokens: "1K SOL",
    pnlValue: "- $37,006.64",
    pnlPercent: "30.95%",
    isPnlPositive: false,
    avgEntryPrice: "$108.94",
    avgEntryMc: "$61.9B MC",
    thesis: "big kols tweeting soon",
    thesisLikes: 16,
    avatar: "https://i.pravatar.cc/150?u=jpegxbt",
  },
  {
    username: "MereNovelQuokka",
    avgHold: "No hold time",
    positionValue: "$51,035.82",
    positionTokens: "701.80 SOL",
    pnlValue: "- $90,124.81",
    pnlPercent: "63.85%",
    isPnlPositive: false,
    avgEntryPrice: "$201.14",
    avgEntryMc: "$114.3B MC",
    thesis: "—",
    thesisLikes: 0,
    avatar: "https://i.pravatar.cc/150?u=MereNovelQuokka",
  },
  {
    username: "SolanaWhale",
    avgHold: "3d 4h avg. hold",
    positionValue: "$340,192.00",
    positionTokens: "4.5K SOL",
    pnlValue: "+ $45,210.50",
    pnlPercent: "15.32%",
    isPnlPositive: true,
    avgEntryPrice: "$65.20",
    avgEntryMc: "$38.1B MC",
    thesis: "accumulation zone before breakout",
    thesisLikes: 42,
    avatar: "https://i.pravatar.cc/150?u=SolanaWhale",
  },
  {
    username: "CryptoNinja",
    avgHold: "5h 12m avg. hold",
    positionValue: "$12,450.00",
    positionTokens: "150 SOL",
    pnlValue: "+ $1,240.00",
    pnlPercent: "11.05%",
    isPnlPositive: true,
    avgEntryPrice: "$74.10",
    avgEntryMc: "$42.1B MC",
    thesis: "—",
    thesisLikes: 0,
    avatar: "https://i.pravatar.cc/150?u=CryptoNinja",
  },
  {
    username: "DeFiDegen",
    avgHold: "1w 2d avg. hold",
    positionValue: "$85,230.15",
    positionTokens: "1.1K SOL",
    pnlValue: "- $12,500.00",
    pnlPercent: "12.80%",
    isPnlPositive: false,
    avgEntryPrice: "$89.50",
    avgEntryMc: "$50.8B MC",
    thesis: "long term hold, ignoring short term noise",
    thesisLikes: 105,
    avatar: "https://i.pravatar.cc/150?u=DeFiDegen",
  },
  {
    username: "ApexTrader",
    avgHold: "45m avg. hold",
    positionValue: "$5,120.00",
    positionTokens: "70 SOL",
    pnlValue: "- $450.00",
    pnlPercent: "8.07%",
    isPnlPositive: false,
    avgEntryPrice: "$79.60",
    avgEntryMc: "$45.2B MC",
    thesis: "—",
    thesisLikes: 0,
    avatar: "https://i.pravatar.cc/150?u=ApexTrader",
  },
  {
    username: "MoonWalker",
    avgHold: "2d 15h avg. hold",
    positionValue: "$215,800.50",
    positionTokens: "2.8K SOL",
    pnlValue: "+ $68,900.20",
    pnlPercent: "46.90%",
    isPnlPositive: true,
    avgEntryPrice: "$52.40",
    avgEntryMc: "$29.8B MC",
    thesis: "ecosystem growth is accelerating",
    thesisLikes: 210,
    avatar: "https://i.pravatar.cc/150?u=MoonWalker",
  },
  {
    username: "SwingKing",
    avgHold: "1d 2h avg. hold",
    positionValue: "$45,670.80",
    positionTokens: "610 SOL",
    pnlValue: "+ $4,120.50",
    pnlPercent: "9.91%",
    isPnlPositive: true,
    avgEntryPrice: "$68.10",
    avgEntryMc: "$38.7B MC",
    thesis: "—",
    thesisLikes: 0,
    avatar: "https://i.pravatar.cc/150?u=SwingKing",
  },
];

const dummySwaps = [
  {
    username: "yessire",
    action: "Sell",
    amount: "$190.89",
    price: "$72.25",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?u=yessire",
  },
  {
    username: "mothers",
    action: "Sell",
    amount: "$2.86",
    price: "$72.31",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?u=mothers",
  },
  {
    username: "michual",
    action: "Sell",
    amount: "$5.10",
    price: "$72.33",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?u=michual",
  },
  {
    username: "PhantomCap",
    action: "Sell",
    amount: "$2.03",
    price: "$72.30",
    time: "2h",
    avatar: "https://i.pravatar.cc/150?u=PhantomCap",
  },
  {
    username: "DegenTrader",
    action: "Buy",
    amount: "$1,450.00",
    price: "$71.80",
    time: "3h",
    avatar: "https://i.pravatar.cc/150?u=DegenTrader",
  },
  {
    username: "SolanaWhale",
    action: "Buy",
    amount: "$50,200.00",
    price: "$71.50",
    time: "4h",
    avatar: "https://i.pravatar.cc/150?u=SolanaWhale",
  },
];

const dummyThesis = [
  {
    username: "blqsqr",
    avatar: "https://i.pravatar.cc/150?u=blqsqr",
    time: "6h",
    tokenAmount: "$8.25",
    pnl: "+$0.91",
    isPnlPositive: true,
    text: "solana is home and I'm prepared for a solana summer the same as in Paris 2026",
    likes: 0,
    older: 4,
  },
  {
    username: "CPTPrice",
    avatar: "https://i.pravatar.cc/150?u=CPTPrice",
    time: "11h",
    tokenAmount: "$67,017.68",
    pnl: "+$2,033.85",
    isPnlPositive: true,
    text: "$sol is still the home for memes, onboarding millions, but that's just the start. perps, defi, consumer apps, rwas, tokenized assets, and better tokenomics make $600+ this cycle. builders never stop..",
    likes: 1,
    older: 16,
  },
];

const TradingHistoryPanel = () => {
  const [thesisOnly, setThesisOnly] = useState(false);
  const [friendsOnly, setFriendsOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("holders");

  return (
    <div className="flex flex-col h-full w-full border border-white/10 rounded-xl text-md bg-[#16161552]">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col w-full h-full"
      >
        {/* Header Tabs & Filters */}
        <div className="flex items-center justify-between pr-4 bg-[#12111A]">
          <TabsList className="w-fit justify-start rounded-none bg-transparent gap-6 px-4 h-12 items-center">
            <TabsTrigger
              value="holders"
              className="rounded-none border-none bg-transparent! hover:bg-transparent! p-0 text-muted-foreground hover:text-white data-[state=active]:text-white data-[state=active]:shadow-none font-bold text-[14px] data-active:bg-transparent! dark:data-active:bg-transparent!"
            >
              Holders
            </TabsTrigger>
            <TabsTrigger
              value="swaps"
              className="rounded-none border-none bg-transparent! hover:bg-transparent! p-0 text-muted-foreground hover:text-white data-[state=active]:text-white data-[state=active]:shadow-none font-bold text-[14px] data-active:bg-transparent! dark:data-active:bg-transparent!"
            >
              Swaps
            </TabsTrigger>
            <TabsTrigger
              value="thesis"
              className="rounded-none border-none bg-transparent! hover:bg-transparent! p-0 text-muted-foreground hover:text-white data-[state=active]:text-white data-[state=active]:shadow-none font-bold text-[14px] data-active:bg-transparent! dark:data-active:bg-transparent!"
            >
              Thesis (651)
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {activeTab === "holders" && (
              <>
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
              </>
            )}
            {(activeTab === "swaps" || activeTab === "thesis") && (
              <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-muted-foreground"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                Min size
              </div>
            )}
          </div>
        </div>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <TabsContent value="holders" className="mt-0 h-full flex flex-col">
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
                        className={`font-semibold text-[14px] ${holder.isPnlPositive ? "text-chart-green" : "text-[#ff5c00]"}`}
                      >
                        {holder.pnlValue}
                      </span>
                      <span
                        className={`text-[11px] mt-0.5 ${holder.isPnlPositive ? "text-chart-green" : "text-[#ff5c00]"}`}
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
          </TabsContent>

          <TabsContent value="swaps" className="mt-0 h-full flex flex-col">
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
                            ? "bg-[#ff5c00]/20 text-[#ff5c00]"
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
          </TabsContent>

          <TabsContent value="thesis" className="mt-0 h-full flex flex-col">
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
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TradingHistoryPanel;
