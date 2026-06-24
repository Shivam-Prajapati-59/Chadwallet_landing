import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import FeaturesSection from "./FeaturesSection";
import TokenBanner from "../custom/TokenBanner";
import BentoGrid from "./BentoGrid";
import ClaimSection from "./ClaimSection";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <LandingNavbar />
      <main className="flex-1 pt-20">
        <TokenBanner />
        <HeroSection />
        <FeaturesSection />
        <BentoGrid />
        <TokenBanner />
        <ClaimSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
