import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import icon from '../public/logotk.png';
import "../styles/globals.css";

import Footer from "@/Components/layout/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "TK Azalia",
  description: "Website TK Azalia",
  icons: {
    icon: icon.src
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={poppins.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
