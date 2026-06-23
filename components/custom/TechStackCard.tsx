import React from "react";
import card1 from "@/public/assets/cards/card1.png";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

const TechStackCard = () => {
  return (
    <div className="flex flex-col gap-8 py-12 max-w-7xl w-full px-6 md:px-10 mx-auto">
      {/* Card 1: Access all assets */}
      <Card className="bg-[#091031] flex flex-col md:flex-row items-stretch justify-between rounded-3xl overflow-hidden">
        <CardContent className="p-8 md:p-12 max-w-lg text-center flex flex-col justify-center border-none">
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight font-bold text-center">
            <span>Access all assets</span> <br />
            <span className="bg-linear-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              across the crypto space.
            </span>
          </h1>
          <p className="font-sans text-muted-foreground flex flex-col gap-3 mt-6 text-base">
            <span>Unified portfolio tracking across every blockchain</span>
            <span>Discover and trade the hottest memecoins seamlessly</span>
            <span>Real-time market data and insights in one powerful dashboard</span>
          </p>
        </CardContent>
        <div className="w-full md:w-1/2 lg:w-1/3 shrink-0 flex">
          <Image
            src={card1}
            alt="Access all assets"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-2xl rounded-r-none"
          />
        </div>
      </Card>

      {/* Card 2: Launch any coin */}
      <Card className="bg-[#091031] flex flex-col md:flex-row-reverse items-stretch justify-between rounded-3xl overflow-hidden">
        <CardContent className="p-8 md:p-12 max-w-lg text-center flex flex-col justify-center border-none">
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight font-bold text-center">
            <span>Launch any coin</span> <br />
            <span>instantly and securely.</span>
          </h1>
          <p className="font-sans text-muted-foreground flex flex-col gap-3 mt-6 text-base">
            <span>Create and deploy memecoins with zero coding required</span>
            <span>Built-in fair launch mechanics and anti-rug protections</span>
            <span>Instant liquidity provision and automated market making</span>
          </p>
        </CardContent>
        <div className="w-full md:w-1/2 lg:w-1/3 shrink-0 flex">
          <Image
            src={card1}
            alt="Launch any coin"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-2xl rounded-l-none"
          />
        </div>
      </Card>

      {/* Card 3: Enable KOLs */}
      <Card className="bg-[#091031] flex flex-col md:flex-row items-stretch justify-between rounded-3xl overflow-hidden">
        <CardContent className="p-8 md:p-12 max-w-lg text-center flex flex-col justify-center border-none">
          <h1 className="font-heading text-3xl md:text-4xl tracking-tight font-bold text-center">
            <span>Enable KOLs</span> <br />
            <span>to drive massive adoption.</span>
          </h1>
          <p className="font-sans text-muted-foreground flex flex-col gap-3 mt-6 text-base">
            <span>
              Empower Key Opinion Leaders with built-in social sharing
            </span>
            <span>Transparently track and reward top community drivers</span>
            <span>Monitor viral metrics and engagement in real-time</span>
          </p>
        </CardContent>
        <div className="w-full md:w-1/2 lg:w-1/3 shrink-0 flex">
          <Image
            src={card1}
            alt="Enable KOLs"
            width={400}
            height={400}
            className="w-full h-full object-cover rounded-2xl rounded-r-none"
          />
        </div>
      </Card>
    </div>
  );
};

export default TechStackCard;
