"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Sun, BookOpen, Utensils, LogOut } from "lucide-react";

const schedule = [
  { time: "07.30 - 08.00", activity: "Kedatangan & Jurnal Pagi", icon: Sun, color: "text-yellow-500 bg-yellow-100" },
  { time: "08.00 - 08.30", activity: "Ikrar & Senam Ceria", icon: Music, color: "text-blue-500 bg-blue-100" },
  { time: "08.30 - 10.00", activity: "Kegiatan Inti (Sentra Belajar)", icon: BookOpen, color: "text-green-600 bg-green-100" },
  { time: "10.00 - 10.30", activity: "Istirahat & Makan Sehat", icon: Utensils, color: "text-orange-500 bg-orange-100" },
  { time: "10.30 - 11.00", activity: "Refleksi & Pulang", icon: LogOut, color: "text-purple-500 bg-purple-100" },
];

import { Music } from "lucide-react";

export default function ProgramTimeline() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
         <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Clock className="w-8 h-8 text-[#108043]" /> Rutinitas Harian Kami
         </h2>
         <p className="text-lg text-gray-600">Keseimbangan antara belajar terstruktur dan bermain bebas.</p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative">
        {/* Garis Tengah Vertikal */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-gray-200 rounded-full"></div>

        <div className="space-y-12">
          {schedule.map((item, idx) => {
            const Icon = item.icon;
            // Menentukan posisi kiri/kanan untuk tampilan desktop
            const isEven = idx % 2 === 0;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Titik di Tengah */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-[#108043] rounded-full z-10 flex items-center justify-center shadow-sm">
                    <div className="w-3 h-3 bg-[#108043] rounded-full"></div>
                </div>

                {/* Spacer untuk Desktop agar layout zig-zag */}
                <div className="hidden md:block w-1/2"></div>

                {/* Card Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-[0_5px_15px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-md transition-all flex items-center gap-4 group">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-[#108043] mb-1">{item.time}</div>
                        <h4 className="text-lg font-bold text-gray-900">{item.activity}</h4>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
       <p className="text-center text-sm text-gray-500 mt-12 italic bg-gray-50 py-2 rounded-full inline-block px-6 mx-auto w-full md:w-auto">
        *Jadwal fleksibel menyesuaikan kebutuhan anak dan kegiatan khusus.
      </p>
    </section>
  );
}