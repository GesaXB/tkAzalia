"use client";
import React from "react";
import { motion } from "framer-motion";

export default function AboutLearningAreas() {
  const areas = [
    { title: "Area Baca Tulis" },
    { title: "Area Musik" },
    { title: "Area Balok" },
    { title: "Area Agama" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 pb-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Area Pembelajaran
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {areas.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="border border-gray-200 p-6 rounded-xl text-center shadow-sm flex flex-col items-center bg-white hover:border-[#108043] hover:shadow-md transition-colors cursor-default group"
          >
            <div className="w-16 h-16 bg-[#108043] rounded-full mb-4 flex items-center justify-center shadow-md group-hover:bg-[#0c6b37] transition-colors">
               {/* Bulatan Hijau */}
               <div className="w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            <h4 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h4>
            <p className="text-xs text-gray-500">
              Belajar melalui aktivitas yang menyenangkan.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}