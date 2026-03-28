import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/seo";
import ArticleJsonLd from "@/Components/layout/ArticleJsonLd";
import type { Metadata, ResolvingMetadata } from "next";
import { cache } from "react";
import BlogDetailClient from "./BlogDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const getPublishedArticle = cache(async (slug: string) => {
  return prisma.informasiSekolah.findFirst({
    where: { slug, status: "published" },
    select: {
      judul: true,
      ringkasan: true,
      gambar: true,
      created_at: true,
      uptadet_at: true,
      slug: true,
    },
  });
});

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPublishedArticle(slug);
  const base = getSiteUrl();
  const canonical = `/blog/${slug}`;

  if (!data) {
    return {
      title: "Artikel Tidak Ditemukan",
      robots: { index: false, follow: true },
    };
  }

  const description = data.ringkasan || `Baca artikel: ${data.judul} di TK Azalia.`;
  const ogImages = data.gambar
    ? [{ url: data.gambar, width: 1200, height: 630, alt: data.judul }]
    : [{ url: `${base}/logotk.png`, width: 512, height: 512, alt: data.judul }];

  return {
    title: data.judul,
    description,
    keywords: ["TK Azalia", "blog TK Azalia", data.judul],
    alternates: { canonical },
    openGraph: {
      title: data.judul,
      description,
      url: canonical,
      siteName: "TK Azalia",
      locale: "id_ID",
      type: "article",
      publishedTime: data.created_at.toISOString(),
      modifiedTime: data.uptadet_at.toISOString(),
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: data.judul,
      description,
      images: data.gambar ? [data.gambar] : [`${base}/logotk.png`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getPublishedArticle(slug);

  return (
    <>
      {data ? <ArticleJsonLd article={data} /> : null}
      <BlogDetailClient />
    </>
  );
}
