import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Light, Regular, Medium, Semibold, Bold
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "TK Azalia",
  description: "Website Pendaftaran TK Azalia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={poppins.className}>
        
        <Navbar />
        
        {children}
      </body>
    </html>
  );
}