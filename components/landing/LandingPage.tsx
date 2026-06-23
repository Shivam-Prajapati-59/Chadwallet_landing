import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import FeaturesSection from "./FeaturesSection";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816]">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
      </main>
      <FeaturesSection />
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
