"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";

const ConnectWallet = () => {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated && user) {
    return (
      <div className="flex items-center gap-2">
        {/* Deposit Button */}
        <button className="flex flex-col items-start justify-center px-3 h-12 border border-white/10 rounded-xl bg-[#090b14] hover:bg-white/5 transition-colors">
          <div className="flex items-baseline gap-1">
            <span className="text-white font-bold text-sm tracking-tight">$0.00</span>
            <span className="text-muted-foreground text-xs font-semibold">cash</span>
          </div>
          <span className="text-[#3B82F6] font-bold text-xs mt-0.5">Deposit more</span>
        </button>

        {/* Wallet Button */}
        <button 
          onClick={logout} 
          className="flex items-center gap-3 px-3 h-12 border border-white/10 rounded-xl bg-[#090b14] hover:bg-white/5 transition-colors group"
        >
          <div className="flex flex-col items-start">
            <span className="text-white font-bold text-sm tracking-tight">$0.00</span>
            <span className="text-muted-foreground text-xs font-mono">--</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#14F195] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Wallet className="w-4 h-4 text-black fill-black" />
          </div>
        </button>
      </div>
    );
  }

  return (
    <Button
      variant="default"
      onClick={login}
      className="flex items-center gap-2 px-6 h-12 bg-[#14F195] hover:bg-[#14F195]/80 text-black rounded-xl font-bold border-0 transition-colors"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
