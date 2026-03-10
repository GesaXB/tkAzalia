"use client";

import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { getArtikelBySlug } from "@/lib/client/public";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const [post, setPost] = useState<PublicInformasiSekolahItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  if (loading) {
    return (
      <main className="min-h-screen bg-white pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-100 rounded w-1/3" />
            <div className="aspect-video bg-gray-100 rounded-2xl" />
            <div className="space-y-2">
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
          <h1 className="text-2xl font-bold text-gray-900">Artikel tidak ditemukan</h1>
          <p className="mt-2 text-gray-600">
            Halaman yang Anda cari mungkin telah dipindahkan atau dihapus.
          </p>
          <Link
            href="/blog"
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#01793B] text-white font-medium hover:bg-emerald-700 transition-colors"
          >
            <ArrowLeft size={18} />
            Kembali ke Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <article className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#01793B] transition-colors mb-10"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>

          <header className="mb-8">
            <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 mb-4">
              {KATEGORI_LABEL[post.tipe] || post.tipe}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">
              {post.judul}
            </h1>
            {post.created_at && (
              <time className="text-sm text-slate-400 font-medium">
                {formatDate(post.created_at)}
              </time>
            )}
          </header>

          {post.gambar ? (
            <div className="mb-10 aspect-video rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
              <img
                src={post.gambar}
                alt={post.judul}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="mb-10 aspect-video rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
              <ImageIcon size={48} className="text-slate-200" />
            </div>
          )}

          <div className="prose prose-slate max-w-none prose-p:text-slate-600 prose-p:leading-relaxed prose-headings:text-slate-900">
            {post.ringkasan && (
              <div className="text-lg text-slate-700 font-semibold mb-8 border-l-4 border-emerald-500 pl-6 py-1">
                {post.ringkasan}
              </div>
            )}
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-base md:text-lg">
              {post.konten}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
