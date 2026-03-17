"use client";
import { getToken } from "@/lib/client/session";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Sparkles, ArrowRight, PlayCircle } from "lucide-react";

export default function AboutHero() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  return (
    <section className="relative bg-[#01793B] pt-32 pb-64 md:pt-48 md:pb-80 px-4 text-center text-white overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(circle_at_20%_30%,_#ffffff_1px,_transparent_1px)] [background-size:32px_32px]"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-400 rounded-full blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-yellow-400 rounded-full blur-[100px] opacity-10"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* SMALL BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8"
        >
          <Sparkles size={14} className="text-yellow-400" />
          Selamat Datang di TK Azalia
        </motion.div>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[0.9] md:leading-[1.1]"
        >
          Kenali <span className="text-emerald-300">Visi</span> Kami <br className="hidden md:block" />
          Lebih Dekat
        </motion.h1>

        {/* SUBTITLE / QUOTE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-2xl font-medium mb-12 text-emerald-50/80 max-w-3xl mx-auto leading-relaxed px-4"
        >
          "Membentuk generasi yang ceria, kreatif, dan memiliki landasan karakter yang kokoh untuk masa depan yang gemilang."
        </motion.p>

        {/* ACTION BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6"
        >
          {!hasToken && (
            <Link href="/auth/register" className="w-full sm:w-auto">
              <button className="group bg-white text-[#01793B] px-10 py-4 rounded-2xl font-black text-sm tracking-wider hover:bg-emerald-50 hover:scale-105 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
                DAFTAR SEKARANG
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          )}
          <Link href="/program" className="w-full sm:w-auto">
            <button className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-2xl font-black text-sm tracking-wider hover:bg-white/20 hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-3">
              <PlayCircle size={18} />
              LIHAT PROGRAM
            </button>
          </Link>
        </motion.div>
      </div>

      {/* WAVE DECORATION */}
      <div className="absolute bottom-0 left-0 w-full h-24 md:h-40 overflow-hidden line-height-0">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-full fill-white"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.86,70.32,243.6,83.47,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
