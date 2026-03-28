import type { Metadata } from "next";
import ProgramSection from "@/Components/sections/ProgramPage";

export const metadata: Metadata = {
  title: "Program Belajar - Kurikulum TK Azalia",
  description: "Temukan program belajar TK Azalia yang komprehensif: kurikulum berbasis karakter Islami, pengembangan kognitif, motorik, dan sosial anak usia dini.",
  keywords: ["program TK Azalia", "kurikulum TK", "program PAUD", "belajar sambil bermain"],
  alternates: { canonical: '/program' },
  openGraph: {
    title: "Program Belajar - Kurikulum TK Azalia",
    description: "Program belajar TK Azalia yang komprehensif dengan pendekatan Islami dan pengembangan holistik anak.",
    url: '/program',
  },
};

export default function Page() {
  return <ProgramSection />;
}