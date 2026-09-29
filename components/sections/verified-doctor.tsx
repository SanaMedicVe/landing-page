"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck, IdCard, ShieldCheck, ScrollText } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const STEPS = [
  {
    icon: IdCard,
    t: "Cédula vigente",
    d: "Verificamos que la cédula profesional se encuentre activa en el registro correspondiente.",
  },
  {
    icon: ScrollText,
    t: "Especialidad acreditada",
    d: "Comprobamos el título de especialidad antes de habilitar el perfil.",
  },
  {
    icon: BadgeCheck,
    t: "Perfil disponible",
    d: "Solo después de ambas verificaciones, el perfil queda visible para los pacientes.",
  },
];

export function VerifiedDoctor() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="verified-doctor"
      aria-labelledby="vd-heading"
      className="relative isolate overflow-hidden bg-white py-20 sm:py-28"
    >
      {/* halo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 h-[420px] w-[420px] rounded-full bg-sana-accent/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-sana-primary/10 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        {/* Sello animado */}
        <div className="relative flex items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 mx-auto h-72 w-72 rounded-full bg-gradient-to-br from-sana-accent/25 to-sana-primary/15 blur-3xl"
          />
          <Stamp reduced={!!reduced} mounted={mounted} />
        </div>

        {/* Texto */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-sana-accent/30 bg-sana-accent-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-sana-accent-700">
            <BadgeCheck className="h-3.5 w-3.5" />
            Verified Doctor
          </span>
          <motion.h2
            id="vd-heading"
            initial={
              !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-sana-primary sm:text-4xl lg:text-5xl"
          >
            Verified Doctor.
          </motion.h2>
          <motion.p
            initial={
              !mounted ? false : reduced ? false : { opacity: 0, y: 10 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-sana-muted sm:text-lg"
          >
            Solo profesionales con cédula profesional vigente y especialidad
            acreditada forman parte de la red Sana. Cada perfil es verificado
            antes de estar disponible para los pacientes.
          </motion.p>

          <ol className="mt-10 space-y-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.t}
                initial={
                  !mounted ? false : reduced ? false : { opacity: 0, x: -12 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sana-primary text-white shadow-[0_8px_18px_-6px_rgba(0,63,110,0.5)]">
                  <s.icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-heading text-base font-semibold text-sana-primary">
                    {s.t}
                  </p>
                  <p className="text-sm leading-relaxed text-sana-muted">
                    {s.d}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-sana-line bg-sana-primary-50 px-3 py-1.5 text-xs text-sana-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-sana-accent" />
            Lenguaje factual — sin claims no comprobables.
          </p>
        </div>
      </div>
    </section>
  );
}

function Stamp({
  reduced,
  mounted,
}: {
  reduced: boolean;
  mounted: boolean;
}) {
  return (
    <motion.div
      initial={
        !mounted
          ? false
          : reduced
            ? false
            : { rotate: -22, scale: 2.4, opacity: 0 }
      }
      whileInView={{ rotate: -8, scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.9,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      className={cn(
        "relative flex h-64 w-64 items-center justify-center rounded-full border-[3px] border-double border-sana-accent bg-white text-sana-accent-700",
        "shadow-[0_30px_60px_-20px_rgba(15,182,204,0.55)]",
      )}
    >
      {/* borde punteado exterior */}
      <div className="absolute inset-2 rounded-full border border-dashed border-sana-accent/60" />
      <div className="flex flex-col items-center text-center">
        <BadgeCheck className="h-9 w-9 text-sana-accent" strokeWidth={1.8} />
        <p className="mt-2 font-heading text-2xl font-bold uppercase">
          Verified
        </p>
        <p className="font-heading text-base font-semibold uppercase tracking-[0.18em]">
          Doctor
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-sana-muted">
          red · sana · latam
        </p>
      </div>
      {/* textura de sello */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full opacity-[0.08] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #000 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, #000 0.5px, transparent 1px)",
          backgroundSize: "6px 6px, 7px 7px",
        }}
      />
    </motion.div>
  );
}