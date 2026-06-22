import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import TradingImage from "../../public/assets/tradingpage.png";
import kolImage from "../../public/assets/kol.png";
import DiscoverImage from "@/public/assets/discover.png";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center md:px-10 lg:pt-48 lg:pb-32">
      <h1 className="font-heading text-[38px] font-bold tracking-tighter md:text-5xl lg:text-7xl">
        Hunt Every Memecoin. <br />
        <span className="bg-linear-to-r from-[#E84393] to-[#166534] bg-clip-text text-transparent">
          Every Chain. One Wallet
        </span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
        Discover, track, and trade the hottest memecoins across every blockchain
        from a single powerful wallet.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-2 sm:flex-row">
        <Button
          className={
            "bg-[linear-gradient(270deg,rgb(255,230,223)_0%,rgb(214,163,206)_51.2821%,rgb(103,75,214)_100%)] rounded-[0.8rem] px-8 py-6 text-base font-semibold text-slate-900 transition-opacity hover:opacity-90 border-0"
          }
        >
          Documentation
        </Button>
        <Button className="rounded-[0.8rem] px-8 py-6 text-base font-semibold bg-white/10 hover:bg-white/20 text-white border-0 transition-all duration-300">
          Start Trading
        </Button>
      </div>
      <div className="relative mt-16 md:mt-20 w-full max-w-5xl">
        <div className="w-full rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.15)] border border-blue-500/20 overflow-hidden">
          <Image
            src={TradingImage}
            alt="Trading demo"
            className="w-full h-auto object-cover p-5"
            priority
          />
        </div>
        <div className="hidden md:block absolute md:-bottom-30 md:-right-12 lg:-bottom-37.5 lg:-right-19 z-10 md:w-50 lg:w-73.25">
          <Image
            src={DiscoverImage}
            alt="Discover Image"
            width={293}
            height={170}
            className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
