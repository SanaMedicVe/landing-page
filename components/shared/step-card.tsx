"use client";

import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

type StepCardProps = {
  icon: LucideIcon;
  n: string;
  title: string;
  body: string;
  index: number;
};

export function StepCard({ icon: Icon, n, title, body, index }: StepCardProps) {
  const reduced = React.useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  ).current;
  const mounted = useMounted();

  return (
    <div
      className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-sana-line bg-white p-7",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(0,63,110,0.35)]",
      )}
    >
      {mounted && !reduced && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[68px] -translate-x-1/2"
        >
          <span
            className="ripple-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sana-accent/60"
            style={{ animationDelay: `${index * 0.4}s` }}
          />
          <span
            className="ripple-ring absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sana-accent/40"
            style={{ animationDelay: `${index * 0.4 + 0.6}s` }}
          />
        </div>
      )}

      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-hero-gradient text-white shadow-[0_12px_28px_-10px_rgba(0,63,110,0.55)]">
        <Icon className="h-7 w-7" />
        <span className="absolute -right-1.5 -top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-sana-primary ring-2 ring-sana-accent font-mono">
          {n}
        </span>
      </div>

      <h3 className="mt-6 font-heading text-xl font-semibold text-sana-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-sana-muted">{body}</p>

      <svg viewBox="0 0 200 30" className="mt-6 h-7 w-full" aria-hidden>
        <path
          d="M0 15 L40 15 L55 8 L65 22 L75 15 L120 15 L140 8 L150 22 L160 15 L200 15"
          fill="none"
          stroke="#0fb6cc"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px rgba(15,182,204,0.5))" }}
        />
      </svg>
    </div>
  );
}