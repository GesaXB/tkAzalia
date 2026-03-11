"use client";

import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { listInformasiPublik } from "@/lib/client/public";
import { ArrowRight, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const KATEGORI_LABEL: Record<string, string> = {
  berita: "Berita",
  artikel: "Artikel",
  kegiatan: "Kegiatan",
  profil: "Profil",
  visi: "Visi",
  misi: "Misi",
  fasilitas: "Fasilitas",
  kontak: "Kontak",
  syarat_pendaftaran: "Syarat Pendaftaran",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogSection() {
  const [posts, setPosts] = useState<PublicInformasiSekolahItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await listInformasiPublik();
      if (res.success && res.data) setPosts(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const displayPosts = posts.slice(0, 12);

  return (
    <section className="bg-slate-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Berita & <span className="text-[#01793B]">Informasi</span>
            </h2>
            <p className="text-slate-600">
              Kumpulan update terbaru dan artikel menarik dari sekolah kami.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-gray-200 text-[#01793B] font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
          >
            Lihat Semua
            <ArrowRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[300px] rounded-2xl bg-white border border-slate-100 p-4 animate-pulse"
              >
                <div className="aspect-video bg-slate-100 rounded-xl mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded-full w-1/3" />
                  <div className="h-5 bg-slate-100 rounded-full w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-white border border-dashed border-slate-200">
            <ImageIcon size={40} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Belum ada artikel yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="scroll-horizontal flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scroll-smooth hide-scrollbar">
              {displayPosts.map((post) => (
                <Link
                  key={post.info_id}
                  href={`/blog/${post.slug}`}
                  className="group flex-shrink-0 w-[280px] md:w-[320px] snap-start bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="aspect-16/10 bg-gray-100 relative overflow-hidden">
                    {post.gambar ? (
                      <img
                        src={post.gambar}
                        alt={post.judul}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-white text-gray-800 shadow-sm">
                        {KATEGORI_LABEL[post.tipe] || post.tipe}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1 relative bg-white">
                    <time className="text-[11px] font-medium text-gray-400 uppercase mb-3">
                      {formatDate(post.created_at)}
                    </time>
                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#01793B] transition-colors mb-3">
                      {post.judul}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4 flex-1">
                      {post.ringkasan || post.konten}
                    </p>
                    <div className="pt-4 border-t border-gray-100 mt-auto flex items-center text-sm font-bold text-[#01793B] gap-1.5 group-hover:gap-2.5 transition-all">
                      Baca Selengkapnya
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
