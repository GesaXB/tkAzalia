"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

interface CountdownProps {
  tanggalSelesai: string;
  isOpened: boolean;
}

export default function PpdbCountdown({ tanggalSelesai, isOpened }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(tanggalSelesai) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          isExpired: false,
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [tanggalSelesai]);

  if (!isOpened || timeLeft.isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-100 flex items-center gap-4 text-red-800"
      >
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Pendaftaran Ditutup</h3>
          <p className="text-sm opacity-90">Periode pendaftaran SPMB tahun ini telah berakhir.</p>
        </div>
      </motion.div>
    );
  }

  // Warning when less than 3 days
  const isUrgent = timeLeft.days < 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-8 p-6 rounded-3xl border transition-all duration-500 overflow-hidden relative group ${
        isUrgent 
        ? "bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 shadow-orange-100/50 shadow-lg" 
        : "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-emerald-100/50 shadow-lg"
      }`}
    >
      {/* Decorative patterns */}
      <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20 pointer-events-none ${isUrgent ? 'bg-orange-400' : 'bg-emerald-400'}`} />
      
      <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
            isUrgent ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
          }`}>
            <Clock className={`w-7 h-7 ${isUrgent ? 'animate-pulse' : ''}`} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl text-slate-900 leading-tight">
              Batas Waktu Pendaftaran
            </h3>
            <p className="text-slate-600 font-medium text-sm mt-0.5">
              Ayo selengkapnya data Anda sebelum periode berakhir!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 md:gap-4">
          {[
            { label: "HARI", value: timeLeft.days },
            { label: "JAM", value: timeLeft.hours },
            { label: "MENIT", value: timeLeft.minutes },
            { label: "DETIK", value: timeLeft.seconds },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-md bg-white border ${
                isUrgent ? 'border-orange-100 text-orange-600' : 'border-emerald-100 text-emerald-600'
              }`}>
                <span className="text-xl md:text-2xl font-black tabular-nums">
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-[10px] font-bold mt-2 tracking-widest text-slate-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
