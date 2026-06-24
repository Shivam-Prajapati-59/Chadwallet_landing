"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import { Loader2, ArrowRightLeft, ArrowDownUp } from "lucide-react";

const fetchSolanaBalance = async (address: string) => {
  const response = await fetch("https://api.mainnet-beta.solana.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [address],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  // Convert Lamports to SOL
  return (data.result?.value || 0) / 1_000_000_000;
};

const TradingHistoryPanel = () => {
  const { authenticated, user } = usePrivy();
  const walletAddress = user?.wallet?.address;

  const {
    data: solBalance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["solBalance", walletAddress],
    queryFn: () => fetchSolanaBalance(walletAddress!),
    enabled: !!walletAddress && authenticated,
    refetchInterval: 30000, // Refetch every 30 seconds to keep balance live
  });

  return (
    <div className="flex flex-col h-full w-full">
      <Tabs defaultValue="history" className="flex flex-col w-full h-full">
        {/* Header Tabs */}
        <Tabs defaultValue="positions" className="w-full">
          {/* TAB HEADERS */}
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent">
            <TabsTrigger
              value="positions"
              className="rounded-md data-[state=active]:bg-accent"
            >
              Positions
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-md data-[state=active]:bg-accent"
            >
              Orders
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              className="rounded-md data-[state=active]:bg-accent"
            >
              Balance
            </TabsTrigger>
            <TabsTrigger
              value="tradeHistory"
              className="rounded-md data-[state=active]:bg-accent"
            >
              Swaps
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Tab Contents */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          <TabsContent value="history" className="mt-0 h-full flex flex-col">
            <div className="w-full text-sm text-white/60">
              <div className="grid grid-cols-4 font-semibold mb-3 pb-2 border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <span>Date</span>
                <span>Pair</span>
                <span>Type</span>
                <span className="text-right">Amount</span>
              </div>
              <div className="grid grid-cols-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-1 rounded-sm">
                <span>Today, 14:20</span>
                <span className="font-medium text-white">SOL / USDC</span>
                <span className="text-[#14F195] font-semibold">Buy</span>
                <span className="text-right font-mono text-white">10.50</span>
              </div>
              <div className="grid grid-cols-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-1 rounded-sm">
                <span>Yesterday</span>
                <span className="font-medium text-white">JUP / USDC</span>
                <span className="text-[#F14B14] font-semibold">Sell</span>
                <span className="text-right font-mono text-white">
                  1,500.00
                </span>
              </div>
              <div className="grid grid-cols-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors px-1 rounded-sm">
                <span>12 Jun, 09:15</span>
                <span className="font-medium text-white">WIF / SOL</span>
                <span className="text-[#14F195] font-semibold">Buy</span>
                <span className="text-right font-mono text-white">420.69</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="mt-0 h-full flex flex-col">
            <div className="w-full text-sm text-white/60">
              <div className="grid grid-cols-5 font-semibold mb-3 pb-2 border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                <span>Time</span>
                <span className="col-span-2">Action</span>
                <span>Status</span>
                <span className="text-right">Value</span>
              </div>
              <div className="grid grid-cols-5 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors px-1 rounded-sm">
                <span>10 mins ago</span>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="font-medium text-white">100 USDC</span>
                  <ArrowRightLeft className="w-3 h-3 text-white/40" />
                  <span className="font-medium text-[#14F195]">0.68 SOL</span>
                </div>
                <span className="text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-xs w-fit">
                  Success
                </span>
                <span className="text-right font-mono text-white">$100.00</span>
              </div>
              <div className="grid grid-cols-5 py-3 border-b border-white/5 items-center hover:bg-white/5 transition-colors px-1 rounded-sm">
                <span>1 hr ago</span>
                <div className="col-span-2 flex items-center gap-2">
                  <span className="font-medium text-white">5 SOL</span>
                  <ArrowRightLeft className="w-3 h-3 text-white/40" />
                  <span className="font-medium text-[#14F195]">800 USDC</span>
                </div>
                <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded text-xs w-fit">
                  Failed
                </span>
                <span className="text-right font-mono text-white">$800.00</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="balances" className="mt-0 h-full">
            {!authenticated ? (
              <div className="flex flex-col items-center justify-center h-full pt-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                  <ArrowDownUp className="w-6 h-6 text-white/40" />
                </div>
                <span className="text-sm font-medium text-white/50">
                  Please connect your wallet to view real-time balances.
                </span>
              </div>
            ) : (
              <div className="flex flex-col w-full max-w-xl space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#14F195]/20 flex items-center justify-center text-[#14F195] font-bold ring-1 ring-[#14F195]/30 shadow-[0_0_15px_rgba(20,241,149,0.2)]">
                      S
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-bold tracking-tight">
                        Solana
                      </span>
                      <span className="text-xs text-white/40 font-mono mt-0.5">
                        {walletAddress?.slice(0, 4)}...
                        {walletAddress?.slice(-4)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin text-[#14F195]/50" />
                    ) : error ? (
                      <span className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded">
                        Error fetching
                      </span>
                    ) : (
                      <div className="flex flex-col items-end">
                        <span className="text-xl font-bold text-white tracking-tight">
                          {solBalance?.toLocaleString(undefined, {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4,
                          })}
                        </span>
                        <span className="text-xs font-semibold text-[#14F195] uppercase">
                          SOL
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TradingHistoryPanel;
