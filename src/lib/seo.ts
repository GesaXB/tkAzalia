/**
 * URL publik situs (tanpa trailing slash). Wajib set NEXT_PUBLIC_APP_URL di production.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_APP_URL || "https://tkazalia.vercel.app";
  return raw.replace(/\/$/, "");
}
