import { prisma } from "@/lib/prisma";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

function escapeCdata(text: string): string {
  return text.replace(/]]>/g, "]]]]><![CDATA[>");
}

export async function GET() {
  const base = getSiteUrl();
  const posts = await prisma.informasiSekolah.findMany({
    where: { status: "published" },
    orderBy: { created_at: "desc" },
    take: 50,
    select: {
      judul: true,
      slug: true,
      ringkasan: true,
      created_at: true,
      uptadet_at: true,
    },
  });

  const items = posts
    .map((p) => {
      const desc = escapeCdata(p.ringkasan || "");
      const title = escapeCdata(p.judul);
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${base}/blog/${p.slug}</link>
      <guid isPermaLink="true">${base}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${desc}]]></description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TK Azalia - Berita &amp; Artikel</title>
    <link>${base}/blog</link>
    <description>Berita, kegiatan, dan artikel dari TK Azalia</description>
    <language>id-ID</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${base}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
