"use client";
import React from "react";
import { motion } from "framer-motion";
import { Baby, GraduationCap, Users } from "lucide-react";

interface KelasProps {
  kelas_id: number;
  nama: string;
  deskripsi: string | null;
  urutan: number;
}

interface ProgramClassesProps {
  classes?: KelasProps[];
}

const defaultKelompokData = [
  {
    name: "Kelompok A",
    age: "Usia 4 - 5 Tahun",
    desc: "Fokus pada adaptasi lingkungan, kemandirian dasar, serta pengenalan huruf dan angka melalui bermain.",
    icon: Baby,
    color: "bg-orange-50 text-orange-600 border-orange-200",
  },
  {
    name: "Kelompok B1",
    age: "Usia 5 - 6 Tahun",
    desc: "Pengembangan kemampuan kognitif yang lebih kompleks, persiapan literasi, dan sosialisasi intensif.",
    icon: Users,
    color: "bg-blue-50 text-blue-600 border-blue-200",
  },
  {
    name: "Kelompok B2",
    age: "Usia 5 - 6 Tahun",
    desc: "Pemantapan persiapan menuju jenjang Sekolah Dasar (SD) dengan penguatan karakter dan calistung dasar.",
    icon: GraduationCap,
    color: "bg-purple-50 text-purple-600 border-purple-200",
  },
];

const availableIcons = [Baby, Users, GraduationCap];
const availableColors = [
  "bg-orange-50 text-orange-600 border-orange-200",
  "bg-blue-50 text-blue-600 border-blue-200",
  "bg-purple-50 text-purple-600 border-purple-200"
];

export default function ProgramClasses({ classes }: ProgramClassesProps) {

  const displayClasses = classes && classes.length > 0 
    ? classes.map((k, idx) => ({
        name: k.nama,
        age: "", 
        desc: k.deskripsi || "",
        icon: availableIcons[idx % availableIcons.length],
        color: availableColors[idx % availableColors.length],
      }))
    : defaultKelompokData;

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2 md:mb-4">Daftar Kelompok Belajar</h2>
        <div className="w-16 md:w-20 h-1.5 bg-[#108043] rounded-full mx-auto mb-4 md:mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-lg">
          Pembagian kelas berdasarkan usia untuk memastikan kurikulum yang diberikan tepat sasaran sesuai perkembangan anak.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-stretch">
        {displayClasses.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{
                y: -10,
                scale: 1.02,
                boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.15)'
              }}
              className="group bg-white p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border md:border-2 border-gray-100 shadow-sm md:shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer"
            >

              <div className="absolute -top-10 -right-10 w-24 md:w-32 h-24 md:h-32 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors duration-500 -z-10"></div>

              <div className={`w-12 h-12 md:w-16 md:h-16 ${item.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover:rotate-6 transition-transform duration-500`}>
                <Icon className="w-6 h-6 md:w-8 md:h-8" />
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">{item.name}</h3>
              {item.age && <p className="text-xs md:text-sm font-bold text-[#108043] mb-3 md:mb-5 tracking-widest uppercase">{item.age}</p>}

              <p className="text-gray-600 leading-snug md:leading-relaxed text-sm md:text-base flex-grow font-medium">
                {item.desc}
              </p>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-100 flex items-center gap-2 text-[10px] md:text-xs font-bold text-[#108043]/60">
                <Users className="w-3 h-3 md:w-4 md:h-4" />
                <span>Tersedia 20 Kursi / Kelas</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
