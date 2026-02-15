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
    <section className="bg-white py-8 md:py-10">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Blog & Artikel
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#01793B] to-emerald-600 rounded-full mx-auto mb-4" />
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Artikel, berita, dan informasi terkini dari TK Azalia.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 mt-4 text-[#01793B] text-sm font-semibold hover:text-emerald-700 transition-colors"
          >
            Lihat semua artikel
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 w-[260px] rounded-xl border border-gray-100 bg-gray-50 overflow-hidden animate-pulse"
              >
                <div className="aspect-video bg-gray-200" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="py-12 text-center rounded-xl border border-dashed border-gray-200 bg-[#F8F9FA]">
            <p className="text-gray-500 text-sm">Belum ada artikel.</p>
            <Link
              href="/blog"
              className="mt-3 inline-flex items-center gap-2 text-[#01793B] text-sm font-semibold hover:underline"
            >
              Ke halaman Blog
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <>
            <div className="relative">
              <div
                className="scroll-horizontal flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarGutter: "stable" }}
              >
                {displayPosts.map((post) => (
                  <Link
                    key={post.info_id}
                    href={`/blog/${post.slug}`}
                    className="group flex-shrink-0 w-[260px] snap-start rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg hover:border-[#01793B]/20 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                      {post.gambar ? (
                        <img
                          src={post.gambar}
                          alt={post.judul}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon size={40} />
                        </div>
                      )}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-medium bg-white/95 text-gray-700 shadow-sm">
                        {KATEGORI_LABEL[post.tipe] || post.tipe}
                      </span>
                    </div>
                    <div className="p-4">
                      {post.created_at && (
                        <time className="text-xs text-gray-500">
                          {formatDate(post.created_at)}
                        </time>
                      )}
                      <h3 className="mt-1 font-bold text-gray-900 line-clamp-2 group-hover:text-[#01793B] transition-colors text-sm">
                        {post.judul}
                      </h3>
                      <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {post.ringkasan || post.konten}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#01793B] group-hover:gap-1.5 transition-all">
                        Baca selengkapnya
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-3 w-8 bg-gradient-to-l from-white to-transparent hidden sm:block"
                aria-hidden
              />
            </div>
            <p className="text-center text-xs text-gray-400 mt-3">
              Geser untuk melihat lebih banyak
            </p>
          </>
        )}
      </div>
    </section>
  );
}
