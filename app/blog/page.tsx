"use client";

import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { listInformasiPublik } from "@/lib/client/public";
import { ArrowRight, Calendar, ImageIcon, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

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
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState<PublicInformasiSekolahItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const res = await listInformasiPublik();
      if (res.success && res.data) setPosts(res.data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const kategoris = Array.from(new Set(posts.map((p) => p.tipe))).sort();

  const filtered = useMemo(() => {
    let list = posts;
    if (filter !== "semua") list = list.filter((p) => p.tipe === filter);
    const q = searchQuery.trim().toLowerCase();
    if (q) list = list.filter((p) => p.judul.toLowerCase().includes(q) || (p.ringkasan && p.ringkasan.toLowerCase().includes(q)));
    return list;
  }, [posts, filter, searchQuery]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q || q.length < 1) return [];
    return posts
      .filter((p) => p.judul.toLowerCase().includes(q))
      .slice(0, 5);
  }, [posts, searchQuery]);

  const featuredPost = filtered.length > 0 ? filtered[0] : null;
  const restPosts = filtered.length > 1 ? filtered.slice(1) : [];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="relative pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-1 bg-[#01793B] rounded-full" />
            <span className="text-sm font-bold text-[#01793B] uppercase tracking-wider">Blog</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Berita & Artikel
          </h1>
          <p className="mt-3 text-gray-500 max-w-xl text-lg">
            Informasi terkini, kegiatan, dan artikel edukatif dari TK Azalia.
          </p>

          {/* Search Bar */}
          <div ref={searchRef} className="mt-8 relative max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Cari artikel..."
                className="w-full pl-12 pr-12 py-3.5 rounded-3xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-[#01793B]/20 focus:border-[#01793B] outline-none transition-all shadow-sm hover:border-gray-300"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden z-50 transform transition-all animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Hasil Pencarian</span>
                </div>
                {suggestions.map((s) => (
                  <button
                    key={s.info_id}
                    onClick={() => {
                      setSearchQuery(s.judul);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-start gap-4 px-4 py-3.5 hover:bg-gray-50 transition-colors text-left group/item"
                  >
                    <Search size={16} className="text-gray-300 mt-0.5 shrink-0 group-hover/item:text-[#01793B] transition-colors" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate group-hover/item:text-[#01793B] transition-colors">{s.judul}</p>
                      <p className="text-xs text-gray-400 mt-1 font-medium">{KATEGORI_LABEL[s.tipe] || s.tipe}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filters */}
          {kategoris.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2">
              <button
                onClick={() => setFilter("semua")}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${filter === "semua"
                  ? "bg-[#01793B] text-white border-[#01793B]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
              >
                Semua
              </button>
              {kategoris.map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border ${filter === k
                    ? "bg-[#01793B] text-white border-[#01793B]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  {KATEGORI_LABEL[k] || k}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-gray-100 bg-white overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-full" />
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center rounded-3xl border border-dashed border-gray-200 bg-white/50">
              <Search size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-500 font-medium">Tidak ada artikel ditemukan.</p>
              <p className="text-gray-400 text-sm mt-1">Coba kata kunci atau kategori lain.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Featured Post */}
              {featuredPost && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="grid md:grid-cols-2 h-full bg-white">
                      <div className="aspect-video md:aspect-auto md:h-full relative overflow-hidden bg-gray-100 min-h-[300px]">
                        {featuredPost.gambar ? (
                          <img
                            src={featuredPost.gambar}
                            alt={featuredPost.judul}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                            <ImageIcon size={64} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />

                        {/* Badge on image for mobile mostly */}
                        <div className="absolute top-4 left-4 md:hidden">
                          <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-[#01793B] shadow-sm uppercase tracking-wider">
                            {KATEGORI_LABEL[featuredPost.tipe] || featuredPost.tipe}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center bg-white relative">
                        <div className="hidden md:flex items-center gap-3 mb-6">
                          <span className="px-4 py-1.5 rounded-xl text-xs font-bold bg-[#01793B]/10 text-[#01793B] uppercase tracking-wider">
                            {KATEGORI_LABEL[featuredPost.tipe] || featuredPost.tipe}
                          </span>
                          {featuredPost.created_at && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                              <Calendar size={14} />
                              {formatDate(featuredPost.created_at)}
                            </span>
                          )}
                        </div>
                        <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight group-hover:text-[#01793B] transition-colors">
                          {featuredPost.judul}
                        </h2>
                        <p className="mt-5 text-gray-600 leading-relaxed line-clamp-3 md:line-clamp-4 text-base md:text-lg">
                          {featuredPost.ringkasan || featuredPost.konten}
                        </p>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#01793B] group-hover:gap-2.5 transition-all">
                            Baca artikel selengkapnya
                            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                          </span>
                          {featuredPost.created_at && (
                            <span className="md:hidden flex items-center gap-1.5 text-xs font-medium text-gray-400">
                              <Calendar size={14} />
                              {formatDate(featuredPost.created_at)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* Rest Posts Grid */}
              {restPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restPosts.map((post, index) => (
                    <div key={post.info_id} className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDuration: '700ms', animationDelay: `${(index % 3) * 100}ms`, animationFillMode: 'both' }}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full rounded-3xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="aspect-16/10 relative overflow-hidden bg-gray-100">
                          {post.gambar ? (
                            <img
                              src={post.gambar}
                              alt={post.judul}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                              <ImageIcon size={48} />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 rounded-xl text-[10px] font-bold bg-white text-gray-800 shadow-sm uppercase tracking-wider">
                              {KATEGORI_LABEL[post.tipe] || post.tipe}
                            </span>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col relative bg-white">
                          {post.created_at && (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-400 mb-3">
                              <Calendar size={13} />
                              {formatDate(post.created_at)}
                            </span>
                          )}
                          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#01793B] transition-colors leading-snug">
                            {post.judul}
                          </h2>
                          <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed flex-1">
                            {post.ringkasan || post.konten}
                          </p>
                          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center">
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#01793B] group-hover:gap-2.5 transition-all">
                              Baca selengkapnya
                              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
