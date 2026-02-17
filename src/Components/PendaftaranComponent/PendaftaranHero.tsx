"use client";
import { motion } from "framer-motion";
import { CalendarDays, Download } from "lucide-react";

export default function PendaftaranHero() {
  return (
    <section className="relative w-full pt-32 pb-20 md:pt-40 md:pb-32 px-6 bg-gradient-to-br from-[#01793B] to-[#015c2e] overflow-hidden text-white">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-400 rounded-full blur-[80px] opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 font-bold text-sm mb-6 tracking-wide shadow-lg">
            <CalendarDays className="w-4 h-4" />
            Tahun Ajaran 2026/2027
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-md">
            Penerimaan Peserta Didik Baru <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
              (PPDB) TK Azalia
            </span>
          </h1>

          <p className="text-green-50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Bergabunglah bersama kami untuk mencetak generasi cerdas, ceria, dan berakhlak mulia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('form-daftar')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-xl shadow-[0_10px_20px_-5px_rgba(250,204,21,0.4)] hover:bg-yellow-300 hover:scale-105 transition-all w-full sm:w-auto">
              Daftar Sekarang
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
              <Download className="w-5 h-5" />
              Download Brosur
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}