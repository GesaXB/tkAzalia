"use client";
import React from "react";
import { motion } from "framer-motion";

const schedule = [
  { time: "07.30 - 08.00", activity: "Kedatangan & Jurnal Pagi" },
  { time: "08.00 - 08.30", activity: "Ikrar & Senam Ceria" },
  { time: "08.30 - 10.00", activity: "Kegiatan Inti (Sentra)" },
  { time: "10.00 - 10.30", activity: "Istirahat & Makan Bekal" },
  { time: "10.30 - 11.00", activity: "Penutup & Pulang" },
];

export default function ProgramDaily() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Jadwal Harian
      </h2>

      <div className="space-y-4">
        {schedule.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col md:flex-row bg-white border border-gray-200 p-5 rounded-lg hover:shadow-lg transition-shadow items-center md:items-start gap-4"
          >
            <div className="bg-[#108043] text-white px-4 py-1 rounded-full text-sm font-bold min-w-[140px] text-center">
              {item.time}
            </div>
            <div className="text-gray-700 font-medium text-lg">
              {item.activity}
            </div>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-8 italic">
        *Jadwal dapat berubah menyesuaikan kegiatan khusus sekolah
      </p>
    </section>
  );
}