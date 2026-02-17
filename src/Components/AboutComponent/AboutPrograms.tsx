"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutPrograms() {
  const programs = [
    {
      title: "Kelompok A",
      age: "(Usia 5-6 Tahun)",
      description: "Pada tahap ini, anak mulai dikenalkan dengan kegiatan belajar yang menyenangkan, seperti mengenal huruf, angka, warna, dan bentuk, serta melatih kemandirian dan kemampuan sosial."
    },
    {
      title: "Kelompok B",
      age: "(Usia 6-7 Tahun)",
      description: "Di kelas ini, anak dibiasakan belajar membaca, menulis, dan berhitung dasar, serta dilatih mengikuti aturan dan bekerja sama, sehingga siap melanjutkan ke Sekolah Dasar."
    }
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 pt-10 pb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
      >
        Program Kami
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {programs.map((program, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -10 }} // Efek Hover: Kartu naik ke atas
            className="flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white h-full border border-gray-100"
          >
            {/* Header Hijau */}
            <div className="bg-[#108043] py-8 px-4 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
              <h3 className="text-3xl font-normal mb-2 relative z-10">{program.title}</h3>
              <p className="text-sm font-medium tracking-wide relative z-10 opacity-90">{program.age}</p>
            </div>

            {/* Body */}
            <div className="p-8 md:p-10 flex-grow flex items-center bg-white">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed text-justify">
                {program.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}