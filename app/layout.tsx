import type { Metadata } from "next";
import { Comfortaa, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CookieBanner } from "@/components/shared/cookie-banner";

// Headings: Caviar Dreams. Como no está en Google Fonts, usamos Comfortaa
// (mismo aire geométrico redondeado) y registramos el nombre real como
// fallback para que, si el equipo de diseño carga la fuente original,
// el navegador la prefiera.
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

export const metadata: Metadata = {
  metadataBase: new URL("https://sana.lat"),
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
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://sana.lat",
    siteName: "Sana",
    title: "Sana — Tu app de salud, conectada en tiempo real",
    description:
      "Tu app de salud: agenda, consulta y lleva tu historial siempre contigo. Descubre Sana.",
    images: [
      {
        url: "/og-sana.svg",
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
    images: ["/og-sana.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/favicon.png", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
      {/* `suppressHydrationWarning` es seguro aquí: el `<body>` aloja
          el `<CookieBanner />` (Client Component) y el navegador puede
          añadir atributos extra (p.ej. `cz-shortcut-listen`) que no
          existen en el HTML del servidor. No afecta al contenido. */}
      <body
        className="min-h-full flex flex-col bg-white text-sana-primary selection:bg-sana-accent/40"
        suppressHydrationWarning
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
