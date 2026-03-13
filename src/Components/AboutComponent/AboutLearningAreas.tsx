"use client";
import React from "react";
import Image from "next/image"; 
import { motion } from "framer-motion";

export default function AboutLearningAreas() {
  const areas = [
    { 
      title: "Ruang Kelas", 
      imageSrc: "/fasilitas.jpeg", 
      alt: "Foto Ruang Kelas TK Azalia dengan mural jerapah",
      description: "Ruangan yang didesain interaktif dan aman dengan fasilitas edukatif untuk mendukung proses belajar yang menyenangkan."
    },
    { 
      title: "Area Bermain", 
      imageSrc: "/area_bermain.png", 
      alt: "Foto Area Bermain Dalam Ruangan TK Azalia",
      description: "Area yang dilengkapi berbagai permainan edukatif untuk merangsang motorik dan kreativitas anak."
    },
    { 
      title: "Taman", 
      imageSrc: "/taman.png", 
      alt: "Foto Halaman Depan dan Taman TK Azalia",
      description: "Lingkungan hijau dan asri, memberikan ruang gerak bebas bagi anak untuk bereksplorasi dan berinteraksi dengan alam."
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-32">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-16 text-gray-900">
        Area Pembelajaran
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {areas.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }} 
            className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col border border-gray-100 cursor-pointer"
          >

            <div className="relative aspect-video w-full overflow-hidden border-b border-gray-100">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              <Image
                src={item.imageSrc}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </div>

            <div className="p-5 md:p-8 flex flex-col grow text-center items-center relative">
              <div className="w-8 h-1 bg-[#108043]/30 rounded-full mb-4 group-hover:w-16 group-hover:bg-[#108043] transition-all duration-500"></div>
              <h4 className="font-bold text-gray-900 text-lg md:text-2xl group-hover:text-[#108043] transition-colors mb-2 md:mb-3">
                {item.title}
              </h4>
              <p className="text-gray-600 text-xs md:text-base leading-relaxed md:leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}