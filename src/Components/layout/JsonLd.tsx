export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://tkazalia.vercel.app/#organization",
        "name": "TK Azalia",
        "url": "https://tkazalia.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://tkazalia.vercel.app/logotk.png"
        },
        "image": "https://tkazalia.vercel.app/logotk.png",
        "description": "TK Azalia - Pendidikan Anak Usia Dini berkualitas dengan pengembangan karakter Islami dan akademik yang seimbang.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bandung",
          "addressRegion": "Jawa Barat",
          "addressCountry": "ID"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+6281234567890",
          "contactType": "Informasi Pendaftaran",
          "areaServed": "ID",
          "availableLanguage": "Indonesian"
        },
        "sameAs": [
          "https://www.instagram.com/tkazalia",
          "https://www.facebook.com/tkazalia"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://tkazalia.vercel.app/#website",
        "url": "https://tkazalia.vercel.app",
        "name": "TK Azalia",
        "publisher": {
          "@id": "https://tkazalia.vercel.app/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://tkazalia.vercel.app/blog?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
