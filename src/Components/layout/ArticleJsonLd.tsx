import { getSiteUrl } from "@/lib/seo";

type ArticleForLd = {
  judul: string;
  ringkasan: string | null;
  gambar: string | null;
  slug: string;
  created_at: Date;
  uptadet_at: Date;
};

export default function ArticleJsonLd({ article }: { article: ArticleForLd }) {
  const base = getSiteUrl();
  const url = `${base}/blog/${article.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.judul,
    description: article.ringkasan || undefined,
    image: article.gambar ? [article.gambar] : [`${base}/logotk.png`],
    datePublished: article.created_at.toISOString(),
    dateModified: article.uptadet_at.toISOString(),
    author: {
      "@type": "Organization",
      name: "TK Azalia",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "TK Azalia",
      url: base,
      logo: {
        "@type": "ImageObject",
        url: `${base}/logotk.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    inLanguage: "id-ID",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
