import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#050816] overflow-x-hidden">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
      </main>
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
