import HeroSection from "../home/HeroSection";
import VisionMissionSection from "../home/VisionMissionSection";
import WhyChooseSection from "../home/WhyChooseSection";
import ProgramSection from "../home/ProgramSection";
import TestimonialSection from "../home/TestimonialSection";

export default function LandingPage() {
  return (
    <div className="bg-[#F8F9FA]">
      <div className="relative overflow-hidden pb-32">
        {/* Dekorasi Background */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-700/10 rounded-full blur-3xl -z-10"></div>
        {/* Konten Landing Page */}
        <div className="container mx-auto px-2 pt-16 md:pt-32 flex flex-col gap-20 md:gap-32">
          
          <HeroSection />
          
          <VisionMissionSection />

          <WhyChooseSection />
          
          <ProgramSection />

          <TestimonialSection />

        </div>

      </div>
    </div>
  );
}