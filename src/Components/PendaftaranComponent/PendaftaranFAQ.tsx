"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Kapan pendaftaran dibuka?", a: "Pendaftaran Gelombang 1 dibuka mulai Januari - Maret 2026. Gelombang 2 (jika kuota masih ada) April - Juni 2026." },
  { q: "Apakah ada tes masuk?", a: "Tidak ada tes akademik (baca tulis). Kami hanya melakukan observasi tumbuh kembang anak untuk mengetahui kesiapan sekolahnya." },
  { q: "Apakah seragam sudah termasuk biaya?", a: "Ya, biaya masuk sudah termasuk 4 stel seragam (Seragam Nasional, Kotak-kotak, Olahraga, dan Batik)." },
  { q: "Berapa usia minimal masuk?", a: "Untuk Kelompok A minimal 4 tahun pada bulan Juli 2026. Untuk Kelompok B minimal 5 tahun." },
];

export default function PendaftaranFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Pertanyaan Sering Diajukan (FAQ)</h2>
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden">
            <button 
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-5 bg-white hover:bg-gray-50 transition-colors text-left"
            >
              <span className="font-bold text-gray-800">{item.q}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
            </button>
            <div className={`bg-gray-50 px-5 text-gray-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 py-5' : 'max-h-0 py-0'}`}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}