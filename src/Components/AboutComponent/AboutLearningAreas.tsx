"use client";
import React from "react";
import Image from "next/image"; 
import { motion } from "framer-motion";

export default function AboutLearningAreas() {
  const areas = [
    { 
      title: "Ruang Kelas", 
      imageSrc: "/fasilitas.jpeg", 
      alt: "Foto Ruang Kelas TK Azalia dengan mural jerapah" 
    },
    { 
      title: "Area Bermain", 
      imageSrc: "/area_bermain.png", 
      alt: "Foto Area Bermain Dalam Ruangan TK Azalia" 
    },
    { 
      title: "Taman", 
      imageSrc: "/taman.png", 
      alt: "Foto Halaman Depan dan Taman TK Azalia" 
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 pb-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
        Area Pembelajaran
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {areas.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }} 
            whileHover={{ scale: 1.05 }}

            className="bg-white border border-gray-100 p-8 md:p-10 shadow-sm hover:border-[#108043] hover:shadow-md transition-all duration-300 cursor-default group flex flex-col items-center"
          >

            <div className="relative aspect-video w-full overflow-hidden border border-gray-200 mb-6 md:mb-8">
              <Image
                src={item.imageSrc}
                alt={item.alt}
                fill
                className="object-cover" 
              />
            </div>

            <h4 className="font-bold text-gray-900 text-2xl text-center group-hover:text-[#108043] transition-colors mt-auto pb-2">{item.title}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}