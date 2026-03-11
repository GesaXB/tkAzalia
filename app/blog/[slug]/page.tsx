"use client";

import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { getArtikelBySlug } from "@/lib/client/public";
import { ArrowLeft, Calendar, ImageIcon, Tag } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
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
    month: "long",
    year: "numeric",
  });
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<PublicInformasiSekolahItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    if (!slug) return;
    const load = async () => {
      const res = await getArtikelBySlug(slug);
      if (!res.success) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setPost(res.data || null);
      setLoading(false);
    };
    load();
  }, [slug]);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-6 bg-gray-100 rounded w-1/4" />
            <div className="h-10 bg-gray-100 rounded w-3/4" />
            <div className="aspect-video bg-gray-100 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-full" />
              <div className="h-4 bg-gray-100 rounded w-5/6" />
              <div className="h-4 bg-gray-100 rounded w-4/5" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFound || !post) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ImageIcon size={32} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h1>
          <p className="mt-2 text-gray-500 max-w-sm mx-auto">
            Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#01793B] text-white font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-500/20"
          >
            <ArrowLeft size={18} />
            Kembali ke Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 w-full h-1 bg-gray-100 z-40">
        <div
          className="h-full bg-gradient-to-r from-[#01793B] to-emerald-400 transition-all duration-150 ease-out"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <main className="min-h-screen bg-white">
        <article className="pt-24 pb-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {/* Back Button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#01793B] transition-colors mb-10 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Kembali ke Blog
            </Link>

            {/* Article Header */}
            <header className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 uppercase tracking-wider">
                  <Tag size={12} />
                  {KATEGORI_LABEL[post.tipe] || post.tipe}
                </span>
                {post.created_at && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-gray-400">
                    <Calendar size={14} />
                    {formatDate(post.created_at)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-gray-900 leading-tight tracking-tight">
                {post.judul}
              </h1>
            </header>

            {/* Hero Image */}
            {post.gambar ? (
              <div className="mb-12 aspect-video rounded-2xl overflow-hidden bg-gray-50 shadow-lg shadow-gray-200/50">
                <img
                  src={post.gambar}
                  alt={post.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="mb-12 aspect-video rounded-2xl bg-gradient-to-br from-gray-50 to-emerald-50/30 flex items-center justify-center border border-gray-100">
                <ImageIcon size={48} className="text-gray-200" />
              </div>
            )}

            {/* Article Body */}
            <div className="prose-wrapper">
              {post.ringkasan && (
                <div className="text-lg sm:text-xl text-gray-600 font-medium mb-10 border-l-4 border-emerald-500 pl-6 py-2 bg-emerald-50/30 rounded-r-xl">
                  {post.ringkasan}
                </div>
              )}
              <div className="text-gray-700 leading-[1.9] text-base sm:text-lg whitespace-pre-wrap">
                {post.konten}
              </div>
            </div>

            {/* Footer Divider + Back */}
            <div className="mt-16 pt-8 border-t border-gray-100">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-100 text-gray-500 font-semibold hover:border-emerald-200 hover:text-emerald-700 hover:bg-emerald-50/50 transition-all group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Lihat artikel lainnya
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
