"use client";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/lib/client/auth";

export default function PendaftaranHero() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    fetchProfile().then((res) => {
      setIsLoggedIn(res.success && !!res.data);
    });
  }, []);

  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 px-6 overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(1,121,59,0.08),transparent)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-emerald-50 border border-emerald-100 text-[#01793B] font-bold text-xs mb-8 tracking-widest uppercase">
            <CalendarDays className="w-3.5 h-3.5" />
            Tahun Ajaran 2026/2027
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
            Penerimaan Murid Baru<br />
            <span className="text-[#01793B]">TK Azalia</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Panduan lengkap pendaftaran, persyaratan dokumen, dan jadwal pelaksanaan SPMB TK Azalia.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Only show "Daftar Sekarang" when not logged in (or still loading) */}
            {!isLoggedIn && (
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#01793B] text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95 uppercase tracking-wider"
              >
                Daftar Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {/* If logged in, show go-to-dashboard button instead */}
            {isLoggedIn && (
              <Link
                href="/dashboard/siswa"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#01793B] text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100 active:scale-95 uppercase tracking-wider"
              >
                Ke Dashboard Saya
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            <a
              href="#alur"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-50 transition-all active:scale-95 uppercase tracking-wider"
            >
              Lihat Alur
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
