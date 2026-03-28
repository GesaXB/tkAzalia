import React from "react";
import type { Metadata } from "next";
import AboutHero from "@/Components/AboutComponent/AboutHero";
import AboutIntro from "@/Components/AboutComponent/AboutIntro";

export const metadata: Metadata = {
  title: "Tentang Kami - Profil TK Azalia",
  description: "Kenali lebih jauh TK Azalia: sejarah berdiri, visi misi, program unggulan, dan komitmen kami dalam memberikan pendidikan anak usia dini yang berkualitas dan Islami.",
  keywords: ["profil TK Azalia", "tentang TK Azalia", "visi misi TK Azalia", "sejarah TK Azalia"],
  alternates: { canonical: '/about' },
  openGraph: {
    title: "Tentang Kami - Profil TK Azalia",
    description: "Kenali lebih jauh TK Azalia: visi misi, program unggulan, dan komitmen pendidikan Islami berkualitas.",
    url: '/about',
  },
};
import AboutVisionMission from "@/Components/AboutComponent/AboutVisionMission";
import AboutPrograms from "@/Components/AboutComponent/AboutPrograms";
import AboutLearningAreas from "@/Components/AboutComponent/AboutLearningAreas";
import { prisma } from "@/lib/prisma";

export default async function AboutPage() {
  const classes = await prisma.kelas.findMany({
    orderBy: {
      urutan: "asc",
    },
  });

  return (
    <main className="w-full bg-white min-h-screen flex flex-col gap-8 md:gap-20">
      <AboutHero />
      <AboutIntro />
      <AboutVisionMission />
      <AboutPrograms classes={classes} />
      <AboutLearningAreas />
    </main>
  );
}
