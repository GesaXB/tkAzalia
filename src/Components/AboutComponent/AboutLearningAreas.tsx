"use client";
import React from "react";
import Image from "next/image"; 
import { motion } from "framer-motion";
import { BookOpen, Gamepad2, Trees, Sparkles } from "lucide-react";

export default function AboutLearningAreas() {
  const areas = [
    { 
      title: "Ruang Kelas", 
      icon: <BookOpen size={24} />,
      imageSrc: "/fasilitas.jpeg", 
      alt: "Foto Ruang Kelas TK Azalia dengan mural jerapah",
      description: "Ruangan interaktif yang didesain aman dengan berbagai media edukatif untuk merangsang kognitif anak secara optimal.",
      color: "bg-blue-500"
    },
    { 
      title: "Area Bermain", 
      icon: <Gamepad2 size={24} />,
      imageSrc: "/area_bermain.png", 
      alt: "Foto Area Bermain Dalam Ruangan TK Azalia",
      description: "Pusat eksplorasi motorik kasar dan halus melalui berbagai permainan yang dirancang khusus untuk kegembiraan anak.",
      color: "bg-orange-500"
    },
    { 
      title: "Taman Lingkungan", 
      icon: <Trees size={24} />,
      imageSrc: "/taman.png", 
      alt: "Foto Halaman Depan dan Taman TK Azalia",
      description: "Ruang terbuka hijau sebagai sarana interaksi alam, memberikan kebebasan bagi anak untuk bereksplorasi di udara segar.",
      color: "bg-emerald-500"
    },
  ];

  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-40">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4 border border-emerald-100/50"
          >
            <Sparkles size={14} className="animate-pulse" />
            Fasilitas Sekolah
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            Lingkungan Belajar yang <br className="hidden md:block" /> 
            <span className="text-emerald-600">Nyaman & Inspiratif</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm md:text-lg leading-relaxed"
          >
            Kami percaya bahwa lingkungan yang tepat adalah guru ketiga bagi anak-anak. 
            TK Azalia menyediakan ruang yang dirancang khusus untuk mendukung setiap tahapan perkembangan.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {areas.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "circOut" }} 
              className="group relative flex flex-col"
            >
              {/* Card Container */}
              <div className="relative z-10 bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full transform transition-all duration-500 group-hover:-translate-y-4">
                
                {/* Image Section with Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.imageSrc}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating Icon */}
                  <div className={`absolute bottom-6 right-6 w-14 h-14 ${item.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100`}>
                    {item.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-10 flex flex-col grow relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-2 h-2 rounded-full ${item.color.replace('bg-', 'bg-')}`}></div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Discovery Space</span>
                  </div>
                  
                  <h4 className="font-black text-gray-900 text-xl md:text-2xl mb-4 group-hover:text-emerald-600 transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                    Lihat Selengkapnya 
                    <span>→</span>
                  </div>
                </div>
              </div>

              {/* Decorative Shadow Blur */}
              <div className={`absolute inset-x-8 bottom-0 h-10 ${item.color} opacity-20 blur-2xl -z-0 transition-all duration-500 group-hover:opacity-30 group-hover:h-20`}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}