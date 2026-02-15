"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getArtikelBySlug } from "@/lib/client/public";
import type { PublicInformasiSekolahItem } from "@/lib/client/public";
import { ArrowLeft, ImageIcon } from "lucide-react";

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
      <article className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Kembali ke Blog
          </Link>

          <header>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 mb-4">
              {KATEGORI_LABEL[post.tipe] || post.tipe}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              {post.judul}
            </h1>
            {post.created_at && (
              <time className="block mt-3 text-sm text-gray-500">
                {formatDate(post.created_at)}
              </time>
            )}
          </header>

          {post.gambar && (
            <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={post.gambar}
                alt={post.judul}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {!post.gambar && (
            <div className="mt-8 aspect-video rounded-2xl bg-gray-50 flex items-center justify-center">
              <ImageIcon size={64} className="text-gray-200" />
            </div>
          )}

          <div className="mt-8 prose prose-gray max-w-none prose-p:text-gray-600 prose-p:leading-relaxed prose-headings:text-gray-900">
            {post.ringkasan && (
              <p className="text-lg text-gray-700 font-medium mb-6">
                {post.ringkasan}
              </p>
            )}
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.konten}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
