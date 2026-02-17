"use client";
import Link from 'next/link';
import BackgroundDecoration from '../shared/BackgroundDecoration';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative text-center flex flex-col items-center justify-center min-h-[85vh] px-4 overflow-hidden bg-gradient-to-b from-white to-green-50/30">
      
      {/* Background Decoration tetap ada, tapi kita tambah blur sedikit biar fokus ke teks */}
      <div className="absolute inset-0 z-0 opacity-60">
         <BackgroundDecoration />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-2 text-center -mt-10 md:-mt-20">

        {/* Judul Utama */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight"
        >
          Selamat Datang di <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01793B] to-emerald-500">
            TK Azalia
          </span>
        </motion.h1>

        {/* Deskripsi */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-10 max-w-2xl mx-auto"
        >
          <p className="text-base md:text-xl text-gray-600 font-medium leading-relaxed">
            Rumah kedua bagi buah hati Anda untuk tumbuh <span className="text-[#01793B] font-bold">cerdas</span>, <span className="text-[#01793B] font-bold">kreatif</span>, dan berakhlak <span className="text-[#01793B] font-bold">mulia</span> dalam lingkungan yang penuh kasih sayang.
          </p>
        </motion.div>

        {/* Tombol CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/about"
            className="group relative inline-flex items-center gap-3 bg-[#01793B] text-white px-8 py-4 rounded-full text-base font-bold
                      shadow-[0_10px_20px_rgba(1,121,59,0.25)] hover:shadow-[0_15px_30px_rgba(1,121,59,0.4)]
                      transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:bg-[#01602e]
                      active:scale-95"
          >
            Pelajari Profil Kami
            <span className="bg-white/20 rounded-full p-1 group-hover:bg-white group-hover:text-[#01793B] transition-colors duration-300">
              <ArrowRight className="w-5 h-5" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}