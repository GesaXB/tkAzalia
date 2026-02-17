"use client";
import { CheckCircle2, AlertCircle } from "lucide-react";

export default function PendaftaranInfo() {
  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      {/* Tambahkan 'items-stretch' untuk menyamakan tinggi otomatis */}
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        
        {/* KIRI: Syarat Pendaftaran */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex flex-col h-full">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#01793B] rounded-full"></span>
            Syarat Dokumen
          </h3>
          <ul className="space-y-4 flex-grow"> {/* Tambahkan flex-grow agar daftar memenuhi ruang */}
            {[
              "Mengisi Formulir Pendaftaran Online/Offline",
              "Fotocopy Akta Kelahiran (2 Lembar)",
              "Fotocopy Kartu Keluarga (2 Lembar)",
              "Fotocopy KTP Orang Tua (Ayah & Ibu)",
              "Pas Foto Anak 3x4 (Warna Merah/Biru - 4 Lembar)",
              "Usia minimal 4 tahun (Kelompok A) & 5 tahun (Kelompok B)"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <CheckCircle2 className="w-5 h-5 text-[#01793B] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
              Dokumen fisik wajib dibawa saat jadwal wawancara/observasi di sekolah.
            </p>
          </div>
        </div>

        {/* KANAN: Estimasi Biaya */}
        <div className="bg-[#01793B] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col h-full">
          {/* Hiasan */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full pointer-events-none"></div>

          <h3 className="text-2xl font-bold mb-2">Rincian Biaya</h3>
          <p className="text-green-100 text-sm mb-8">Transparansi biaya pendidikan TA 2026/2027</p>

          <div className="space-y-4 mb-8 flex-grow"> {/* Tambahkan flex-grow di sini juga */}
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span>Uang Pendaftaran</span>
              <span className="font-bold">Rp 150.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span>Uang Pangkal (Gedung)</span>
              <span className="font-bold">Rp 1.500.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span>Seragam (4 Stel)</span>
              <span className="font-bold">Rp 850.000</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/20 pb-2">
              <span>SPP Bulan Juli</span>
              <span className="font-bold">Rp 150.000</span>
            </div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
            <span className="font-medium">Total Estimasi</span>
            <span className="text-2xl font-extrabold text-yellow-300">Rp 2.650.000</span>
          </div>
          
          <p className="text-xs text-green-200 mt-4 text-center">
            *Biaya dapat diangsur sesuai ketentuan sekolah.
          </p>
        </div>

      </div>
    </section>
  );
}