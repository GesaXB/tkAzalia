import PrivacyPolicy from "@/Components/legal/PrivacyPolicy";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi penggunaan website TK Azalia: pengumpulan data, cookies, dan hak pengguna sesuai peraturan yang berlaku.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Kebijakan Privasi - TK Azalia",
    description: "Kebijakan privasi website resmi TK Azalia.",
    url: "/privacy-policy",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="pt-20">
      <PrivacyPolicy />
    </main>
  );
}
