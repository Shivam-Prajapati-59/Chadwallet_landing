"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import { Wallet, LogOut } from "lucide-react";

const ConnectWallet = () => {
  const { login, logout, authenticated, user } = usePrivy();

  if (authenticated && user) {
    const walletAddress = user.wallet?.address;
    const displayAddress = walletAddress
      ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
      : "Connected";

    return (
      <Button
        variant="outline"
        onClick={logout}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md text-white border-white/10 font-medium"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">{displayAddress}</span>
      </Button>
    );
  }

  return (
    <Button
      variant="default"
      onClick={login}
      className="flex items-center gap-2 bg-[#14F195] hover:bg-[#14F195]/80 text-black rounded-md font-bold border-0 transition-colors"
    >
      <Wallet className="w-4 h-4" />
      <span className="hidden sm:inline">Connect Wallet</span>
    </Button>
  );
};

export default ConnectWallet;
