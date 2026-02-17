import type { Metadata } from "next";
import { Inter } from "next/font/google";
import icon from '../public/logotk.png';
import "../styles/globals.css";

import AppShell from "@/Components/layout/AppShell";
import { ToastProvider } from "@/context/ToastContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TK Azalia - Pendidikan Anak Usia Dini",
  description: "TK Azalia menawarkan pendidikan berkualitas dengan pengembangan karakter dan akademik yang seimbang",
  keywords: ["TK", "PAUD", "Pendidikan Anak", "TK Azalia", "Pendidikan Dini"],
  authors: [{ name: "TK Azalia" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "TK Azalia",
    description: "Website resmi TK Azalia",
    images: [{ url: icon.src }],
  },
  icons: {
    icon: icon.src,
    shortcut: icon.src,
    apple: icon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
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
