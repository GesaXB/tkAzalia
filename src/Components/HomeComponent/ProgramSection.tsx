"use client";
import { listKelasPublik, type KelasPublicItem } from "@/lib/client/public";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const ICON_STYLES = [
  {
    icon: BookOpen,
    color: "bg-orange-50 text-orange-600 border-orange-200",
    hover: "group-hover:bg-orange-500",
  },
  {
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600 border-blue-200",
    hover: "group-hover:bg-blue-500",
  },
  {
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600 border-purple-200",
    hover: "group-hover:bg-purple-500",
  },
  {
    icon: GraduationCap,
    color: "bg-teal-50 text-teal-600 border-teal-200",
    hover: "group-hover:bg-teal-500",
  },
];

export default function ProgramSection() {
  const [kelasList, setKelasList] = useState<KelasPublicItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await listKelasPublik();
      if (res.success && res.data) {
        setKelasList(res.data.sort((a, b) => a.urutan - b.urutan));
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4"
          >
            Program Pendidikan
          </motion.h2>
          <div className="w-24 h-1.5 bg-[#01793B] rounded-full mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Kurikulum yang disesuaikan dengan tahap perkembangan emas (Golden Age) buah hati Anda.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
          </div>
        ) : kelasList.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            Belum ada program kelas yang tersedia.
          </div>
        ) : (
          <div className={`grid gap-8 ${kelasList.length === 1 ? 'max-w-lg mx-auto' : kelasList.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {kelasList.map((kelas, idx) => {
              const style = ICON_STYLES[idx % ICON_STYLES.length];
              const IconComponent = style.icon;
              return (
                <Link key={kelas.kelas_id} href="/program">
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group relative h-full bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-300 cursor-pointer"
                  >
                    <div className={`w-16 h-16 ${style.color} rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${style.hover} group-hover:text-white`}>
                      <IconComponent className="w-8 h-8" strokeWidth={2} />
                    </div>

                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mt-1">{kelas.nama}</h3>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-8">
                      {kelas.deskripsi || "Program pendidikan berkualitas untuk buah hati Anda."}
                    </p>

                    <div className="flex items-center text-[#01793B] font-bold group-hover:gap-3 gap-2 transition-all">
                      Selengkapnya <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
