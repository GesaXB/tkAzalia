import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Berita",
  description:
    "Berita, kegiatan, artikel edukatif, dan kabar terbaru dari TK Azalia — Taman Kanak-Kanak Islami Terpadu.",
  keywords: [
    "blog TK Azalia",
    "berita TK Azalia",
    "kegiatan TK Azalia",
    "artikel PAUD",
    "informasi sekolah TK",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog & Berita - TK Azalia",
    description:
      "Informasi kegiatan, artikel edukatif, dan perkembangan terbaru dari TK Azalia.",
    url: "/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
