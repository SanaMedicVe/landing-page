"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Lock, Database, ShieldCheck, Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const PILLARS = [
  {
    icon: Lock,
    label: "Cifrado de extremo a extremo",
  },
  {
    icon: Database,
    label: "Almacenamiento con estándares regionales",
  },
  {
    icon: ShieldCheck,
    label: "Acceso verificado por rol",
  },
  {
    icon: Eye,
    label: "Trazabilidad y control para el paciente",
  },
];

export function Security() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      id="seguridad"
      aria-labelledby="security-heading"
      className="relative isolate overflow-hidden bg-sana-night py-20 text-white sm:py-28"
    >
      {/* línea ECG muy plana (calma) */}
      <div aria-hidden className="absolute inset-x-0 top-12 h-[100px]">
        <svg
          viewBox="0 0 520 100"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <path
            d="M0 50 L60 49 L120 51 L200 50 L260 49 L320 51 L400 50 L460 50 L520 50"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {mounted && !reduced && (
          <span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-sana-accent pulse-dot"
            style={{
              left: "0%",
              animation:
                "ecg-travel 12s linear infinite, sana-pulse 1s var(--ease-sana-pulse) infinite",
              boxShadow: "0 0 12px 2px rgba(15,182,204,0.7)",
            }}
          />
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-grid-faint opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full bg-sana-accent/10 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-sana-accent" />
            seguridad y confianza
          </span>
          <motion.h2
            id="security-heading"
            initial={!mounted ? false : reduced ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-heading text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
          >
            Privacidad{" "}
          </motion.h2>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
          >
            Tu información viaja cifrada de extremo a extremo y se almacena
            cumpliendo con los estándares de protección de datos en salud
            aplicables a la región. Sana no hace claims regulatorios específicos
            hasta que el equipo Legal los aprueba.
          </motion.p>

          <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {PILLARS.map((p, i) => (
              <motion.li
                key={p.label}
                initial={
                  !mounted ? false : reduced ? false : { opacity: 0, y: 14 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sana-accent/15 text-sana-accent">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium text-white/90">
                  {p.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
        {/* Card "custodia de datos" */}
        <motion.div
          initial={
            !mounted ? false : reduced ? false : { opacity: 0, scale: 0.96 }
          }
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md",
          )}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-sana-accent">
            data · custody
          </p>
          <h3 className="mt-2 font-heading text-xl font-semibold text-white">
            Tu información no se vende. No se reutiliza. No se pierde.
          </h3>

          <ol className="mt-6 space-y-5">
            {[
              {
                t: "En tránsito",
                d: "TLS 1.3 entre tu dispositivo y nuestros servicios.",
              },
              {
                t: "En reposo",
                d: "Cifrado en bases de datos dentro de la región LATAM.",
              },
              {
                t: "En uso",
                d: "Acceso por rol. Cada acción queda registrada.",
              },
            ].map((row, i) => (
              <li key={row.t} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sana-accent/15 font-mono text-xs text-sana-accent">
                  {i + 1}
                </span>
                <div>
                  <p className="font-heading text-sm font-semibold text-white">
                    {row.t}
                  </p>
                  <p className="text-sm text-white/70">{row.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-sana-accent/20 blur-3xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
