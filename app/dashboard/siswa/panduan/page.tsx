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
    <>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-6">
          {error}
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Alur Pendaftaran</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${step.color}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {informasi.some(i => i.tipe === "syarat_pendaftaran") && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-slate-500" />
              Informasi Tambahan
            </h3>
            <div className="grid gap-4">
              {informasi.filter(i => i.tipe === "syarat_pendaftaran").map((item) => (
                <div key={item.info_id} className="border border-slate-200/80 bg-slate-50/50 rounded-2xl p-5">
                  <h4 className="font-semibold text-slate-900 mb-2">{item.judul}</h4>
                  <p className="text-sm text-slate-600 whitespace-pre-line leading-relaxed">{item.konten}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}


