import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { ValueProps } from "@/components/sections/value-props";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ForPatients } from "@/components/sections/for-patients";
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
};

export default function Home() {
  return (
    <>
      <EcgBackdrop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <ValueProps />
        <Problem />
        <HowItWorks />
        <ForPatients />
        <ForDoctors />
        <Security />
        <VerifiedDoctor />
        <Benefits />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
