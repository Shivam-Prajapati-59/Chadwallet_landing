import React from "react";
import TechStackCard from "../custom/TechStackCard";
import { FEATURES_DATA } from "@/config/landing";

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="font-heading mt-2 font-bold text-2xl md:text-4xl lg:text-6xl text-foreground">
          <span>{FEATURES_DATA.heading1}</span>
          <br />
          <span>{FEATURES_DATA.heading2}</span>
        </h2>
      </div>

      <TechStackCard />
    </section>
  );
};

export default FeaturesSection;
