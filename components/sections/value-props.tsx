"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { UserCheck, FolderHeart, Clock4, ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const CHIPS = [
  {
    icon: UserCheck,
    label: "Doctores verificados, no bots",
    color: "from-sana-primary to-sana-accent",
  },
  {
    icon: FolderHeart,
    label: "Historial que viaja contigo",
    color: "from-sana-accent to-sana-primary",
  },
  {
    icon: Clock4,
    label: "Consultas cuando las necesitas",
    color: "from-sana-primary-600 to-sana-accent-500",
  },
  {
    icon: ShieldCheck,
    label: "Privacidad por diseño",
    color: "from-sana-accent-500 to-sana-night",
  },
];

export function ValueProps() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  return (
    <section
      aria-labelledby="value-heading"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <motion.h2
          id="value-heading"
          initial={!mounted ? false : reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-2xl font-semibold text-sana-primary sm:text-3xl"
        >
          Lo que hace diferente a Sana
        </motion.h2>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHIPS.map((chip, i) => (
            <motion.li
              key={chip.label}
              initial={
                !mounted ? false : reduced ? false : { opacity: 0, y: 16 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              <div
                className={cn(
                  "relative h-full overflow-hidden rounded-2xl border border-sana-line bg-white p-5",
                  "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(0,63,110,0.35)]",
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br opacity-[0.10] blur-2xl transition-opacity duration-500 group-hover:opacity-25",
                    chip.color,
                  )}
                />
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_8px_20px_-8px_rgba(0,63,110,0.4)]",
                      "bg-gradient-to-br",
                      chip.color,
                    )}
                  >
                    <chip.icon className="h-5 w-5" />
                  </span>
                  <p className="font-medium leading-snug text-sana-primary">
                    {chip.label}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-sana-accent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
