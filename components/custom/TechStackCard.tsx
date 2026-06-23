import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import SvgBackground from "./SvgBackground";
import { FEATURES_DATA } from "@/config/landing";

const TechStackCard = () => {
  return (
    <div className="flex flex-col gap-8 py-12 max-w-7xl w-full px-6 md:px-10 mx-auto">
      {FEATURES_DATA.cards.map((card, idx) => {
        const isReverse = idx % 2 !== 0;
        return (
          <Card
            key={idx}
            className={`bg-[#030821] relative flex flex-col ${
              isReverse ? "md:flex-row-reverse" : "md:flex-row"
            } items-stretch justify-between rounded-3xl overflow-hidden z-0`}
          >
            <div
              className={`absolute top-0 ${
                isReverse ? "left-0" : "right-0"
              } w-full md:w-1/2 h-full z-0 opacity-10 text-white`}
            >
              <SvgBackground />
            </div>
            <CardContent className="relative z-10 p-8 md:p-12 max-w-lg text-center flex flex-col justify-center border-none">
              <h1 className="font-heading text-3xl md:text-4xl tracking-tight font-bold text-center">
                <span>{card.title1}</span> <br />
                <span className="">{card.title2}</span>
              </h1>
              <p className="font-sans text-muted-foreground flex flex-col gap-3 mt-6 text-base">
                {card.bullets.map((bullet, i) => (
                  <span key={i}>{bullet}</span>
                ))}
              </p>
            </CardContent>
            <div className="relative z-10 w-full md:w-1/2 lg:w-1/3 shrink-0 flex">
              <Image
                src={card.image}
                alt={card.imageAlt}
                width={400}
                height={400}
                className={`w-full h-full object-cover rounded-2xl ${
                  isReverse ? "rounded-l-none" : "rounded-r-none"
                }`}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default TechStackCard;
