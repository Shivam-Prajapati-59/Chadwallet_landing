"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import GridCard1 from "@/public/assets/discover2.png";
import GridCard2 from "@/public/assets/cards/LaunchCard.png";
import GridCard3 from "@/public/assets/cards/AsatCard.png";
import GridCard4 from "@/public/assets/cards/HappeningCard.png";

import { Trophy, CheckCircle2 } from "lucide-react";
import { BENTO_GRID_DATA } from "@/config/landing";

export default function BentoGrid() {
  return (
    <section className="p-8 md:p-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 md:gap-12">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center gap-4">
          <h2 className="text-3xl md:text-5xl font-bold font-heading">
            {BENTO_GRID_DATA.heading}
          </h2>
          <p className="text-muted-foreground text-lg/8 text-pretty">
            {BENTO_GRID_DATA.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Leaderboard */}
          <Card className="rounded-2xl shadow-xs lg:row-span-2 overflow-hidden flex flex-col bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold font-heading">{BENTO_GRID_DATA.leaderboardCard.title}</h3>
              <p className="text-muted-foreground text-sm">
                {BENTO_GRID_DATA.leaderboardCard.description}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col p-6 pt-0 overflow-x-auto">
              <div className="min-w-75">
                {/* Table Header */}
                <div className="grid grid-cols-[35px_1fr_45px_75px_85px] gap-3 text-muted-foreground font-medium pb-3 border-b border-white/10 uppercase tracking-wider text-xs">
                  <div className="text-center">Rank</div>
                  <div>X</div>
                  <div className="text-right">Boost</div>
                  <div className="text-right">24h Pts</div>
                  <div className="text-right">Total</div>
                </div>

                {/* "You" Row */}
                <div className="grid grid-cols-[35px_1fr_45px_75px_85px] gap-3 items-center py-3 bg-white/10 rounded-xl my-3 px-3 -mx-3 font-semibold text-white text-sm border border-white/10 shadow-lg">
                  <div className="text-center text-muted-foreground">{BENTO_GRID_DATA.leaderboardCard.youRow.rank}</div>
                  <div className="flex items-center gap-3">
                    <img
                      src={BENTO_GRID_DATA.leaderboardCard.youRow.image}
                      alt={BENTO_GRID_DATA.leaderboardCard.youRow.name}
                      className="w-7 h-7 rounded-full bg-white/20"
                    />
                    <span className="truncate text-green-400">{BENTO_GRID_DATA.leaderboardCard.youRow.name}</span>
                  </div>
                  <div className="text-right text-muted-foreground">{BENTO_GRID_DATA.leaderboardCard.youRow.boost}</div>
                  <div className="text-right text-muted-foreground">{BENTO_GRID_DATA.leaderboardCard.youRow.dailyPoints}</div>
                  <div className="text-right text-muted-foreground">{BENTO_GRID_DATA.leaderboardCard.youRow.totalPoints}</div>
                </div>

                {/* Leaderboard Rows */}
                <div className="flex flex-col text-sm">
                  {BENTO_GRID_DATA.leaderboardCard.rows.map((row) => (
                    <div
                      key={row.name}
                      className="grid grid-cols-[35px_1fr_45px_75px_85px] gap-3 items-center py-2 hover:bg-white/5 rounded-xl px-3 -mx-3 transition-colors"
                    >
                      <div className="text-center font-bold text-base">
                        {row.rank}
                      </div>
                      <div className="flex items-center gap-3 font-medium text-white truncate">
                        <img
                          src={row.image}
                          alt={row.name}
                          className="w-7 h-7 rounded-full bg-white/10"
                        />
                        <span className="truncate">{row.name}</span>
                      </div>
                      <div className="text-right text-green-400 font-medium">
                        {row.boost}
                      </div>
                      <div className="text-right text-muted-foreground">
                        {row.dailyPoints}
                      </div>
                      <div className="text-right text-white font-semibold">
                        {row.totalPoints}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2: Quests */}
          <Card className="rounded-2xl shadow-xs overflow-hidden flex flex-col bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-2">
              <h3 className="text-xl font-bold font-heading">{BENTO_GRID_DATA.questsCard.title}</h3>
              <p className="text-muted-foreground text-sm">
                {BENTO_GRID_DATA.questsCard.description}
              </p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 p-6 pt-2">
              {BENTO_GRID_DATA.questsCard.quests.map((quest, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div>
                    <p className="font-semibold text-white text-sm">
                      {quest.title}
                    </p>
                    <p className="text-muted-foreground text-xs mt-0.5">
                      {quest.description}
                    </p>
                  </div>
                  <div className={`font-bold text-sm px-2 py-1 rounded-md ${quest.completed ? "flex items-center gap-1.5 text-green-400 bg-green-400/10" : "text-green-400 bg-green-400/10"}`}>
                    {quest.completed && <CheckCircle2 className="w-4 h-4" />}
                    {quest.reward}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Card 3: Rewards */}
          <Card className="rounded-2xl shadow-xs lg:col-start-2 overflow-hidden flex flex-col bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-heading">{BENTO_GRID_DATA.rewardsCard.title}</h3>
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground bg-white/10 px-2 py-1 rounded-md">
                  {BENTO_GRID_DATA.rewardsCard.endDate}
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
                    {BENTO_GRID_DATA.rewardsCard.description}
                  </p>
                  <p className="text-green-400 font-medium">{BENTO_GRID_DATA.rewardsCard.rewardAmount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Find 100x Memecoins */}
          <Card className="rounded-2xl shadow-xs lg:col-start-3 lg:row-span-2 lg:row-start-1 overflow-hidden flex flex-col justify-between bg-[#0B0E17] border-white/10">
            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold font-heading">
                {BENTO_GRID_DATA.discoverCard.title}
              </h3>
              <p className="text-muted-foreground flex flex-col text-sm">
                <span>{BENTO_GRID_DATA.discoverCard.bullet1}</span>
                <span>{BENTO_GRID_DATA.discoverCard.bullet2}</span>
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
        </div>
      </div>
    </section>
  );
}
