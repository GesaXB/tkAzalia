import HeroSection from "../home/HeroSection";
import VisionMissionSection from "../home/VisionMissionSection";

export default function MainContent() {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
      <HeroSection />
      <VisionMissionSection />
    </div>
  );
}
