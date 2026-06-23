"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import GridCard1 from "@/public/assets/discover2.png";
import GridCard2 from "@/public/assets/cards/LaunchCard.png";
import GridCard3 from "@/public/assets/cards/AsatCard.png";
import GridCard4 from "@/public/assets/cards/HappeningCard.png";

import { Trophy, CheckCircle2 } from "lucide-react";

export default function BentoGrid() {
  return (
    <section className="p-8 md:p-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:gap-12">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold font-heading">
            Everything you need to dominate
          </h2>
          <p className="text-muted-foreground text-lg/8 text-pretty">
            ChadWallet gives you the ultimate edge with powerful features
            designed for speed, security, and tracking the next 100x gem.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-2xl shadow-xs lg:row-span-2 overflow-hidden flex flex-col justify-between bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold font-heading">
                Find the next 100x Memecoins here
              </h3>
              <p className="text-muted-foreground flex flex-col text-sm">
                <span>Get ChadWallet Today</span>
                <span>Never miss the next breakout!</span>
              </p>
            </CardHeader>
            <CardContent className="relative flex-1 p-0 w-full min-h-75 mt-4">
              <Image
                src={GridCard1}
                alt="Discover"
                fill
                className="object-contain object-bottom scale-[1.38] origin-bottom"
              />
            </CardContent>
          </Card>

          {/* Card 2: Quests */}
          <Card className="rounded-2xl shadow-xs overflow-hidden flex flex-col bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold font-heading">Quests</h3>
              <p className="text-muted-foreground text-sm">
                Complete tasks to earn points.
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-6 pt-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-semibold text-white text-sm">
                    Download ChadWallet
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Deposit $100 and trade $500
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-4 h-4" />
                  +200
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-semibold text-white text-sm">
                    Refer a friend
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Earn 30% in referral fees
                  </p>
                </div>
                <div className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-md">
                  +100
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-semibold text-white text-sm">
                    Follow us on X
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Turn notifications on
                  </p>
                </div>
                <div className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-md">
                  +50
                </div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div>
                  <p className="font-semibold text-white text-sm">
                    Tag 3 friends
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    In one post (max 2 per follower)
                  </p>
                </div>
                <div className="text-green-400 font-bold text-sm bg-green-400/10 px-2 py-1 rounded-md">
                  +50
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3: Rewards */}
          <Card className="rounded-2xl shadow-xs lg:col-start-2 overflow-hidden flex flex-col bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading">Rewards</h3>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-white/10 px-2 py-1 rounded-md">
                  Ends June 30, 2026
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col p-6 pt-0 mt-auto">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-linear-to-br from-green-400/20 to-transparent ">
                <div className="p-3 bg-green-400/20 rounded-full flex shrink-0">
                  <Trophy className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-white text-lg leading-tight">
                    Lucky Weekly Winners
                  </p>
                  <p className="text-green-400 font-medium">$10 each</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-xs lg:col-start-3 lg:row-span-2 lg:row-start-1 overflow-hidden flex flex-col justify-between bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold font-heading">
                See What's Happening in the Space
              </h3>
              <p className="text-muted-foreground flex flex-col text-sm">
                <span>Stay Connected to the community,</span>
                <span>Discuss what this is all about</span>
              </p>
            </CardHeader>
            <CardContent className="relative flex-1 p-0 w-full min-h-75 mt-4">
              <Image
                src={GridCard4}
                alt="Community"
                fill
                className="object-contain object-bottom scale-[1.38] origin-bottom"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
