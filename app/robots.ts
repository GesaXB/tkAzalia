import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/api/",
        "/auth/",
        "/auth/login",
        "/auth/register",
        "/auth/forgotpassword",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
