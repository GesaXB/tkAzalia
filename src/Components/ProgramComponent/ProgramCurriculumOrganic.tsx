"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Brain, Hand, Smile, Palette, BookOpen } from "lucide-react";

// Data Hardcode dengan Ikon Lucide
const aspects = [
  { title: "Nilai Agama & Moral", desc: "Menanamkan perilaku mulia dan kebiasaan beribadah sederhana.", icon: Heart, color: "bg-green-100 text-green-600", border: "hover:border-green-400" },
  { title: "Kognitif & Logika", desc: "Mengembangkan kemampuan berpikir kritis dan pemecahan masalah.", icon: Brain, color: "bg-blue-100 text-blue-600", border: "hover:border-blue-400" },
  { title: "Fisik Motorik", desc: "Melatih koordinasi tubuh kasar dan halus melalui aktivitas aktif.", icon: Hand, color: "bg-red-100 text-red-600", border: "hover:border-red-400" },
  { title: "Sosial Emosional", desc: "Membangun kepercayaan diri, empati, dan kemampuan bekerja sama.", icon: Smile, color: "bg-yellow-100 text-yellow-600", border: "hover:border-yellow-400" },
  { title: "Seni & Kreativitas", desc: "Mengekspresikan imajinasi melalui berbagai media seni.", icon: Palette, color: "bg-purple-100 text-purple-600", border: "hover:border-purple-400" },
  { title: "Bahasa & Literasi", desc: "Memperkaya kosakata dan kemampuan berkomunikasi.", icon: BookOpen, color: "bg-orange-100 text-orange-600", border: "hover:border-orange-400" },
];

export default function ProgramCurriculumOrganic() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">6 Pilar Perkembangan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Fokus utama kurikulum kami untuk membangun pondasi yang kuat bagi buah hati Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aspects.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              // INOVASI: Bentuk rounded yang tidak simetris (Organic Shape)
              className={`bg-white p-8 rounded-[2rem_1rem_2rem_1rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] border-2 border-transparent ${item.border} transition-all duration-300 group`}
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl rotate-3 group-hover:rotate-6 transition-transform flex items-center justify-center mb-6 shadow-sm`}>
                <Icon className="w-8 h-8" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}