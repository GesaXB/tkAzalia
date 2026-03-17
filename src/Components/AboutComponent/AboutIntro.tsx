"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, Building2, Calendar } from "lucide-react";

export default function AboutIntro() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-40 -z-10"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* LEFT: Image with Stylized Frame */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="relative order-2 lg:order-1"
        >
          <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/foto-kegiatan.jpeg"
              alt="Kegiatan Belajar Mengajar TK Azalia"
              fill
              className="object-cover transition-transform duration-1000 hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
          
          {/* Decorative Floaties */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-600 rounded-[2.5rem] -z-10 rotate-12 hidden md:block"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl -z-10 animate-pulse"></div>
          
          {/* Floating Info Tag */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-12 -right-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Berdiri Sejak</p>
              <p className="text-sm font-black text-gray-900">1 Juli 2019</p>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT: Content Area */}
        <div className="order-1 lg:order-2 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h4 className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <span className="w-10 h-[2px] bg-emerald-600"></span>
              Profil Sekolah
            </h4>
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Membangun Fondasi <br />
              <span className="text-emerald-600">Masa Depan</span> Anak
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed"
          >
            <p>
              <span className="font-black text-gray-900 border-b-4 border-emerald-500/20">TK AZALIA</span> adalah taman kanak-kanak swasta yang berlokasi di Purwokerto Selatan, Banyumas. Di bawah naungan Kemendikbud, kami berkomitmen menciptakan lingkungan yang aman dan penuh kasih.
            </p>
            <p>
              Kami percaya setiap anak adalah unik. Melalui kurikulum yang berfokus pada karakter, kreativitas, dan kemandirian, kami mendampingi setiap langkah kecil mereka menuju potensi terbaiknya.
            </p>
          </motion.div>

          {/* Quick Stats/Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-gray-100">
                <Building2 size={24} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">Lokasi Strategis</p>
                <p className="text-xs text-gray-400 font-medium">Purwokerto Selatan</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-emerald-600 border border-gray-100">
                <GraduationCap size={24} />
              </div>
              <div>
                <p className="font-black text-gray-900 text-sm">Akreditasi</p>
                <p className="text-xs text-gray-400 font-medium">Bawah Kemendikbud</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
