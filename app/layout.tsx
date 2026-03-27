import type { Metadata } from "next";
import { Inter } from "next/font/google";
import icon from '../public/logotk.png';
import "../styles/globals.css";
import AppShell from "@/Components/layout/AppShell";
import JsonLd from "@/Components/layout/JsonLd";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://tkazalia.vercel.app'),
  title: {
    default: "TK Azalia - Pendidikan Anak Usia Dini Terpadu",
    template: "%s | TK Azalia",
  },
  description: "TK Azalia menawarkan pendidikan anak usia dini berkualitas dengan pengembangan karakter Islami, akademik yang seimbang, serta lingkungan belajar yang aman dan menyenangkan.",
  keywords: ["TK", "PAUD", "Pendidikan Anak Usia Dini", "TK Azalia", "Sekolah TK", "Taman Kanak-Kanak", "Bermain Sambil Belajar"],
  authors: [{ name: "TK Azalia" }],
  creator: "TK Azalia",
  publisher: "TK Azalia",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "TK Azalia",
    title: "TK Azalia - Pendidikan Anak Usia Dini Terbaik",
    description: "Jelajahi program pendidikan yang berfokus pada perkembangan kognitif, motorik, relijius, dan kemandirian anak prasekolah bersama TK Azalia.",
    images: [{ url: icon.src, width: 800, height: 600, alt: "Logo TK Azalia" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TK Azalia - Pendidikan Anak Usia Dini",
    description: "TK Azalia menawarkan pendidikan berkualitas dengan pengembangan karakter dan akademik yang seimbang",
    images: [icon.src],
  },
  icons: {
    icon: icon.src,
    shortcut: icon.src,
    apple: icon.src,
  },
  verification: {
    google: "6YJ4Jm8RByGf6CGJA4Td4huJoEBYstUJDf-SkZYqebw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <JsonLd />
      </head>
      <body
        className="flex flex-col min-h-screen bg-white text-gray-900 antialiased"
        suppressHydrationWarning
      >
        <ToastProvider>
          <AppShell>{children}</AppShell>
        </ToastProvider>
      </body>
    </html>
  );
}
