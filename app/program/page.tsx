import React from "react";
import ProgramHeroNew from "@/Components/ProgramComponent/ProgramHeroNew";
import ProgramCurriculumOrganic from "@/Components/ProgramComponent/ProgramCurriculumOrganic";
import ProgramClasses from "@/Components/ProgramComponent/ProgramClasses"; // Import komponen baru
import ProgramTimeline from "@/Components/ProgramComponent/ProgramTimeline";

export default function ProgramPage() {
  return (
    <main className="w-full min-h-screen bg-white overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <ProgramHeroNew />

      {/* 2. Kurikulum (6 Pilar) */}
      <ProgramCurriculumOrganic />

      {/* 3. DAFTAR KELOMPOK (KELAS) - BARU */}
      <ProgramClasses />

      {/* 4. Jadwal Harian (Timeline) */}
      <ProgramTimeline />
      
    </main>
  );
}