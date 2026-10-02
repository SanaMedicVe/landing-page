import type { MetadataRoute } from "next";

/**
 * robots.txt dinámico.
 *
 * - Producción (VERCEL_ENV === "production" o sin host de preview):
 *     indexa todo.
 * - Preview / staging (vercel preview, development, etc.):
 *     bloquea indexación para que Google no duplique contenido ni
 *     postee páginas sin terminar.
 *
 * El sitemap referenciado es /sitemap.xml (generado por app/sitemap.ts).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sana.lat";

  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
      sitemap: `${siteUrl}/sitemap.xml`,
      host: siteUrl,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}