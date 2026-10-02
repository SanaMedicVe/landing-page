import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { ValueProps } from "@/components/sections/value-props";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ForPatients } from "@/components/sections/for-patients";
import { AppPreview } from "@/components/sections/app-preview";
import { ForDoctors } from "@/components/sections/for-doctors";
import { Security } from "@/components/sections/security";
import { VerifiedDoctor } from "@/components/sections/verified-doctor";
import { Benefits } from "@/components/sections/benefits";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";
import { EcgBackdrop } from "@/components/shared/ecg-backdrop";

export const metadata: Metadata = {
  title: "Sana — Tu salud, conectada en tiempo real",
  description:
    "Pacientes y doctores verificados, conectados en una sola plataforma — diseñada para LATAM.",
  alternates: {
    canonical: "/",
    languages: {
      "es-419": "/",
      es: "/",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sana — Tu salud, conectada en tiempo real",
    description:
      "Pacientes y doctores verificados, conectados en una sola plataforma — diseñada para LATAM.",
    siteName: "Sana",
    locale: "es_LA",
    images: [
      {
        url: "/og-sana.png",
        width: 1200,
        height: 630,
        alt: "Sana — tu salud, conectada en tiempo real",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sana — Tu salud, conectada en tiempo real",
    description:
      "Pacientes y doctores verificados, conectados en una sola plataforma — diseñada para LATAM.",
    images: ["/og-sana.png"],
  },
};

export default function Home() {
  return (
    <>
      <EcgBackdrop />
      <Navbar />
      <main className="relative z-10">
        {/* ── BLOQUE 1: PACIENTES ─────────────────────────── */}
        <Hero />
        <ValueProps />
        <Problem />
        <HowItWorks />
        <ForPatients />
        <AppPreview />
        <Security />
        <Benefits />
        <Faq />
        <FinalCta />

        {/* ── BLOQUE 2: DOCTORES ─────────────────────────── */}
        <ForDoctors />
        <VerifiedDoctor />
      </main>
      <Footer />
    </>
  );
}
