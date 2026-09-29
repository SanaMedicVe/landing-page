"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

interface CountUpProps {
  to: number;
  /** Prefijo visible, p. ej. "+". */
  prefix?: string;
  /** Sufijo visible, p. ej. "%". */
  suffix?: string;
  /** Duración total en segundos (sincronizada con pulso ~60bpm = 1s). */
  duration?: number;
  className?: string;
  /** Decimales a mostrar. */
  decimals?: number;
}

/**
 * Contador que sube de 0 al valor "to" cuando entra al viewport.
 * Usa easing personalizado (sin ease-in-out genérico).
 */
export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
  decimals = 0,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [value, setValue] = React.useState<number>(() =>
    reduced ? to : 0
  );

  React.useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      // Easing tipo "pulse" (1 - exp decay inverso)
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * to);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString("es-MX");

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 6 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}
