import { prisma } from '@/lib/prisma';
import type { Metadata, ResolvingMetadata } from 'next';
import BlogDetailClient from './BlogDetailClient';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const data = await prisma.informasiSekolah.findFirst({
    where: { slug, status: 'published' },
    select: { judul: true, ringkasan: true, gambar: true }
  });

  if (!data) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  const images = data.gambar ? [data.gambar] : [];

  return {
    title: data.judul,
    description: data.ringkasan || `Artikel tentang ${data.judul}`,
    openGraph: {
      title: data.judul,
      description: data.ringkasan || `Artikel tentang ${data.judul}`,
      images,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.judul,
      description: data.ringkasan || `Artikel tentang ${data.judul}`,
      images,
    }
  };
}

export default function Page() {
  return <BlogDetailClient />;
}
