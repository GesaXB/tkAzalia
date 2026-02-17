"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section className="relative w-full pt-20 pb-28 md:pt-28 md:pb-36 flex items-center justify-center overflow-hidden mb-12 min-h-[400px]">
      
      {/* Background Image Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fasilitas.jpeg" 
          alt="Fasilitas Sekolah"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay Gradient: Agar teks putih terbaca jelas & terlihat mahal */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-sm mb-6 tracking-wide uppercase shadow-sm">
            Hubungi Kami
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Kami Siap Membantu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400">
              Ayah & Bunda
            </span>
          </h1>
          
          <p className="text-gray-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Punya pertanyaan seputar pendaftaran, kurikulum, atau kegiatan sekolah?
            Jangan ragu untuk menghubungi kami.
          </p> 
        </motion.div>       
      </div>
    </section>
  );
}