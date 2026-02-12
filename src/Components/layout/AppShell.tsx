"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col pt-16">{children}</main>
      <Footer />
    </>
  );
}

