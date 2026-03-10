"use client";

import { motion } from "framer-motion";
import { FileText, Scale, ShieldCheck } from "lucide-react";

export default function TermsAndConditions() {
  const sections = [
    {
      title: "1. Penerimaan Ketentuan",
      content: "Dengan mengakses dan menggunakan layanan TK Azalia, Anda dianggap telah membaca, memahami, dan menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda tidak diperkenankan menggunakan layanan kami.",
      icon: Scale
    },
    {
      title: "2. Penggunaan Layanan",
      content: "Layanan kami ditujukan untuk memberikan informasi pendidikan dan memfasilitasi proses pendaftaran siswa. Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan peraturan yang berlaku.",
      icon: FileText
    },
    {
      title: "3. Akun Pengguna",
      content: "Anda bertanggung jawab untuk menjaga kerahasiaan akun dan kata sandi Anda. Semua aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya. Segera beri tahu kami jika ada penggunaan akun yang tidak sah.",
      icon: ShieldCheck
    },
    {
      title: "4. Kekayaan Intelektual",
      content: "Seluruh konten dalam situs ini, termasuk namun tidak terbatas pada teks, grafik, logo, dan gambar, adalah milik TK Azalia atau pemberi lisensinya dan dilindungi oleh undang-undang hak cipta.",
      icon: FileText
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-[#01793B] font-bold tracking-wider text-sm uppercase mb-2 block">Legalitas</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Syarat & Ketentuan</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Terakhir diperbarui: 5 Maret 2026. Harap baca syarat dan ketentuan ini dengan saksama sebelum menggunakan layanan kami.
        </p>
      </motion.div>

      <div className="space-y-12">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-6 group"
          >
            <div className="flex-shrink-0 w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#01793B] group-hover:bg-[#01793B] group-hover:text-white transition-all duration-300">
              <section.icon size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 p-8 bg-[#F8F9FA] rounded-3xl border border-gray-100 text-center"
      >
        <p className="text-gray-600">
          Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami melalui <br />
          <a href="mailto:info@tkazalia.sch.id" className="text-[#01793B] font-bold hover:underline">info@tkazalia.sch.id</a>
        </p>
      </motion.div>
    </div>
  );
}
