import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tkazalia.vercel.app';

  // Dapatkan semua artikel aktif
  const posts = await prisma.informasiSekolah.findMany({
    where: { status: 'published' },
    select: { slug: true, uptadet_at: true },
  });

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.uptadet_at,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = [
    '',
    '/blog',
    '/program',
    '/galeri',
    '/tentang',
    '/pendaftaran',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.9,
  }));

  return [...routes, ...blogUrls];
}
