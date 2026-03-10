"use client";

import { motion } from "framer-motion";
import { Database, Eye, Lock, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Informasi yang Kami Kumpulkan",
      content: "Kami mengumpulkan informasi yang Anda berikan langsung kepada kami saat mendaftar, seperti nama, alamat email, nomor telepon, dan data pendaftaran siswa lainnya.",
      icon: Database
    },
    {
      title: "2. Penggunaan Informasi",
      content: "Informasi yang kami kumpulkan digunakan untuk memproses pendaftaran, memberikan layanan pendidikan, berkomunikasi dengan Anda, dan meningkatkan kualitas layanan kami.",
      icon: Eye
    },
    {
      title: "3. Keamanan Data",
      content: "Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah. Kami menggunakan enkripsi standar industri.",
      icon: Lock
    },
    {
      title: "4. Pembagian Informasi",
      content: "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi jika diwajibkan oleh hukum atau untuk menyediakan layanan kami.",
      icon: ShieldCheck
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <span className="text-[#01793B] font-bold tracking-wider text-sm uppercase mb-2 block">Privasi</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Kebijakan Privasi</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Terakhir diperbarui: 5 Maret 2026. Keamanan data Anda adalah prioritas utama kami.
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
          Untuk pertanyaan lebih lanjut mengenai kebijakan privasi ini, hubungi kami di <br />
          <a href="mailto:privacy@tkazalia.sch.id" className="text-[#01793B] font-bold hover:underline">privacy@tkazalia.sch.id</a>
        </p>
      </motion.div>
    </div>
  );
}
