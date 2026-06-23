import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import FeaturesSection from "./FeaturesSection";
import TokenBanner from "../custom/TokenBanner";
import BentoGrid from "./BentoGrid";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <BentoGrid />
        <TokenBanner />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
