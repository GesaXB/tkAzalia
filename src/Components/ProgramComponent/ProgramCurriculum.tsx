"use client";
import React from "react";
import { motion } from "framer-motion";

// Data Dummy Kurikulum (Aman tanpa Database)
const aspects = [
  {
    title: "Nilai Agama & Moral",
    desc: "Mengenalkan doa harian, surat pendek, dan perilaku mulia sejak dini.",
    icon: "🕌",
  },
  {
    title: "Fisik Motorik",
    desc: "Melatih koordinasi gerak tubuh, kesehatan, dan ketangkasan anak.",
    icon: "🏃",
  },
  {
    title: "Kognitif",
    desc: "Mengembangkan kemampuan berpikir logis, mengenal angka, dan pemecahan masalah.",
    icon: "🧩",
  },
  {
    title: "Bahasa",
    desc: "Memperkaya kosakata, kemampuan bercerita, dan persiapan membaca.",
    icon: "📚",
  },
  {
    title: "Sosial Emosional",
    desc: "Membangun rasa percaya diri, kemandirian, dan kerjasama dengan teman.",
    icon: "🤝",
  },
  {
    title: "Seni & Kreativitas",
    desc: "Mengekspresikan imajinasi melalui menggambar, menyanyi, dan prakarya.",
    icon: "🎨",
  },
];

export default function ProgramCurriculum() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Kurikulum Pembelajaran</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Kami menerapkan pendekatan belajar sambil bermain yang mencakup 6 aspek perkembangan utama.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aspects.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-2xl shadow-[0_5px_20px_-5px_rgba(0,0,0,0.1)] border border-gray-100 hover:border-[#108043] transition-colors group"
          >
            <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:bg-[#108043] group-hover:text-white transition-colors">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}