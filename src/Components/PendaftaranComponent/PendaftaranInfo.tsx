"use client";
import { CheckCircle2, AlertCircle, Phone, CalendarDays } from "lucide-react";

interface PendaftaranInfoProps {
  dokumenFetch?: string[];
  jadwalFetch?: { tanggal_mulai: string; tanggal_selesai: string } | null;
}

export default function PendaftaranInfo({ dokumenFetch = [], jadwalFetch = null }: PendaftaranInfoProps) {
  const dokumen = dokumenFetch.length > 0 ? dokumenFetch : [
    "Formulir Pendaftaran Online (isi melalui website ini)",
    "Fotocopy Akta Kelahiran (2 lembar)",
    "Fotocopy Kartu Keluarga (2 lembar)",
    "Fotocopy KTP Orang Tua — Ayah & Ibu",
    "Pas Foto Anak 3×4, warna merah/biru (4 lembar)",
    "Usia minimal 4 tahun (Kel. A) & 5 tahun (Kel. B)",
  ];

  let jadwal = [];
  if (jadwalFetch) {
    const formatTanggal = (iso: string) => {
      return new Date(iso).toLocaleDateString("id-ID", { month: "short", year: "numeric", day: "numeric" });
    };

    jadwal = [
      { label: "Tanggal Mulai", value: formatTanggal(jadwalFetch.tanggal_mulai) },
      { label: "Tanggal Selesai", value: formatTanggal(jadwalFetch.tanggal_selesai) },
      { label: "Pengumuman", value: "Menyusul" },
      { label: "Daftar Ulang", value: "Sesuai Arahan" },
    ];
  } else {
    jadwal = [
      { label: "Gelombang 1", value: "Jan – Mar 2026" },
      { label: "Gelombang 2", value: "Apr – Jun 2026" },
      { label: "Pengumuman", value: "H+3 Observasi" },
      { label: "Seragam", value: "Menyesuaikan" },
    ];
  }

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="inline-block text-[11px] font-bold text-[#01793B] uppercase tracking-widest mb-3">Informasi Penting</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Syarat & Jadwal</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Syarat Dokumen */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Syarat Dokumen</h3>
            </div>

            <ul className="space-y-3.5 flex-1">
              {dokumen.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                    <CheckCircle2 className="w-3 h-3 text-[#01793B]" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Note */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                Dokumen fisik wajib dibawa saat jadwal wawancara dan observasi di sekolah.
              </p>
            </div>
          </div>

          {/* Jadwal SPMB */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#01793B]">
                <CalendarDays className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Jadwal SPMB</h3>
                <p className="text-xs text-gray-400 mt-0.5">Catat tanggal penting berikut</p>
              </div>
            </div>

            <div className="flex-1 space-y-3">
              {jadwal.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3.5 px-4 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <span className="text-sm text-gray-500 font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>

            {/* WA Contact */}
            <div className="mt-6 flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <div>
                <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">Info Biaya</p>
                <p className="text-xs text-gray-500 mt-0.5">Tanya langsung via WhatsApp</p>
              </div>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#01793B] text-white text-xs font-bold rounded-xl hover:bg-emerald-700 transition-all active:scale-95 shadow-sm shadow-emerald-100 uppercase tracking-wide"
              >
                <Phone className="w-3.5 h-3.5" />
                WA Admin
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}