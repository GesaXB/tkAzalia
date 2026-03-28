import { getSiteUrl } from "@/lib/seo";

export default function JsonLd() {
  const APP_URL = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": `${APP_URL}/#organization`,
        "name": "TK Azalia",
        "alternateName": ["Taman Kanak-Kanak Azalia", "TK Azalia Islami"],
        "url": APP_URL,
        "logo": {
          "@type": "ImageObject",
          "@id": `${APP_URL}/#logo`,
          "url": `${APP_URL}/logotk.png`,
          "contentUrl": `${APP_URL}/logotk.png`,
          "width": 512,
          "height": 512,
          "caption": "Logo TK Azalia"
        },
        "image": [
          `${APP_URL}/logotk.png`,
          `${APP_URL}/fasilitas.jpeg`,
          `${APP_URL}/foto-kegiatan.jpeg`
        ],
        "description": "TK Azalia adalah Taman Kanak-Kanak Islami yang menawarkan pendidikan anak usia dini berkualitas dengan pengembangan karakter Islami, akademik yang seimbang, serta lingkungan belajar yang aman dan menyenangkan.",
        "priceRange": "Terjangkau",
        "openingHours": ["Mo-Fr 07:00-13:00"],
        "hasMap": "https://maps.google.com/?q=TK+Azalia",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Bandung",
          "addressRegion": "Jawa Barat",
          "addressCountry": "ID"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": -6.9174639,
          "longitude": 107.6191228
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "contactType": "admissions",
            "telephone": "+6281234567890",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian"],
            "hoursAvailable": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "07:00",
              "closes": "13:00"
            }
          }
        ],
        "sameAs": [
          "https://www.instagram.com/tkazalia",
          "https://www.facebook.com/tkazalia"
        ],
        "foundingDate": "2010",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "minValue": 5,
          "maxValue": 20
        },
        "areaServed": {
          "@type": "City",
          "name": "Bandung"
        },
        "knowsAbout": [
          "Pendidikan Anak Usia Dini",
          "Pendidikan Islami",
          "Taman Kanak-Kanak",
          "PAUD"
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Program Pendidikan TK Azalia",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Kelas TK A",
                "description": "Program untuk anak usia 4-5 tahun"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Course",
                "name": "Kelas TK B",
                "description": "Program untuk anak usia 5-6 tahun"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${APP_URL}/#website`,
        "url": APP_URL,
        "name": "TK Azalia",
        "description": "Website resmi TK Azalia - Taman Kanak-Kanak Islami Terpadu",
        "inLanguage": "id-ID",
        "publisher": {
          "@id": `${APP_URL}/#organization`
        }
      },
      {
        "@type": "WebPage",
        "@id": `${APP_URL}/#webpage`,
        "url": APP_URL,
        "name": "TK Azalia - Taman Kanak-Kanak Islami Terpadu",
        "isPartOf": {
          "@id": `${APP_URL}/#website`
        },
        "about": {
          "@id": `${APP_URL}/#organization`
        },
        "description": "TK Azalia adalah Taman Kanak-Kanak Islami dengan pendidikan berkualitas untuk anak usia dini.",
        "inLanguage": "id-ID",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Beranda",
              "item": APP_URL
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Apa itu TK Azalia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TK Azalia adalah Taman Kanak-Kanak Islami yang menawarkan pendidikan anak usia dini berkualitas dengan pendekatan Islami dan lingkungan belajar yang aman dan menyenangkan."
            }
          },
          {
            "@type": "Question",
            "name": "Berapa usia yang diterima di TK Azalia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TK Azalia menerima siswa berusia 4-6 tahun. Kelas TK A untuk anak usia 4-5 tahun, dan Kelas TK B untuk anak usia 5-6 tahun."
            }
          },
          {
            "@type": "Question",
            "name": "Bagaimana cara mendaftar di TK Azalia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Pendaftaran dapat dilakukan melalui website TK Azalia di halaman pendaftaran, atau langsung datang ke sekolah selama jam operasional."
            }
          },
          {
            "@type": "Question",
            "name": "Kapan jam operasional TK Azalia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "TK Azalia beroperasi setiap Senin hingga Jumat, pukul 07.00 - 13.00 WIB."
            }
          }
        ]
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
