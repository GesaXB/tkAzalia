import TermsAndConditions from "@/Components/legal/TermsAndConditions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan layanan website TK Azalia, pendaftaran, dan kebijakan pengguna.",
  alternates: { canonical: "/terms-and-conditions" },
  openGraph: {
    title: "Syarat & Ketentuan - TK Azalia",
    description: "Syarat dan ketentuan penggunaan website TK Azalia.",
    url: "/terms-and-conditions",
  },
  robots: { index: true, follow: true },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="pt-20">
      <TermsAndConditions />
    </main>
  );
}
