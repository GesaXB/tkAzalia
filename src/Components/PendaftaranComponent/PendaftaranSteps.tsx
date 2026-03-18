"use client";
import { ClipboardEdit, UserCheck, CreditCard, School } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Isi Formulir",
    desc: "Lengkapi data diri anak dan orang tua secara online melalui akun yang telah didaftarkan.",
    icon: ClipboardEdit,
  },
  {
    id: 2,
    title: "Wawancara & Observasi",
    desc: "Hadir ke sekolah untuk sesi observasi anak dan wawancara bersama orang tua.",
    icon: UserCheck,
  },
  {
    id: 3,
    title: "Daftar Ulang",
    desc: "Selesaikan pembayaran administrasi dan pengambilan seragam di sekolah.",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Siap Bersekolah",
    desc: "Selamat! Ananda resmi menjadi bagian dari keluarga besar TK Azalia.",
    icon: School,
  },
];

export default function PendaftaranSteps() {
  return (
    <section id="alur" className="py-20 bg-slate-50/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[11px] font-bold text-[#01793B] uppercase tracking-widest mb-3">Proses Pendaftaran</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Alur Pendaftaran</h2>
          <p className="text-gray-500 text-sm max-w-md mx-auto">4 langkah mudah untuk bergabung dengan keluarga besar TK Azalia</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="relative bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {/* Step number */}
                <span className="absolute top-4 right-4 text-[11px] font-black text-gray-200 uppercase tracking-widest">
                  0{step.id}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B] mb-5">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Text */}
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>

                {/* Bottom connector line for desktop (except last) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[2.75rem] -right-3 w-6 h-px bg-gray-200 z-10" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}