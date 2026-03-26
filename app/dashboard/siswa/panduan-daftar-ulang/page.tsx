"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, CreditCard, FileText, Globe, GraduationCap, MapPin, Printer } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PanduanDaftarUlangPage() {
  const router = useRouter();

  const steps = [
    {
      title: "1. Konfirmasi Pembayaran",
      desc: "Lakukan pembayaran biaya masuk sesuai dengan rincian di bawah ini dan konfirmasi ke Admin via WhatsApp atau sistem.",
      icon: <CreditCard className="w-6 h-6" />,
      color: "bg-emerald-100 text-emerald-600",
      content: (
        <div className="mt-4 p-5 bg-emerald-50 rounded-2xl border border-emerald-100/50">
          <p className="text-sm font-bold text-emerald-900 mb-2">Rekening Pembayaran:</p>
          <div className="space-y-1">
            <p className="text-xs text-emerald-700 font-medium font-mono uppercase tracking-widest">Bank : BCA</p>
            <p className="text-xs text-emerald-700 font-medium font-mono uppercase tracking-widest">A.N. : TK AZALIA</p>
            <p className="text-xs text-emerald-700 font-medium font-mono uppercase tracking-widest leading-loose">No. Rek : 1234567890</p>
          </div>
          <p className="mt-4 text-[10px] italic text-emerald-600 font-medium">* Harap simpan bukti transfer untuk dilampirkan.</p>
        </div>
      )
    },
    {
      title: "2. Verifikasi Dokumen Asli",
      desc: "Bawa dokumen asli Akte Kelahiran, Kartu Keluarga, dan KTP Orang Tua ke sekolah untuk diverifikasi oleh Panitia PPDB.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "3. Pengukuran Seragam",
      desc: "Datang ke sekolah sesuai jadwal yang ditentukan untuk melakukan pengukuran seragam dan pengambilan kelengkapan sekolah.",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "4. Masuk Sekolah",
      desc: "Pantau grup WhatsApp wali murid untuk pengumuman jadwal MPLS dan hari pertama masuk sekolah.",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Action Bar */}
      <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft size={18} />
          Kembali ke Dashboard
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
        >
          <Printer size={16} />
          Cetak Panduan
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 space-y-10 pb-20">
        {/* Header Section */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em]">
            Daftar Ulang: Siswa Baru
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            Panduan Daftar Ulang
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl">
            Selamat telah menjadi bagian dari TK Azalia! Silakan ikuti langkah-langkah di bawah ini untuk menyelesaikan proses pendaftaran Anda.
          </p>
        </section>

        {/* Steps Grid */}
        <div className="grid gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${step.color} shadow-sm transition-transform group-hover:scale-110`}>
                  {step.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  {step.content && step.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location Section */}
        <section className="bg-slate-900 rounded-[2.5rem] p-10 md:p-14 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] -mr-40 -mt-40" />
          
          <div className="relative flex flex-col md:flex-row gap-10 items-center justify-between">
            <div className="space-y-4 max-w-sm">
              <h2 className="text-2xl font-black tracking-tight">Lokasi Sekolah</h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Kunjungi sekolah kami untuk verifikasi dokumen dan pengukuran seragam pada jam operasional sekolah.
              </p>
              <div className="flex items-center gap-3 text-emerald-400 text-sm font-bold">
                <MapPin size={18} />
                TK Azalia, Alamat Sekolah Anda
              </div>
            </div>
            
            <Link
              href="https://maps.google.com" // Update with actual map link
              target="_blank"
              className="px-8 py-4 bg-emerald-600 rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl active:scale-95"
            >
              Buka Google Maps
            </Link>
          </div>
        </section>

        {/* Help Banner */}
        <div className="text-center p-8 bg-white rounded-[2rem] border border-slate-100">
          <p className="text-slate-400 text-sm font-medium">Ada pertanyaan lebih lanjut?</p>
          <Link href="/dashboard/siswa/help" className="mt-2 inline-block text-emerald-600 font-black text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">
            Hubungi Panitia PPDB
          </Link>
        </div>
      </div>
    </div>
  );
}
