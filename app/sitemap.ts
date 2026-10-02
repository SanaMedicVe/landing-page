import type { MetadataRoute } from "next";

/**
 * Sitemap XML.
 *
 * Indexa las 4 rutas públicas de Sana. lastModified usa la fecha
 * actual (la landing se mantiene "viva"); changeFrequency y priority
 * reflejan la jerarquía: la home manda, las páginas legales son de
 * referencia.
 *
 * Si VERCEL_ENV !== "production" (staging/preview), devolvemos un
 * sitemap vacío para que los crawlers que respetan robots.txt no
 * tengan nada que rascar (y los que lo ignoran, al menos vean un
 * sitemap trivial).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sana.lat";

  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return [];
  }

  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "es-419": `${siteUrl}/`,
          es: `${siteUrl}/`,
        },
      },
    },
    {
      url: `${siteUrl}/terminos`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "es-419": `${siteUrl}/terminos`,
          es: `${siteUrl}/terminos`,
        },
      },
    },
    {
      url: `${siteUrl}/aviso-de-privacidad`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "es-419": `${siteUrl}/aviso-de-privacidad`,
          es: `${siteUrl}/aviso-de-privacidad`,
        },
      },
    },
    {
      url: `${siteUrl}/datos-de-salud`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
      alternates: {
        languages: {
          "es-419": `${siteUrl}/datos-de-salud`,
          es: `${siteUrl}/datos-de-salud`,
        },
      },
    },
  ];
}