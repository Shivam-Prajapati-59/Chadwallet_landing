"use client";

import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CLAIM_SECTION_DATA } from "@/config/landing";
import SvgBackground from "../custom/SvgBackground";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";

const ClaimSection = () => {
  const { login, authenticated } = usePrivy();
  const router = useRouter();
  const [isPendingRedirect, setIsPendingRedirect] = useState(false);

  useEffect(() => {
    if (isPendingRedirect && authenticated) {
      router.push("/trade");
    }
  }, [authenticated, isPendingRedirect, router]);

  const handleClaim = () => {
    if (authenticated) {
      router.push("/trade");
    } else {
      setIsPendingRedirect(true);
      login();
    }
  };

  return (
    <section
      id="faq"
      className="relative flex flex-col items-center justify-center px-6 py-24 text-center md:px-10 lg:py-32 overflow-hidden border-t border-white/5"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-green-900/10 via-[#050816] to-[#050816] pointer-events-none" />
      <SvgBackground layout="wave" className="opacity-10" lineColor="white" />
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-8">
        <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          {CLAIM_SECTION_DATA.heading1}{" "}
          <span className="text-green-400">{CLAIM_SECTION_DATA.heading2}</span>{" "}
          {CLAIM_SECTION_DATA.heading3}
        </h2>

        <div className="flex flex-col gap-3 text-lg md:text-xl text-slate-300 font-sans">
          {CLAIM_SECTION_DATA.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <Button
            onClick={handleClaim}
            className="rounded-[0.8rem] px-10 py-7 text-lg font-bold transition-all"
          >
            {authenticated ? "Go to Trade Page" : CLAIM_SECTION_DATA.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClaimSection;
