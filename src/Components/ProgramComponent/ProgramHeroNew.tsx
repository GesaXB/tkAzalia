"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ProgramHeroNew() {
  return (
    <section className="relative bg-gradient-to-br from-[#108043] to-[#085c30] pt-36 pb-40 md:pb-60 px-6 text-center text-white overflow-hidden">
      
      {/* --- BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute top-20 left-[10%] w-32 h-32 bg-yellow-300/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div 
          animate={{ y: [10, -10, 10], opacity: [0.3, 0.5, 0.3] }} 
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} 
          className="absolute bottom-40 right-[15%] w-48 h-48 bg-blue-300/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* --- KONTEN UTAMA --- */}
      {/* Tambahkan z-30 agar teks PASTI DI ATAS gelombang jika tidak sengaja bertabrakan */}
      <div className="max-w-4xl mx-auto relative z-30">
        
        <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5 }}
             className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/20 shadow-sm"
        >
            <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" /> 
            <span className="tracking-wide text-green-50">Program Unggulan TK Azalia</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight drop-shadow-sm"
        >
          Petualangan Belajar yang <br className="hidden md:block"/>
          <span className="text-yellow-300 relative inline-block">
            Menyenangkan
            <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 opacity-70" viewBox="0 0 100 10" preserveAspectRatio="none">
               <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
            </svg>
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl font-medium text-green-50 max-w-2xl mx-auto leading-relaxed"
        >
          Kurikulum kami dirancang untuk memicu rasa ingin tahu dan mengembangkan potensi unik setiap anak melalui bermain bermakna.
        </motion.p>
      </div>

      {/* --- WAVE SVG (PERBAIKAN) --- */}
      <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
        <svg 
            viewBox="0 0 1440 320" 
            // PERBAIKAN DISINI:
            // 1. h-[80px] md:h-[140px]: Membatasi tinggi gelombang agar tidak menutupi teks.
            // 2. preserveAspectRatio="none": Memaksa gelombang gepeng/stretch sesuai tinggi yang kita atur.
            className="w-full h-[80px] md:h-[140px] block"
            preserveAspectRatio="none"
        >
            <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,138.7C672,117,768,107,864,122.7C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
        </svg>
      </div>

    </section>
  );
}