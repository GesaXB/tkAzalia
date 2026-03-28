"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Navbar from "@/Components/layout/Navbar";
import Footer from "@/Components/layout/Footer";

const JadwalSpmbCarousel = dynamic(
  () => import("@/Components/HomeComponent/JadwalSpmbCarousel"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[52px] w-full bg-gradient-to-r from-[#01793B]/80 to-emerald-700/80"
        aria-hidden
      />
    ),
  }
);

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
          <JadwalSpmbCarousel />
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

