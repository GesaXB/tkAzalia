"use client";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProgramSection() {
  const programs = [
    {
      id: 1,
      icon: BookOpen,
      title: "Kelompok A - Bermain",
      subtitle: "Usia 4-5 Tahun",
      description: "Fokus pada sosialisasi, pengenalan huruf/angka dasar, dan kemandirian melalui permainan edukatif.",
      color: "bg-orange-50 text-orange-600 border-orange-200",
      hover: "group-hover:bg-orange-500"
    },
    {
      id: 2,
      icon: GraduationCap,
      title: "Kelompok B - Persiapan",
      subtitle: "Usia 5-6 Tahun",
      description: "Persiapan matang menuju SD dengan penguatan Calistung (Baca Tulis Hitung) yang menyenangkan.",
      color: "bg-blue-50 text-blue-600 border-blue-200",
      hover: "group-hover:bg-blue-500"
    }
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Program Pendidikan
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#01793B] rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Kurikulum yang disesuaikan dengan tahap perkembangan emas (Golden Age) buah hati Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, idx) => {
            const IconComponent = program.icon;
            return (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                <div className={`w-16 h-16 ${program.color} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${program.hover} group-hover:text-white`}>
                  <IconComponent className="w-8 h-8" strokeWidth={2} />
                </div>

                <div className="mb-4">
                    <span className="text-sm font-bold tracking-wider text-gray-400 uppercase">{program.subtitle}</span>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{program.title}</h3>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {program.description}
                </p>

                <div className="flex items-center text-[#01793B] font-bold group-hover:gap-3 gap-2 transition-all cursor-pointer">
                  Selengkapnya <ArrowRight className="w-5 h-5" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}