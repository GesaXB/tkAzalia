"use client";
import React from "react";
import { motion } from "framer-motion";
import { Pencil, Backpack, Stars, Sparkles, BookOpen, GraduationCap } from "lucide-react";

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
  // Jika tidak ada kelas di database, sembunyikan section ini
  if (!classes || classes.length === 0) {
    return null;
  }

  const designTokens = [
    {
      icon: <Pencil size={32} />,
      color: "from-blue-500 to-blue-600",
      lightColor: "bg-blue-50",
    },
    {
      icon: <Backpack size={32} />,
      color: "from-emerald-500 to-emerald-600",
      lightColor: "bg-emerald-50",
    },
    {
      icon: <BookOpen size={32} />,
      color: "from-purple-500 to-purple-600",
      lightColor: "bg-purple-50",
    },
    {
      icon: <GraduationCap size={32} />,
      color: "from-amber-500 to-amber-600",
      lightColor: "bg-amber-50",
    }
  ];

  const displayPrograms = classes.map((k, idx) => {
    const token = designTokens[idx % designTokens.length];
    return {
      title: k.nama,
      icon: token.icon,
      color: token.color,
      lightColor: token.lightColor,
      description: k.deskripsi || "Deskripsi program belum tersedia."
    };
  });

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-yellow-50 rounded-full blur-3xl opacity-60 -z-10"></div>
      
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-6 border border-emerald-100/50"
        >
          <Stars size={14} className="text-emerald-500" />
          Jenjang Pendidikan
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black text-gray-900 leading-tight"
        >
          Program Belajar yang <br />
          <span className="text-emerald-600">Terstruktur & Menyenangkan</span>
        </motion.h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {displayPrograms.map((program, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="group relative flex flex-col bg-white rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl shadow-gray-200/50 hover:shadow-emerald-200/40 transition-all duration-500"
          >
            {/* Header Section */}
            <div className={`relative h-48 md:h-64 bg-gradient-to-br ${program.color} p-8 md:p-12 flex flex-col justify-end text-white overflow-hidden`}>
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px:20px]"></div>
               <div className="absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
               
               <div className="relative z-10 space-y-2">
                 <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 shadow-xl border border-white/20">
                    {program.icon}
                 </div>
                 <h3 className="text-2xl md:text-4xl font-black tracking-tight">{program.title}</h3>
               </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col grow relative">
              <div className="absolute top-8 right-8 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
                <Sparkles size={80} strokeWidth={1} />
              </div>
              
              <p className="text-gray-600 text-sm md:text-lg leading-relaxed md:leading-relaxed text-justify mb-8 relative z-10 font-medium">
                {program.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Kurikulum Merdeka</span>
                <div className={`w-8 h-8 ${program.lightColor} text-current rounded-full flex items-center justify-center`}>
                  <div className={`w-2 h-2 rounded-full bg-current`}></div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}