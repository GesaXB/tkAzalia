"use client";
import { Building2, Lightbulb, Users, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const reasons = [
  {
    id: 1,
    icon: Users,
    title: "Guru Berpengalaman",
    description: "Pendidik yang sabar, terlatih, dan berdedikasi tinggi.",
  },
  {
    id: 2,
    icon: Building2,
    title: "Fasilitas Lengkap",
    description: "Ruang belajar AC, area bermain aman, dan media pembelajaran modern.",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Metode Kreatif",
    description: "Pembelajaran aktif (Active Learning) yang merangsang motorik dan kognitif.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-16 items-center py-20 px-6">
      
      {/* Kolom Kiri: Teks */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-10">
          <span className="text-[#01793B] font-bold tracking-wider text-sm uppercase mb-2 block">Keunggulan Kami</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Kenapa Orang Tua <br />
            Memilih <span className="text-[#01793B] underline decoration-yellow-400 decoration-4 underline-offset-4">TK Azalia?</span>
          </h2>
        </div>

        <div className="space-y-8">
          {reasons.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex gap-5 items-start group"
              >
                <div className="flex-shrink-0 w-14 h-14 bg-white border-2 border-green-100 rounded-2xl shadow-sm group-hover:border-[#01793B] group-hover:bg-[#01793B] transition-all duration-300 flex items-center justify-center">
                  <IconComponent className="w-7 h-7 text-[#01793B] group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#01793B] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Kolom Kanan: Gambar */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="relative h-[400px] md:h-[500px] w-full hidden md:block"
      >
        {/* Background Blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-100 to-yellow-50 rounded-full blur-3xl -z-10 opacity-60"></div>

        {/* Frame Gambar */}
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
            <Image
              src="/7.jpeg"
              alt="Suasana Belajar di TK Azalia"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                    <p className="font-bold text-lg">Belajar yang Seru!</p>
                    <p className="text-sm opacity-90">Anak senang, Orang tua tenang.</p>
                </div>
            </div>
        </div>

        {/* Floating Badge */}
        <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
            <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="text-[#01793B] w-6 h-6" />
            </div>
            <div>
                <p className="text-xs text-gray-500 font-bold">Terakreditasi</p>
                <p className="text-gray-900 font-bold text-sm">Resmi Kemdikbud</p>
            </div>
        </div>
      </motion.div>
    </section>
  );
}