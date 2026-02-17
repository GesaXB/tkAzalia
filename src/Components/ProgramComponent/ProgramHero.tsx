"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ProgramHero() {
  return (
    <section className="relative bg-[#108043] pt-32 pb-40 px-6 text-center text-white overflow-hidden">
      {/* Background Pattern Halus */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
        >
          Program Unggulan
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-green-50 max-w-2xl mx-auto"
        >
          Kurikulum holistik yang menyeimbangkan kecerdasan intelektual, emosional, dan spiritual anak.
        </motion.p>
      </div>

      {/* Lengkungan Putih di Bawah */}
      <div className="absolute -bottom-1 left-0 w-full h-16 md:h-24 bg-white rounded-t-[50%] scale-x-110"></div>
    </section>
  );
}