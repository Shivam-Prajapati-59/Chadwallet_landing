import React from "react";
import Dark_logo from "@/public/assets/dark_logo.png";
import Image from "next/image";
import Link from "next/link";
import { Search, User, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const TradingNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[#050816]/95 backdrop-blur-2xl px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link href="/" className="flex shrink-0 items-center space-x-2">
          <Image
            src={Dark_logo.src}
            alt="Logo Light"
            width={70}
            height={70}
            className="h-10 w-auto object-contain "
          />

          <span className="hidden sm:block text-lg font-bold tracking-tight">
            ChadWallet
          </span>
        </Link>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl mx-auto flex items-center bg-white/5 border rounded-md px-3 py-2.5 transition-colors focus-within:border-green-400/50 focus-within:bg-white/10">
          <Search className="w-4 h-4 text-muted-foreground shrink-0 mr-2" />
          <input
            type="text"
            placeholder="Search tokens..."
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
          />
        </div>

        {/* Right: Profile and Deposit */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="default"
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black rounded-md font-semibold border-0"
          >
            <Wallet className="w-4 h-4" />
            Deposit
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-black bg-green-500 hover:bg-green-600 rounded-md"
          >
            <Wallet className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md"
          >
            <User className="w-4 h-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden border bg-white/5 rounded-md"
          >
            <User className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TradingNavbar;
