"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Smartphone, ArrowRight, Activity, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMounted } from "@/lib/use-reduced-motion";
import {
  AppStoreBadge,
  GooglePlayBadge,
} from "@/components/shared/store-badges";

export function FinalCta() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="relative isolate overflow-hidden bg-night-gradient py-24 text-white sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-sana-accent/20 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-sana-accent/10 blur-[110px]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-12 h-[80px] opacity-80"
      >
        <svg
          viewBox="0 0 520 80"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 40 L60 40 L80 32 L88 40 L120 40 L150 18 L170 62 L190 40 L260 40 L290 40 L320 18 L340 62 L360 40 L440 40 L460 38 L520 42"
            fill="none"
            stroke="rgba(15,182,204,0.65)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(15,182,204,0.6))" }}
          />
        </svg>
        {mounted && !reduced && (
          <span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sana-accent pulse-dot"
            style={{
              left: "0%",
              animation:
                "ecg-travel 11s linear infinite, sana-pulse 1s var(--ease-sana-pulse) infinite",
              boxShadow: "0 0 12px 2px rgba(15,182,204,0.7)",
            }}
          />
        )}
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center lg:px-8">
        {/* centrado responsive ya está en text-center */}
        <motion.div
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <Activity className="h-3.5 w-3.5 text-sana-accent" />
            Sana · LATAM
          </span>
        </motion.div>

        <motion.h2
          id="final-cta-heading"
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-heading text-3xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        >
          Tu próxima consulta
          <br />
          <span className="text-gradient-sana-light">
            empieza en tu bolsillo.
          </span>
        </motion.h2>

        <motion.p
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
        >
          Descarga Sana, crea tu perfil en menos de 2 minutos y conecta con
          doctores verificados. Tu salud, siempre contigo.
        </motion.p>

        <motion.div
          id="cta-pacientes"
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <Button
            asChild
            size="lg"
            variant="accent"
            className="beam-border group rounded-full"
          >
            <Link href="#top">
              <Smartphone className="h-4 w-4" />
              Descargar la app gratis
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
        </motion.div>

        <motion.div
          id="cta-doctores"
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <Link
            href="#para-doctores"
            className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors hover:text-sana-accent"
          >
            <Stethoscope className="h-4 w-4" />
            ¿Eres profesional de la salud?
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        <p className="mt-6 text-xs text-white/55">
          Compatible con iOS y Android. Tu información siempre protegida.
        </p>
      </div>
    </section>
  );
}
