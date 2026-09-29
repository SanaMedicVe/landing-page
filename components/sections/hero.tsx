"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Stethoscope,
  Smartphone,
  ArrowRight,
  ShieldCheck,
  Apple,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { Typewriter } from "@/components/shared/typewriter";
import { CountUp } from "@/components/shared/count-up";
import { EcgLine } from "@/components/shared/ecg-line";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

export function Hero() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-night-gradient pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32"
    >
      {/* ECG line en la parte superior */}
      <EcgLine mood="calm-night" tone="dark" className="opacity-90" />

      {/* Halos de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-sana-accent/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[320px] w-[320px] rounded-full bg-sana-accent/10 blur-[110px]" />
        <div className="bg-grid-faint absolute inset-0 opacity-40" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
        {/* Copy */}
        <div className="relative z-10 flex flex-col items-start">
          <motion.div
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge variant="night" className="mb-6 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-sana-accent opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sana-accent" />
              </span>
              <span className="text-white/90">En vivo · red Sana LATAM</span>
            </Badge>
          </motion.div>

          <h1
            id="hero-heading"
            className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
          >
            <Typewriter text="Tu salud, conectada" delay={0.15} speed={0.045} />
            <br />
            <span className="text-gradient-sana-light">
              <Typewriter
                text="en tiempo real."
                delay={1.05}
                speed={0.045}
                caret={false}
              />
            </span>
          </h1>

          <motion.p
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.85,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Sana une a pacientes con doctores verificados — desde una app
            intuitiva que cabe en tu bolsillo, y un panel clínico diseñado para
            profesionales.
          </motion.p>

          <motion.div
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.05,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              variant="accent"
              className="beam-border group rounded-full"
            >
              <Link href="#cta-pacientes">
                <Smartphone className="h-4 w-4" />
                Soy paciente
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="glassDark"
              className="rounded-full"
            >
              <Link href="#cta-doctores">
                <Stethoscope className="h-4 w-4" />
                Soy doctor
              </Link>
            </Button>
          </motion.div>

          {/* Métricas con pulso */}
          <motion.dl
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.25,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-10 grid w-full max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6"
          >
            <Stat
              label="doctores verificados"
              value={<CountUp to={1200} suffix="+" />}
            />
            <Stat label="especialidades" value={<CountUp to={32} />} />
            <Stat
              label="latencia promedio"
              value={<CountUp to={2} suffix=" min" decimals={0} />}
            />
          </motion.dl>
        </div>

        {/* Tarjetas con tilt */}
        <div className="relative">
          <div className="grid gap-5 sm:grid-cols-2">
            <TiltCard className="h-full" maxTilt={7}>
              <div
                className={cn(
                  "relative h-full rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md",
                  "shadow-[0_30px_60px_-30px_rgba(15,182,204,0.5)]",
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sana-accent/15 text-sana-accent">
                    <Smartphone className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sana-accent/80">
                    pacientes
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  Tu salud en el bolsillo
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Agenda, consulta y recibe seguimiento sin perder el hilo.
                </p>
                {/* mini ECG */}
                <svg
                  viewBox="0 0 240 60"
                  className="mt-6 h-12 w-full"
                  aria-hidden
                >
                  <path
                    d="M0 30 L40 30 L55 22 L62 30 L72 30 L88 12 L102 48 L116 30 L160 30 L175 22 L182 30 L210 30 L220 18 L228 42 L236 30 L240 30"
                    fill="none"
                    stroke="#0fb6cc"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(15,182,204,0.6))",
                    }}
                  />
                </svg>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
                    Disponible iOS y Android
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
                    Historial centralizado
                  </li>
                </ul>
              </div>
            </TiltCard>

            <TiltCard className="h-full sm:translate-y-8" maxTilt={7}>
              <div
                className={cn(
                  "relative h-full rounded-3xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md",
                  "shadow-[0_30px_60px_-30px_rgba(0,63,110,0.6)]",
                )}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sana-accent/15 text-sana-accent">
                    <Stethoscope className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sana-accent/80">
                    profesionales
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  Tu panel clínico
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Pacientes verificados, listos para consulta.
                </p>

                {/* mini "preview" dashboard */}
                <div className="mt-6 space-y-2 rounded-2xl bg-sana-night-800/70 p-3 font-mono text-[11px] text-white/80 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">cédula</span>
                    <span className="text-sana-accent">verificada</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">agenda</span>
                    <span>4 citas hoy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">seguimiento</span>
                    <span>98% asistencia</span>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-3.5 w-3.5 text-sana-accent" />
                    Verified Doctor E3
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
                    Plataforma web
                  </li>
                </ul>
              </div>
            </TiltCard>
          </div>

          {/* Tiendas */}
          <motion.div
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 flex items-center gap-3 text-sm text-white/70"
          >
            <StoreBadge
              icon={<Apple className="h-4 w-4" />}
              label="App Store"
            />
            <StoreBadge label="Google Play" icon={<PlayGlyph />} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <dd className="flex items-center gap-2 font-heading text-2xl font-semibold text-white sm:text-3xl">
        <span className="inline-block h-2 w-2 rounded-full bg-sana-accent pulse-dot" />
        {value}
      </dd>
      <dt className="mt-1 text-xs uppercase tracking-wider text-white/55">
        {label}
      </dt>
    </div>
  );
}

function StoreBadge({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-medium text-white/85 backdrop-blur">
      {icon}
      {label}
    </span>
  );
}

function PlayGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      aria-hidden
      className="text-sana-accent"
    >
      <path
        fill="currentColor"
        d="M3 3.5v17a1 1 0 0 0 1.55.83l14-8.5a1 1 0 0 0 0-1.66l-14-8.5A1 1 0 0 0 3 3.5Z"
      />
    </svg>
  );
}
