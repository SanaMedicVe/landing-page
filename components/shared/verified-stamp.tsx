"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { BadgeCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

export function VerifiedStamp({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const mounted = useMounted();

  return (
    <motion.div
      initial={
        !mounted ? false : reduced ? false : { rotate: -22, scale: 2.4, opacity: 0 }
      }
      whileInView={{ rotate: -8, scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
      className={cn(
        "relative flex h-64 w-64 items-center justify-center rounded-full border-[3px] border-double border-sana-accent bg-white text-sana-accent-700",
        "shadow-[0_30px_60px_-20px_rgba(15,182,204,0.55)]",
        className,
      )}
    >
      <div className="absolute inset-2 rounded-full border border-dashed border-sana-accent/60" />
      <div className="flex flex-col items-center text-center">
        <BadgeCheck className="h-9 w-9 text-sana-accent" strokeWidth={1.8} />
        <p className="mt-2 font-heading text-2xl font-bold uppercase">
          Verificado
        </p>
        <p className="font-heading text-base font-semibold uppercase tracking-[0.18em]">
          Doctor
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-sana-muted">
          red · sana · latam
        </p>
      </div>
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