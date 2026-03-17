"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "Kapan pendaftaran siswa baru dibuka?",
    a: "Pendaftaran Gelombang 1 biasanya dibuka mulai bulan Januari hingga Maret setiap tahunnya. Namun, pendaftaran akan ditutup lebih awal jika kuota sudah terpenuhi."
  },
  {
    q: "Berapa usia minimal untuk masuk TK Azalia?",
    a: "Untuk Kelompok A minimal berusia 4 tahun, dan untuk Kelompok B minimal berusia 5 tahun pada bulan Juli tahun berjalan."
  },
  {
    q: "Bagaimana sistem pembayarannya?",
    a: "Pembayaran dapat dilakukan melalui transfer bank atau tunai di kantor administrasi sekolah. Tersedia juga opsi cicilan untuk uang pangkal sesuai kesepakatan."
  },
  {
    q: "Apakah pendaftaran sudah termasuk seragam?",
    a: "Betul. Calon siswa yang sudah resmi mendaftar akan mendapatkan kelengkapan berupa 2 stel seragam sekolah, modul belajar dan alat peraga edukatif."
  },
  {
    q: "Bagaimana dengan fasilitas makan anak di sekolah?",
    a: "Sekolah menyediakan fasilitas katering harian dengan menu sehat dan bergizi yang disesuaikan untuk kebutuhan tumbuh kembang anak."
  },
  {
    q: "Kegiatan apa saja yang dilakukan anak sehari-hari?",
    a: "Rutinitas harian anak sangat menyeimbangkan fisik, spiritual, dan kognitif. Dimulai dari Senam Ceria, pembiasaan ibadah (Sholat Dhuha & Dzikir Pagi), belajar interaktif, bermain di luar ruangan, hingga waktu makan dan doa penutup."
  }
];

export default function ContactForm() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Buka FAQ pertama secara default

  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 h-full flex flex-col relative overflow-hidden">


      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#01793B] to-emerald-500"></div>


      <div className="p-8 md:p-10 flex-grow overflow-y-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-[#01793B]" /> Tanya Jawab
        </h3>
        <p className="text-gray-500 mb-8 text-sm leading-relaxed">
          Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar TK Azalia.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full flex justify-between items-center text-left p-4 md:p-5 gap-4 hover:bg-gray-50 transition-colors"
              >
                <span className={`font-bold text-sm md:text-base transition-colors ${activeIndex === idx ? "text-[#01793B]" : "text-gray-800"}`}>
                  {faq.q}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${activeIndex === idx ? 'bg-[#01793B]/10' : 'bg-gray-100'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeIndex === idx ? "rotate-180 text-[#01793B]" : "text-gray-500"}`} />
                </div>
              </button>

              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 md:p-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 border-t border-gray-100 mt-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1">Tidak menemukan jawaban?</h4>
            <p className="text-xs text-gray-500">Tanyakan langsung ke admin kami.</p>
          </div>

          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#01793B] hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-green-900/10"
          >
            <MessageCircle className="w-5 h-5" /> Hubungi Admin
          </a>
        </div>
      </div>

    </div>
  );
}
