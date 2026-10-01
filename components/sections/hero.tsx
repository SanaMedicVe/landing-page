"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Smartphone,
  ArrowRight,
  CalendarCheck,
  Video,
  Pill,
  HeartPulse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TiltCard } from "@/components/shared/tilt-card";
import { Typewriter } from "@/components/shared/typewriter";
import { CountUp } from "@/components/shared/count-up";
import { EcgLine } from "@/components/shared/ecg-line";
import { Stat } from "@/components/shared/stat";
import {
  AppStoreBadge,
  GooglePlayBadge,
} from "@/components/shared/store-badges";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";
import { externalLinkProps, getPatientAppUrl } from "@/lib/links";

export function Hero() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-night-gradient pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32"
    >
      <EcgLine mood="calm-night" tone="dark" className="opacity-90" />

      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[480px] w-[680px] -translate-x-1/2 rounded-full bg-sana-accent/15 blur-[120px]" />
        <div className="absolute right-[-10%] top-1/3 h-[320px] w-[320px] rounded-full bg-sana-accent/10 blur-[110px]" />
        <div className="bg-grid-faint absolute inset-0 opacity-40" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-8">
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
            Sana es tu app de salud: agenda citas con doctores verificados,
            recibe seguimiento real y lleva tu historial siempre contigo.
            Disponible en iOS y Android.
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
              <Link
                href={getPatientAppUrl()}
                {...externalLinkProps(getPatientAppUrl())}
              >
                <Smartphone className="h-4 w-4" />
                Descargar la app
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="glassDark"
              className="rounded-full"
            >
              <Link href="#como-funciona">Cómo funciona</Link>
            </Button>
          </motion.div>

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
            <Stat label="descargas" value={<CountUp to={10000} suffix="+" />} />
            <Stat label="especialidades" value={<CountUp to={32} />} />
            <Stat
              label="respuesta media"
              value={<CountUp to={2} suffix=" min" decimals={0} />}
            />
          </motion.dl>
        </div>

        <div className="relative">
          <div className="grid gap-5">
            <TiltCard className="h-full" maxTilt={6}>
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
                    app móvil
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-xl font-semibold text-white">
                  Tu salud en el bolsillo
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  Agenda, consulta y da seguimiento sin perder el hilo.
                </p>

                <div className="mt-6 space-y-2.5">
                  {[
                    { icon: CalendarCheck, label: "Agenda tus citas" },
                    { icon: Video, label: "Videoconsulta desde la app" },
                    { icon: Pill, label: "Recordatorios de medicamentos" },
                    { icon: HeartPulse, label: "Tu historial siempre contigo" },
                  ].map((feat) => (
                    <div
                      key={feat.label}
                      className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2"
                    >
                      <feat.icon className="h-3.5 w-3.5 text-sana-accent" />
                      <span className="text-xs text-white/80">
                        {feat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sana-accent/80">
                profesionales que te atienden
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-white/65 sm:grid-cols-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  Cardiología
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  Pediatría
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  Nutrición
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  Dermatología
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  Ginecología
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-center">
                  +27 más
                </span>
              </div>
            </div>
          </div>

          <motion.div
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 2.35,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70 sm:justify-start"
          >
            <AppStoreBadge />
            <GooglePlayBadge />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
