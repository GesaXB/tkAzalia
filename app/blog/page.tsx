"use client";

import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { listInformasiPublik } from "@/lib/client/public";
import { ArrowRight, Calendar, ImageIcon, Search, X, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <main className="min-h-screen bg-white">
      {/* Hero Section - Simplified & Clean */}
      <section className="relative pt-32 pb-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center space-y-4"
          >
            <span className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em]">
              Blog & Artikel
            </span>
            
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Kabar Terbaru <span className="text-gray-400">/</span> Berita
            </h1>
            
            <p className="text-gray-500 max-w-xl text-base font-medium">
              Informasi kegiatan, artikel edukatif, dan perkembangan terbaru dari TK Azalia.
            </p>

            {/* Minimalist Search Bar */}
            <div ref={searchRef} className="w-full max-w-lg mt-10 relative">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Cari artikel..."
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(""); setShowSuggestions(false); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              {/* Suggestions dropdown */}
              <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden z-50 py-1"
                  >
                    {suggestions.map((s) => (
                      <Link
                        key={s.info_id}
                        href={`/blog/${s.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group/item"
                      >
                        <Search size={14} className="text-gray-300 group-hover/item:text-emerald-500" />
                        <p className="text-sm font-semibold text-gray-700 truncate">{s.judul}</p>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Clean Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <button
                onClick={() => setFilter("semua")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === "semua"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                Semua
              </button>
              {kategoris.map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                    filter === k
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {KATEGORI_LABEL[k] || k}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] rounded-3xl bg-gray-50 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Search size={40} className="mx-auto text-gray-100 mb-4" />
              <p className="text-gray-500 font-bold">Tidak ada artikel ditemukan</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Card - Simple & Clean */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="group block overflow-hidden rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:border-emerald-100 transition-all duration-300"
                  >
                    <div className="grid lg:grid-cols-2">
                      <div className="aspect-[16/10] lg:aspect-auto relative overflow-hidden bg-gray-100">
                        {featuredPost.gambar ? (
                          <img
                            src={featuredPost.gambar}
                            alt={featuredPost.judul}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-200">
                            <ImageIcon size={48} />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-6">
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest px-2 py-0.5 bg-emerald-50 rounded-md">
                            {KATEGORI_LABEL[featuredPost.tipe] || featuredPost.tipe}
                          </span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                            {formatDate(featuredPost.created_at)}
                          </span>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                          {featuredPost.judul}
                        </h2>
                        
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3 mb-8">
                          {featuredPost.ringkasan || featuredPost.konten}
                        </p>
                        
                        <div className="inline-flex items-center gap-2 text-xs font-black text-gray-900 uppercase tracking-widest group-hover:gap-4 transition-all">
                          Selanjutnya
                          <ArrowRight size={14} className="text-emerald-500" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Standard Cards Grid */}
              {restPosts.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {restPosts.map((post, index) => (
                    <motion.div 
                      key={post.info_id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index % 3) * 0.05 }}
                    >
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col h-full rounded-2xl bg-white border border-gray-100 hover:border-emerald-100 transition-all duration-300"
                      >
                        <div className="aspect-[16/10] relative overflow-hidden bg-gray-50 rounded-t-2xl">
                          {post.gambar ? (
                            <img
                              src={post.gambar}
                              alt={post.judul}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-200">
                              <ImageIcon size={32} />
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">
                              {KATEGORI_LABEL[post.tipe] || post.tipe}
                            </span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                              {formatDate(post.created_at)}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight mb-3 group-hover:text-emerald-600 transition-colors">
                            {post.judul}
                          </h2>
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-6">
                            {post.ringkasan || post.konten}
                          </p>
                          <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Baca</span>
                            <ChevronRight size={14} className="text-emerald-500" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
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
