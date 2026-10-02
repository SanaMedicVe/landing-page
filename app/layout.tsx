import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Comfortaa, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieBanner } from "@/components/shared/cookie-banner";
import { AnalyticsProvider } from "@/components/shared/analytics-provider";
import { AnalyticsBoot } from "@/components/shared/analytics-boot";

const heading = Comfortaa({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Caviar Dreams", "system-ui", "sans-serif"],
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const isProduction = process.env.VERCEL_ENV === "production";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sana.lat";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#183d70" },
  ],
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sana — Tu app de salud, conectada en tiempo real",
    template: "%s | Sana",
  },
  description:
    "Sana es tu app de salud: agenda citas con doctores verificados, lleva tu historial siempre contigo y recibe seguimiento real desde tu celular. Pensada para LATAM.",
  applicationName: "Sana",
  authors: [{ name: "Sana" }],
  keywords: [
    "app de salud",
    "salud",
    "telemedicina",
    "doctores verificados",
    "consultas médicas",
    "historial clínico",
    "Sana",
    "LATAM",
    "pacientes",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-419": "/",
      es: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: SITE_URL,
    siteName: "Sana",
    title: "Sana — Tu app de salud, conectada en tiempo real",
    description:
      "Tu app de salud: agenda, consulta y lleva tu historial siempre contigo. Descubre Sana.",
    images: [
      {
        url: "/og-sana.png",
        width: 1200,
        height: 630,
        alt: "Sana — tu app de salud, conectada en tiempo real",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana — Tu app de salud, conectada en tiempo real",
    description:
      "Tu app de salud: agenda, consulta y lleva tu historial siempre contigo.",
    images: ["/og-sana.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  robots: isProduction
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : {
        index: false,
        follow: false,
        nocache: true,
        googleBot: { index: false, follow: false, nocache: true },
      },
  formatDetection: { telephone: false, address: false, email: false },
};

const jsonLd = isProduction
  ? [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Sana",
        url: SITE_URL,
        logo: `${SITE_URL}/logo/sana-logo-primary.svg`,
        description:
          "Sana es la app de salud que conecta a pacientes con doctores verificados en LATAM.",
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            email: "hola@sana.lat",
            availableLanguage: ["Spanish"],
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Sana",
        url: SITE_URL,
        inLanguage: "es-419",
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Sana",
        applicationCategory: "HealthApplication",
        operatingSystem: "iOS, Android",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description:
          "App móvil para que pacientes hispanohablantes en LATAM agenden citas con doctores verificados, hagan seguimiento y lleven su historial clínico siempre consigo.",
      },
    ]
  : [];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full",
        "antialiased",
        heading.variable,
        mono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body
        className="min-h-full flex flex-col bg-white text-sana-primary selection:bg-sana-accent/40"
        suppressHydrationWarning
      >
        {jsonLd.map((schema, i) => (
          <Script
            key={`ld-${i}`}
            id={`ld-json-${i}`}
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {JSON.stringify(schema)}
          </Script>
        ))}
        {children}
        <CookieBanner />
        <AnalyticsProvider />
        <AnalyticsBoot />
      </body>
    </html>
  );
}
