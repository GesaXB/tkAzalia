"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Rocket, CheckCircle2, Heart } from "lucide-react";

export default function AboutVisionMission() {
  const missions = [
    "Lingkungan belajar yang aman dan penuh kasih",
    "Kurikulum holistik berbasis permainan (Play-based)",
    "Pendampingan oleh guru yang kompeten & sabar",
    "Kolaborasi erat dengan orang tua siswa"
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* VISI CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-emerald-600 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden group shadow-2xl shadow-emerald-200"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center mb-8 shadow-xl">
              <Target size={40} className="text-white" />
            </div>
            
            <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-4 opacity-80">Visi Kami</h3>
            <h2 className="text-2xl md:text-4xl font-black leading-tight">
              "Menjadi taman kanak-kanak terdepan yang mencetak generasi unggul, berkarakter, dan siap masa depan"
            </h2>
          </div>
        </motion.div>

        {/* MISI CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative bg-white rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-2xl shadow-gray-200 overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-6 mb-10">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Rocket size={32} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Misi Kami</h3>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">Misi TK Azalia</h2>
              </div>
            </div>

            <div className="space-y-4">
              {missions.map((m, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-emerald-50 transition-colors group/item shadow-sm border border-transparent hover:border-emerald-100 bg-white md:bg-transparent"
                >
                  <div className="mt-1">
                    <CheckCircle2 size={20} className="text-emerald-500 group-hover/item:scale-110 transition-transform" />
                  </div>
                  <p className="text-gray-700 font-bold text-sm md:text-base">{m}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
