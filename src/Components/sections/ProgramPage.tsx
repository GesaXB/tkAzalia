import React from "react";
import ProgramHeroNew from "@/Components/ProgramComponent/ProgramHeroNew";
import ProgramCurriculumOrganic from "@/Components/ProgramComponent/ProgramCurriculumOrganic";
import ProgramClasses from "@/Components/ProgramComponent/ProgramClasses";
import ProgramTimeline from "@/Components/ProgramComponent/ProgramTimeline";
import { listKelas } from "@/lib/admin/kelas";

export default async function ProgramSection() {
  const kelasData = await listKelas();

  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      <ProgramHeroNew />
      <ProgramCurriculumOrganic />
      <ProgramClasses classes={kelasData} />
      <ProgramTimeline />
    </main>
  );
}