"use client"; // Wajib untuk animasi
import React from "react";
import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative bg-[#108043] pt-32 pb-48 px-4 text-center text-white overflow-hidden">
      {/* Background Pattern (Hiasan Halus) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

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
          <button className="bg-white text-[#108043] px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-gray-100 hover:scale-105 transition-all shadow-lg active:scale-95">
            DAFTAR SEKARANG
          </button>
          <button className="border-2 border-white text-white px-8 py-3.5 rounded-full font-bold text-sm tracking-wide hover:bg-white/10 hover:scale-105 transition-all active:scale-95">
            LIHAT PROGRAM
          </button>
        </motion.div>
      </div>

      {/* LENGKUNGAN BAWAH */}
      <div className="absolute -bottom-1 left-0 w-full h-16 md:h-28 bg-white rounded-t-[50%] scale-x-125 md:scale-x-110"></div>
    </section>
  );
}