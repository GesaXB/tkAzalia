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
    <div className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[#01793B] bg-emerald-50 font-bold tracking-wider text-xs uppercase mb-4 ring-1 ring-emerald-500/10 shadow-sm">
            Privasi
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Kebijakan Privasi</h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Terakhir diperbarui: 5 Maret 2026. Keamanan data Anda adalah prioritas utama kami.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-6 group hover:shadow-md transition-shadow duration-300 ring-1 ring-black/5"
            >
              <div className="shrink-0 w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-[#01793B] transition-colors duration-300">
                <section.icon size={26} strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
                <p className="text-gray-500 leading-relaxed text-[15px] md:text-base">
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
          className="mt-12 p-8 bg-white rounded-4xl border border-gray-100 text-center shadow-sm ring-1 ring-black/5"
        >
          <p className="text-gray-500">
            Untuk pertanyaan lebih lanjut mengenai kebijakan privasi ini, hubungi kami di <br />
            <a href="mailto:privacy@tkazalia.sch.id" className="text-[#01793B] font-bold mt-2 inline-block hover:underline">privacy@tkazalia.sch.id</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
