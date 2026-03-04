import React from "react";
import AboutHero from "@/Components/AboutComponent/AboutHero";
import AboutIntro from "@/Components/AboutComponent/AboutIntro";
import AboutVisionMission from "@/Components/AboutComponent/AboutVisionMission";
import AboutPrograms from "@/Components/AboutComponent/AboutPrograms";
import AboutLearningAreas from "@/Components/AboutComponent/AboutLearningAreas";

export default function AboutPage() {
  return (

    <main className="w-full bg-white min-h-screen flex flex-col gap-8 md:gap-20">
      
      <AboutHero />

      <AboutIntro />

      <AboutVisionMission />

      <AboutPrograms />

      <AboutLearningAreas />
      
    </main>
  );
}