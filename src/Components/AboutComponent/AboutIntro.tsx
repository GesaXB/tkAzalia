"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutIntro() {
  return (
    // HAPUS overflow-hidden disini agar kotak hijau yang menonjol keluar tidak terpotong
    <section className="max-w-6xl mx-auto px-6 pt-10 pb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
      >
        Mengenal Sekolah Kami
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Bagian Teks (Kiri) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-justify text-base md:text-lg leading-relaxed space-y-6 text-gray-700 font-medium order-2 md:order-1"
        >
          <p>
            <span className="font-bold text-[#108043]">TK AZALIA</span> merupakan sekolah taman kanak-kanak swasta yang
            berlokasi di Purwokerto Selatan, Banyumas. Berdiri sejak 1 Juli
            2019 di bawah naungan Kementerian Pendidikan dan Kebudayaan,
            kami berkomitmen menghadirkan lingkungan belajar yang aman,
            nyaman, dan menyenangkan bagi anak usia dini.
          </p>
          <p>
            Melalui pendidikan yang berfokus pada karakter, kreativitas, dan
            kemandirian, TK AZALIA hadir untuk mendukung tumbuh kembang
            generasi masa depan.
          </p>
        </motion.div>
        
        {/* Bagian Gambar (Kanan) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center mt-8 md:mt-0 pl-6 pb-6 order-1 md:order-2"
        >
           {/* Tambahkan z-0 disini untuk membuat konteks tumpukan baru */}
           <div className="relative w-full max-w-[450px] aspect-[4/3] group z-0">
             
             {/* KOTAK HIJAU: 
                 Ganti '-z-10' menjadi 'z-0'. 
                 Posisinya absolute, dia akan berada di belakang karena urutan HTML-nya duluan 
             */}
             <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-full h-full bg-[#108043]/90 rounded-2xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

             {/* CONTAINER GAMBAR:
                 Tambahkan 'relative z-10'. 
                 Ini memaksa gambar duduk DI ATAS kotak hijau (layer 1 vs layer 0)
             */}
             <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-gray-200 border border-gray-100 z-10">
               <Image 
                  src="/foto-kegiatan.jpeg" 
                  alt="Kegiatan Belajar Mengajar TK Azalia"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 450px"
               />
             </div>
           </div>
        </motion.div>
        
      </div>
    </section>
  );
}