"use client";
import { CheckCircle2, AlertCircle, Phone } from "lucide-react";

export default function PendaftaranInfo() {
  return (
    <section className="pt-10 pb-24 md:pb-32 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex flex-col h-full">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-[#01793B] rounded-full"></span>
            Syarat Dokumen
          </h3>
          <ul className="space-y-4 flex-grow">
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

        <div className="bg-green-700 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col h-full">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-bl-full pointer-events-none"></div>

          <h3 className="text-3xl font-bold mb-2 z-10 relative">Jadwal SPMB</h3>
          <p className="text-green-50 mb-8 z-10 relative text-[15px]">Catat tanggal penting penerimaan siswa baru</p>

          <div className="space-y-5 flex-grow z-10 relative">
            <div className="flex justify-between items-center border-b border-white/30 pb-3">
              <span className="text-[17px]">Gelombang 1</span>
              <span className="font-bold text-[17px]">Jan - Mar 2026</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/30 pb-3">
              <span className="text-[17px]">Gelombang 2</span>
              <span className="font-bold text-[17px]">April - Juni 2026</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/30 pb-3">
              <span className="text-[17px]">Seragam (2 Stel)</span>
              <span className="font-bold text-[17px]">Menyesuaikan</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/30 pb-3">
              <span className="text-[17px]">SPP/Bulan</span>
              <span className="font-bold text-[17px]">H+3 Observasi</span>
            </div>
          </div>

          <div className="bg-white/10 py-3 px-4 md:px-5 rounded-xl flex justify-between items-center mt-8 z-10 relative border border-white/10">
            <span className="font-bold text-yellow-400 text-base md:text-lg">Info Rincian Biaya?</span>
            
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FFE600] hover:bg-yellow-400 text-green-900 font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 shadow-md"
            >
              <Phone className="w-4 h-4" /> WA Admin
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}