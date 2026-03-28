import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import AppShell from "@/Components/layout/AppShell";
import JsonLd from "@/Components/layout/JsonLd";
import { ToastProvider } from "@/context/ToastContext";
import { getSiteUrl } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const APP_URL = getSiteUrl();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "TK Azalia - Taman Kanak-Kanak Islami Terpadu",
    template: "%s | TK Azalia",
  },
  description: "TK Azalia adalah Taman Kanak-Kanak Islami yang menawarkan pendidikan anak usia dini berkualitas dengan pengembangan karakter Islami, akademik yang seimbang, serta lingkungan belajar yang aman dan menyenangkan.",
  keywords: [
    "TK Azalia", "TK Islam", "PAUD Islam", "Taman Kanak-Kanak Islami",
    "Pendidikan Anak Usia Dini", "Sekolah TK", "Taman Kanak-Kanak",
    "PPDB TK", "Pendaftaran TK", "TK terbaik", "SPMB TK Azalia"
  ],
  authors: [{ name: "TK Azalia", url: APP_URL }],
  creator: "TK Azalia",
  publisher: "TK Azalia",
  category: "Education",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
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
    url: APP_URL,
    siteName: "TK Azalia",
    title: "TK Azalia - Taman Kanak-Kanak Islami Terpadu",
    description: "Jelajahi program pendidikan yang berfokus pada perkembangan kognitif, motorik, relijius, dan kemandirian anak prasekolah bersama TK Azalia.",
    images: [
      {
        url: `${APP_URL}/logotk.png`,
        width: 512,
        height: 512,
        alt: "Logo TK Azalia - Taman Kanak-Kanak Islami",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TK Azalia - Taman Kanak-Kanak Islami",
    description: "TK Azalia menawarkan pendidikan berkualitas dengan pengembangan karakter Islami dan akademik yang seimbang",
    images: [`${APP_URL}/logotk.png`],
  },
  icons: {
    icon: '/logotk.png',
    shortcut: '/logotk.png',
    apple: '/logotk.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: "f_xUcnqWTXQ_aRgXPYpJ2vKdvd3dnOQcVb0AUuuaAsU",
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
        {/* Font di-host oleh next/font — tidak perlu preconnect ke Google Fonts */}
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
