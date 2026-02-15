import HeroSection from "../AboutComponent/HeroSection";
import HistorySection from "../AboutComponent/HistorySection";
import PrincipalSection from "../AboutComponent/PrincipalSection";
import VisionMissionSection from "../AboutComponent/VissionMissionSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen pb-20 bg-white font-sans">
      <HeroSection />
      <HistorySection />
      <VisionMissionSection />
      <PrincipalSection />
    </main>
  );
}
