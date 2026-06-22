import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingNavbar";

const LandingPage = () => {
  return (
    <>
      <LandingNavbar />
      <main className="bg-[#050816]">
        <HeroSection />
      </main>
    </>
  );
};

export default LandingPage;
