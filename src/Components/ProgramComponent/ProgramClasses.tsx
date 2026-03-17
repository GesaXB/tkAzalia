"use client";
import React from "react";
import { motion } from "framer-motion";
import { Baby, Users, GraduationCap, LucideIcon, BookOpen } from "lucide-react";

interface Kelas {
  kelas_id: number;
  nama: string;
  deskripsi: string | null;
  urutan: number;
  kuota: number;
}

interface ProgramClassesProps {
  classes: Kelas[];
}

const colorMap: Record<string, string> = {
  "Kelompok A": "bg-orange-50 text-orange-600 border-orange-200",
  "Kelompok B": "bg-blue-50 text-blue-600 border-blue-200",
  "Kelompok B1": "bg-blue-50 text-blue-600 border-blue-200",
  "Kelompok B2": "bg-purple-50 text-purple-600 border-purple-200",
};

const iconMap: Record<string, LucideIcon> = {
  "Kelompok A": Baby,
  "Kelompok B": Users,
  "Kelompok B1": Users,
  "Kelompok B2": GraduationCap,
};

export default function ProgramClasses({ classes }: ProgramClassesProps) {
  // Sort classes by urutan
  const sortedClasses = [...classes].sort((a, b) => a.urutan - b.urutan);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Daftar Kelompok Belajar</h2>
        <div className="w-20 h-1.5 bg-[#108043] rounded-full mx-auto mb-6"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Pembagian kelas berdasarkan usia untuk memastikan kurikulum yang diberikan tepat sasaran sesuai perkembangan anak.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
        {sortedClasses.map((item, idx) => {
          const Icon = iconMap[item.nama] || BookOpen;
          const colorClass = colorMap[item.nama] || "bg-emerald-50 text-emerald-600 border-emerald-200";
          const ageText = item.nama === "Kelompok A" ? "Usia 4 - 5 Tahun" : "Usia 5 - 6 Tahun";

          return (
            <motion.div
              key={item.kelas_id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{
                y: -20,
                scale: 1.02,
                boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.15)"
              }}
              className="group bg-white p-8 rounded-[2.5rem] border-2 border-gray-100 shadow-md transition-all duration-300 flex flex-col h-full relative overflow-hidden cursor-pointer"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gray-50 rounded-full group-hover:bg-green-50 transition-colors duration-500 -z-10"></div>

              <div className={`w-16 h-16 ${colorClass} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:rotate-6 transition-transform duration-500`}>
                <Icon className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.nama}</h3>
              <p className="text-sm font-bold text-[#108043] mb-5 tracking-widest uppercase">{ageText}</p>

              <p className="text-gray-600 leading-relaxed text-base flex-grow font-medium">
                {item.deskripsi || "Program pendidikan yang dirancang khusus untuk tumbuh kembang optimal anak."}
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#108043]/60">
                <Users className="w-4 h-4" />
                <span>Kuota: {item.kuota} Siswa / Kelas</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
