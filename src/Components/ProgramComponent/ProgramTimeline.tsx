"use client";
import React from "react";
import { motion } from "framer-motion";
import { Clock, Music, Heart, BookOpen, Smile, Utensils, LogOut } from "lucide-react";

// JADWAL BARU SESUAI PERMINTAAN
const schedule = [
  { 
    time: "07.30 - 08.00", 
    activity: "Senam Ceria", 
    icon: Music, 
    color: "text-yellow-600 bg-yellow-100" 
  },
  { 
    time: "08.00 - 08.30", 
    activity: "Doa Pagi, Sholat Dhuha, Dzikir Pagi", 
    icon: Heart, 
    color: "text-blue-600 bg-blue-100" 
  },
  { 
    time: "08.30 - 09.30", 
    activity: "Belajar", 
    icon: BookOpen, 
    color: "text-[#108043] bg-green-100" 
  },
  { 
    time: "09.30 - 10.00", 
    activity: "Bermain di Luar", 
    icon: Smile, 
    color: "text-orange-600 bg-orange-100" 
  },
  { 
    time: "10.00 - 10.15", 
    activity: "Makan", 
    icon: Utensils, 
    color: "text-rose-600 bg-rose-100" 
  },
  { 
    time: "10.15 - 10.30", 
    activity: "Doa Pulang dan Penutupan", 
    icon: LogOut, 
    color: "text-purple-600 bg-purple-100" 
  },
];

export default function ProgramTimeline() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
         <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Clock className="w-6 h-6 text-[#108043]" /> Rutinitas Harian
         </h2>
         <div className="w-16 h-1 bg-[#108043] rounded-full mx-auto mb-4"></div>
         <p className="text-base text-gray-600 max-w-2xl mx-auto">
           Jadwal kegiatan sehari-hari yang menyeimbangkan aktivitas fisik, spiritual, dan kognitif anak.
         </p>
      </div>

      {/* TIMELINE CONTAINER */}
      <div className="relative">
        {/* Garis Tengah Vertikal */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-1 bg-green-100 rounded-full"></div>

        {/* Jarak antar card diperkecil menjadi space-y-8 */}
        <div className="space-y-8">
          {schedule.map((item, idx) => {
            const Icon = item.icon;
            // Menentukan posisi kiri/kanan untuk tampilan desktop agar zig-zag
            const isEven = idx % 2 === 0;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Titik di Tengah (Diperkecil) */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-[3px] border-[#108043] rounded-full z-10 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-[#108043] rounded-full"></div>
                </div>

                {/* Spacer untuk Desktop agar layout zig-zag */}
                <div className="hidden md:block w-1/2"></div>

                {/* Card Content dengan Hover Lift */}
                <motion.div 
                  whileHover={{ 
                    y: -5, // Efek terangkat juga dibuat lebih subtle (lembut)
                    scale: 1.01,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
                  }}
                  // Jarak margin kiri disesuaikan dengan titik yang baru
                  className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-10' : 'md:pl-10'} cursor-pointer`}
                >
                  {/* Card Padding dan Rounded diperkecil */}
                  <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 transition-all flex items-center gap-4 group">
                    
                    {/* Ukuran kotak Ikon diperkecil (w-11 h-11) */}
                    <div className={`w-11 h-11 ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    
                    <div>
                        <div className="text-xs font-extrabold text-[#108043] mb-0.5 tracking-wide">{item.time}</div>
                        {/* Ukuran teks judul kegiatan diperkecil menjadi text-base */}
                        <h4 className="text-base font-bold text-gray-900 group-hover:text-[#108043] transition-colors">{item.activity}</h4>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
      
       <p className="text-center text-xs text-gray-500 mt-12 italic bg-gray-50 py-2.5 rounded-full inline-block px-6 mx-auto w-full md:w-auto border border-gray-100">
        *Jadwal bersifat fleksibel menyesuaikan kondisi anak dan kegiatan sekolah.
      </p>
    </section>
  );
}