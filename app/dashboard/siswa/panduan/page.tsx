"use client";

import { listInformasiPublik, PublicInformasiSekolahItem } from "@/lib/client/public";
import { motion } from "framer-motion";
import { CheckCircle, FileCheck, FileText, HelpCircle, Info, Upload, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiswaPanduanPpdbPage() {
  const [error, setError] = useState<string | null>(null);
  const [informasi, setInformasi] = useState<PublicInformasiSekolahItem[]>([]);

  useEffect(() => {
    const load = async () => {
      setError(null);
      const infoRes = await listInformasiPublik();
      if (!infoRes.success) {
        setError(infoRes.error || "Gagal memuat informasi SPMB");
      } else {
        setInformasi(infoRes.data || []);
      }
    };
    load();
  }, []);

  const steps = [
    {
      title: "1. Registrasi Akun",
      desc: "Buat akun baru menggunakan email dan password yang valid. Pastikan email aktif untuk menerima notifikasi penting.",
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "2. Lengkapi Data Pendaftaran",
      desc: "Masuk ke menu 'Data Pendaftaran' dan isi formulir dengan data siswa, data orang tua, dan informasi lainnya sesuai dokumen resmi.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "3. Upload Berkas Persyaratan",
      desc: "Unggah scan/foto Akte Kelahiran, Kartu Keluarga, dan Pas Foto terbaru di menu 'Upload Berkas'. Pastikan dokumen jelas dan terbaca.",
      icon: <Upload className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "4. Verifikasi Data oleh Admin",
      desc: "Admin TK Azalia akan memeriksa kelengkapan data dan berkas Anda. Pantau status verifikasi secara berkala di menu 'Status SPMB'.",
      icon: <FileCheck className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "5. Pengumuman Hasil Seleksi",
      desc: "Cek hasil akhir pendaftaran di menu 'Status SPMB'. Jika diterima, ikuti petunjuk daftar ulang dari sekolah TK Azalia.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "bg-rose-100 text-rose-600",
    },
  ];

  return (
    <div className="pb-20">
      {error && (
        <div className="text-sm font-black text-red-600 bg-red-50 border border-red-100 rounded-3xl px-8 py-4 mb-10 animate-pulse uppercase tracking-widest shadow-sm">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="p-4 bg-emerald-50 text-[#01793B] rounded-3xl shadow-inner group transition-all">
            <HelpCircle className="w-10 h-10 group-hover:scale-110 transition-transform" />
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Alur Pendaftaran</h2>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-[0.3em]">Langkah mudah bergabung dengan keluarga TK Azalia</p>
          </div>
        </div>

        {/* Vertical Timeline */}
        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-10 md:before:mx-auto before:h-full before:w-1 before:bg-linear-to-b before:from-emerald-100 before:via-blue-100 before:to-slate-100 before:rounded-full">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Icon Dot */}
              <div className="absolute left-10 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center z-10 transition-all group">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color} shadow-inner`}>
                   {step.icon}
                </div>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-[45%] pl-20 md:pl-0">
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-emerald-100 transition-all hover:-translate-y-1 duration-500 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-24 h-24 ${step.color.replace('text-', 'bg-')} opacity-5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700 blur-2xl`} />
                  
                  <div className="relative">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 block">Step {index + 1}</span>
                    <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight group-hover:text-[#01793B] transition-colors">{step.title.split('. ')[1]}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed italic">
                      "{step.desc}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Placeholder for Timeline Spacing */}
              <div className="hidden md:block w-[45%]" />
            </motion.div>
          ))}
        </div>

        {/* Additional Info Cards */}
        {informasi.some(i => i.tipe === "syarat_pendaftaran") && (
          <div className="mt-28 space-y-8">
            <div className="flex items-center gap-4 justify-center md:justify-start">
               <div className="w-1.5 h-8 bg-[#01793B] rounded-full" />
               <h3 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Informasi Tambahan</h3>
            </div>
            
            <div className="grid gap-6">
              {informasi.filter(i => i.tipe === "syarat_pendaftaran").map((item, idx) => (
                <motion.div 
                  key={item.info_id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="group relative overflow-hidden bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/30"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative flex items-start gap-6">
                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-50 text-[#01793B] flex items-center justify-center font-black shadow-inner">?</div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800 mb-3 italic tracking-tight">{item.judul}</h4>
                      <p className="text-slate-600 font-medium leading-loose whitespace-pre-line text-sm">
                        {item.konten}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

}


