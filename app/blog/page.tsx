"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listInformasiPublik } from "@/lib/client/public";
import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { ImageIcon, ArrowRight } from "lucide-react";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<PublicInformasiSekolahItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("semua");

  useEffect(() => {
    const load = async () => {
      const res = await listInformasiPublik();
      if (res.success && res.data) setPosts(res.data);
      setLoading(false);
    };
    load();
  }, []);

  const kategoris = Array.from(new Set(posts.map((p) => p.tipe))).sort();
  const filtered = filter === "semua" ? posts : posts.filter((p) => p.tipe === filter);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Blog
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Artikel, berita, dan informasi terkait TK Azalia.
          </p>

          {kategoris.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("semua")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === "semua"
                    ? "bg-[#01793B] text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
                }`}
              >
                Semua
              </button>
              {kategoris.map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === k
                      ? "bg-[#01793B] text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700"
                  }`}
                >
                  {KATEGORI_LABEL[k] || k}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse"
                >
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="mt-12 py-16 text-center rounded-2xl border border-dashed border-gray-200 bg-white/50">
              <p className="text-gray-500">Belum ada artikel.</p>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <Link
                  key={post.info_id}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-emerald-100 transition-all duration-300"
                >
                  <div className="aspect-video bg-gray-50 relative overflow-hidden">
                    {post.gambar ? (
                      <img
                        src={post.gambar}
                        alt={post.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-200">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-medium bg-white/90 text-gray-700 shadow-sm">
                      {KATEGORI_LABEL[post.tipe] || post.tipe}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                      {post.judul}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                      {post.ringkasan || post.konten}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
                      Baca selengkapnya
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
