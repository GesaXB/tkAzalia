"use client";
import React from "react";
import { motion } from "framer-motion";

interface KelasProps {
  kelas_id: number;
  nama: string;
  deskripsi: string | null;
  urutan: number;
}

interface AboutProgramsProps {
  classes?: KelasProps[];
}

export default function AboutPrograms({ classes }: AboutProgramsProps) {
  const defaultPrograms = [
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

  const displayPrograms = classes && classes.length > 0
    ? classes.map((k) => ({
        title: k.nama,
        age: "", // DB model doesn't store age directly
        description: k.deskripsi || ""
      }))
    : defaultPrograms;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pt-6 md:pt-10 pb-12 md:pb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-12 text-gray-900"
      >
        Program Kami
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
        {displayPrograms.map((program, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ y: -5 }} 
            className="flex flex-col rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl md:shadow-lg md:hover:shadow-2xl transition-all duration-300 bg-white h-full border border-gray-100"
          >
            {/* Header Hijau */}
            <div className="bg-[#108043] py-5 md:py-8 px-4 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 md:w-20 h-16 md:h-20 bg-white opacity-10 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10"></div>
              <h3 className="text-lg md:text-3xl font-medium md:font-normal mb-1 md:mb-2 relative z-10">{program.title}</h3>
              {program.age && <p className="text-[10px] md:text-sm font-medium tracking-wide relative z-10 opacity-90">{program.age}</p>}
            </div>

            {/* Body */}
            <div className="p-5 md:p-10 grow flex items-center bg-white">
              <p className="text-gray-600 md:text-gray-700 text-xs md:text-lg leading-relaxed md:leading-relaxed text-justify">
                {program.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}