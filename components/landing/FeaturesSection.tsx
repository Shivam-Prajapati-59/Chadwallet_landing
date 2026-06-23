import React from "react";
import TechStackCard from "../custom/TechStackCard";

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="font-heading mt-2 font-bold text-2xl md:text-4xl lg:text-6xl text-foreground">
          <span>Whoever you are</span>
          <br />
          <span>Grow with Chadwallet</span>
        </h2>
      </div>

      <TechStackCard />
    </section>
  );
};

export default FeaturesSection;
