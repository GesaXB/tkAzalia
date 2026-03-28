import LandingPage from "@/Components/sections/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "TK Azalia — Taman Kanak-Kanak Islami Terpadu di Bandung. Pendidikan anak usia dini berkualitas, karakter Islami, lingkungan aman dan menyenangkan. Informasi PPDB dan program belajar.",
  keywords: [
    "TK Azalia",
    "TK Islam Bandung",
    "PAUD Islam",
    "pendaftaran TK",
    "PPDB TK",
    "taman kanak-kanak",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "TK Azalia - Taman Kanak-Kanak Islami Terpadu",
    description:
      "Pendidikan anak usia dini berkualitas dengan pengembangan karakter Islami dan akademik yang seimbang.",
    url: "/",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden font-sans">
        <LandingPage/>
    </main>
  );
}
