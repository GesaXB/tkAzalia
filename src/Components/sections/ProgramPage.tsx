import React from "react";
import ProgramHeroNew from "@/Components/ProgramComponent/ProgramHeroNew";
import ProgramCurriculumOrganic from "@/Components/ProgramComponent/ProgramCurriculumOrganic";
import ProgramClasses from "@/Components/ProgramComponent/ProgramClasses";
import ProgramTimeline from "@/Components/ProgramComponent/ProgramTimeline";

export default function ProgramSection() {
  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      <ProgramHeroNew />
      <ProgramCurriculumOrganic />
      <ProgramClasses />
      <ProgramTimeline />
    </main>
  );
}