import HeroSection from "../HomeComponent/HeroSection";
import ProgramSection from "../HomeComponent/ProgramSection";
import TestimonialSection from "../HomeComponent/TestimonialSection";
import VisionMissionSection from "../HomeComponent/VisionMissionSection";
import WhyChooseSection from "../HomeComponent/WhyChooseSection";

export default function LandingPage() {
  return (
    <div className="bg-white">
      <div className="relative bg-gradient-to-b from-white via-[#F0F9F1] to-white">
        <HeroSection />
      </div>

      <div className="relative -mt-12 md:-mt-16 pb-15">
        <VisionMissionSection />
      </div>

      <div className="bg-[#F8F9FA] mt-0 pt-12 md:pt-20 pb-20">
        <div className="container mx-auto px-4">
          <WhyChooseSection />
        </div>
      </div>

      <div className="bg-white pt-12 md:pt-20">
        <div className="container mx-auto px-4">
          <ProgramSection />
        </div>
      </div>

      <div className="bg-[#F8F9FA] pt-12 md:pt-20 pb-12 md:pb-20">
        <div className="container mx-auto px-4">
          <TestimonialSection />
        </div>
      </div>

    </div>
  );
}
