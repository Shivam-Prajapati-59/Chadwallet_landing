"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HoldersTab from "./HistoryPanel/HoldersTab";
import SwapsTab from "./HistoryPanel/SwapsTab";
import ThesisTab from "./HistoryPanel/ThesisTab";

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
            <HoldersTab />
          </TabsContent>

          <TabsContent value="swaps" className="mt-0 h-full flex flex-col">
            <SwapsTab />
          </TabsContent>

          <TabsContent value="thesis" className="mt-0 h-full flex flex-col">
            <ThesisTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TradingHistoryPanel;
