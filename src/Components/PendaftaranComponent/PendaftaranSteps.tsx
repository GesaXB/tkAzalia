"use client";
import { ClipboardEdit, UserCheck, CreditCard, School } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Isi Formulir", desc: "Lengkapi data diri anak & orang tua secara online.", icon: ClipboardEdit },
  { id: 2, title: "Wawancara", desc: "Observasi anak & wawancara orang tua (Offline).", icon: UserCheck },
  { id: 3, title: "Daftar Ulang", desc: "Pembayaran administrasi & pengambilan seragam.", icon: CreditCard },
  { id: 4, title: "Siap Sekolah", desc: "Selamat! Ananda resmi menjadi siswa TK Azalia.", icon: School },
];

export default function PendaftaranSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Alur Pendaftaran</h2>
          <p className="text-gray-600">4 Langkah mudah bergabung dengan keluarga besar TK Azalia</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Garis penghubung (hanya di desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gray-100 -z-0"></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-white border-4 border-green-50 rounded-full flex items-center justify-center mb-6 shadow-lg group hover:border-[#01793B] transition-colors duration-300">
                  <div className="w-16 h-16 bg-[#01793B] rounded-full flex items-center justify-center text-white">
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed px-4">{step.desc}</p>
                
                {/* Number Badge */}
                <div className="absolute top-0 right-8 md:right-16 bg-yellow-400 text-[#01793B] w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                  {step.id}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}