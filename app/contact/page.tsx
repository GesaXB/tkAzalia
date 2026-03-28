import type { Metadata } from "next";
import ContactSection from "@/Components/sections/ContactPage";

export const metadata: Metadata = {
  title: "Hubungi Kami - TK Azalia",
  description: "Hubungi TK Azalia untuk informasi pendaftaran, jadwal kunjungan, atau pertanyaan seputar program pendidikan anak usia dini kami.",
  keywords: ["kontak TK Azalia", "alamat TK Azalia", "telepon TK Azalia", "hubungi TK Azalia"],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: "Hubungi Kami - TK Azalia",
    description: "Hubungi TK Azalia untuk informasi pendaftaran dan program pendidikan anak usia dini.",
    url: '/contact',
  },
};

export default function Page() {
  return <ContactSection />;
}