import dynamic from "next/dynamic";
import HeroSection from "../HomeComponent/HeroSection";

function SectionPlaceholder() {
  return (
    <div
      className="min-h-[200px] w-full animate-pulse rounded-2xl bg-gray-100/90"
      aria-hidden
    />
  );
}

const VisionMissionSection = dynamic(
  () => import("../HomeComponent/VisionMissionSection"),
  { loading: SectionPlaceholder }
);
const WhyChooseSection = dynamic(
  () => import("../HomeComponent/WhyChooseSection"),
  { loading: SectionPlaceholder }
);
const ProgramSection = dynamic(
  () => import("../HomeComponent/ProgramSection"),
  { loading: SectionPlaceholder }
);
const TestimonialSection = dynamic(
  () => import("../HomeComponent/TestimonialSection"),
  { loading: SectionPlaceholder }
);
const BlogSection = dynamic(
  () => import("../HomeComponent/BlogSection"),
  { loading: SectionPlaceholder }
);

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen w-full">
      <div className="w-full overflow-hidden">
        <HeroSection />
      </div>

      <div className="px-5 sm:px-6 md:px-8 lg:px-10 xl:px-14 max-w-[1600px] mx-auto">
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
