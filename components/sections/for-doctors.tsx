"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { DashboardMockup } from "@/components/shared/dashboard-mockup";
import { useMounted } from "@/lib/use-reduced-motion";

const BULLETS = [
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
    title: "Agenda siempre llena",
    body: "Pacientes verificados reservan según tu disponibilidad real, sin llamadas ni huecos vacíos.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Pacientes que ya confían",
    body: "Miles de usuarios llegan a tu perfil con intención real de consulta, no de漫游.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Tu perfil, tu sello",
    body: "Verificamos tu cédula y especialidad para que tu perfil destaque con el sello de Doctor Verificado.",
  },
  {
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "Seguimiento sin fricción",
    body: "Notas, recetas y resultados en formato digital — sin carpetas que se pierden ni llamadas de seguimiento.",
  },
];

export function ForDoctors() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="para-doctores"
      aria-labelledby="doctors-heading"
      className="relative isolate overflow-hidden bg-sana-primary-50/40 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sana-accent/15 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-8">
        <div className="order-2 mx-auto flex w-full justify-center lg:order-1">
          <DashboardMockup />
        </div>

        <div className="order-1 text-center sm:text-left lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-primary/15 bg-white px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            para doctores
          </span>
          <motion.h2
            id="doctors-heading"
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Más pacientes, menos{" "}
            <span className="text-gradient-sana">trámites.</span>
          </motion.h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-sana-muted sm:text-lg sm:mx-0">
            Sana te conecta con pacientes que buscan activamente tu
            especialidad, gestiona tu agenda y centraliza el seguimiento clínico
            en un solo lugar.
          </p>

          <ul className="mt-10 grid gap-3 text-left sm:grid-cols-2">
            {BULLETS.map((b, i) => (
              <motion.li
                key={b.title}
                initial={
                  !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex gap-3 rounded-2xl border border-sana-line bg-white p-4 transition-colors hover:border-sana-accent/40"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sana-primary-50 text-sana-primary">
                  {b.icon}
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold text-sana-primary">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-sana-muted">
                    {b.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          >
            <Button
              asChild
              size="lg"
              variant="primary"
              className="rounded-full"
            >
              <Link href="#cta-doctores">
                Quiero unirme a Sana
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full">
              <Link href="#doctor-verificado">Ver proceso de verificación</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
