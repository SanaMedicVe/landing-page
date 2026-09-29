import type { Metadata } from "next";
import { Open_Sans, Comfortaa, Geist_Mono, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sana.lat"),
  title: {
    default: "Sana — Tu salud, conectada en tiempo real",
    template: "%s | Sana",
  },
  description:
    "Sana une a pacientes con doctores verificados desde una app intuitiva y un panel clínico diseñado para profesionales de la salud en Latinoamérica.",
  applicationName: "Sana",
  authors: [{ name: "Sana" }],
  keywords: [
    "salud",
    "telemedicina",
    "doctores verificados",
    "consultas médicas",
    "historial clínico",
    "Sana",
    "LATAM",
  ],
  openGraph: {
    type: "website",
    locale: "es_LA",
    url: "https://sana.lat",
    siteName: "Sana",
    title: "Sana — Tu salud, conectada en tiempo real",
    description:
      "Pacientes y doctores verificados, conectados en una sola plataforma. Descubre Sana.",
    images: [
      {
        url: "/og-sana.svg",
        width: 1200,
        height: 630,
        alt: "Sana — salud conectada en tiempo real",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana — Tu salud, conectada en tiempo real",
    description:
      "Pacientes y doctores verificados, conectados en una sola plataforma.",
    images: ["/og-sana.svg"],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
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
      className={cn("h-full", "antialiased", heading.variable, mono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-white text-sana-primary selection:bg-sana-accent/40">
        {children}
      </body>
    </html>
  );
}
