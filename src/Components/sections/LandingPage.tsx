import HeroSection from "../HomeComponent/HeroSection";
import ProgramSection from "../HomeComponent/ProgramSection";
import TestimonialSection from "../HomeComponent/TestimonialSection";
import VisionMissionSection from "../HomeComponent/VisionMissionSection";
import WhyChooseSection from "../HomeComponent/WhyChooseSection";
import BlogSection from "../HomeComponent/BlogSection";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Margin kiri-kanan konsisten untuk kesan modern */}
      <div className="px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14 max-w-[1600px] mx-auto">
        <div className="relative bg-gradient-to-b from-white via-[#F0F9F1] to-white -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-14 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14">
          <HeroSection />
        </div>

        <div className="relative -mt-8 md:-mt-10 pb-6">
          <VisionMissionSection />
        </div>

        <div className="bg-[#F8F9FA] -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-14 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-10 md:pt-12 pb-12 md:pb-14">
          <WhyChooseSection />
        </div>

        <div className="pt-10 md:pt-12 pb-12 md:pb-14">
          <ProgramSection />
        </div>

        <div className="bg-[#F8F9FA] -mx-5 sm:-mx-6 md:-mx-8 lg:-mx-10 xl:-mx-14 px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-10 md:pt-12 pb-12 md:pb-14">
          <TestimonialSection />
        </div>

        <div className="pt-10 md:pt-12 pb-14 md:pb-16">
          <BlogSection />
        </div>
      </div>
    </div>
  );
}
