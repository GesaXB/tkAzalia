import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();

  // Dapatkan semua artikel aktif
  const posts = await prisma.informasiSekolah.findMany({
    where: { status: 'published' },
    select: { slug: true, uptadet_at: true },
  });

  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.uptadet_at,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const routes = [
    { path: "", priority: 1.0, freq: "daily" },
    { path: "/about", priority: 0.9, freq: "weekly" },
    { path: "/program", priority: 0.9, freq: "weekly" },
    { path: "/pendaftaran", priority: 0.95, freq: "daily" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.85, freq: "daily" },
    { path: "/privacy-policy", priority: 0.4, freq: "yearly" },
    { path: "/terms-and-conditions", priority: 0.4, freq: "yearly" },
  ].map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as 'daily' | 'weekly' | 'monthly',
    priority,
  }));

  return [...routes, ...blogUrls];
}
