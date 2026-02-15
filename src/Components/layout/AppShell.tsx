"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";
import JadwalPpdbCarousel from "@/Components/HomeComponent/JadwalPpdbCarousel";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");
  const showJadwal = !isDashboard && !isAuth;

  if (isDashboard) {
    return <main className="min-h-screen w-full">{children}</main>;
  }

  return (
    <>
      <Navbar />
      {showJadwal && (
        <div className="fixed left-0 right-0 top-16 z-40">
          <JadwalPpdbCarousel />
        </div>
      )}
      <main
        className={`flex-grow flex flex-col ${showJadwal ? "pt-[6.5rem]" : "pt-16"}`}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}

