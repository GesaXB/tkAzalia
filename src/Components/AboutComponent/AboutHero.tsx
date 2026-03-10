"use client"; // Wajib untuk animasi
import { getToken } from "@/lib/client/session";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutHero() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(!!getToken());
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-[#01793B] to-[#015c2e] pt-32 pb-60 md:pb-72 px-4 text-center text-white overflow-hidden">

      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-20"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* JUDUL */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm"
        >
          Kenali Kami Lebih Dekat
        </motion.h1>

        {/* QUOTE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-2xl font-medium mb-10 text-green-50 max-w-2xl mx-auto leading-relaxed"
        >
          "Membentuk generasi ceria, kreatif, dan penuh rasa ingin tahu sejak dini"
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {(!hasToken) && (
            <Link href="/auth/register">
              <button className="bg-white text-[#108043] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 hover:scale-105 transition-all shadow-lg active:scale-95 w-full sm:w-auto">
                DAFTAR SEKARANG
              </button>
            </Link>
          )}
          <Link href="/program">
            <button className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/10 hover:scale-105 transition-all active:scale-95 w-full sm:w-auto">
              LIHAT PROGRAM
            </button>
          </Link>
        </motion.div>
      </div>

      <div className="absolute -bottom-1 left-0 w-full h-16 md:h-28 bg-white rounded-t-[50%] scale-x-125 md:scale-x-110"></div>
    </section>
  );
}
