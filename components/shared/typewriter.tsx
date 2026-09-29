"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

interface TypewriterProps {
  text: string;
  /** Delay inicial en ms. */
  delay?: number;
  /** Velocidad por carácter en ms. */
  speed?: number;
  className?: string;
  /** Si true, conserva el cursor parpadeante. */
  caret?: boolean;
}

/**
 * Typewriter minimalista: cada letra aparece con un stagger suave.
 * Respeta prefers-reduced-motion: si está activo, muestra el texto
 * completo sin animación.
 *
 * Hidratación: para evitar mismatch entre SSR y cliente, sólo animamos
 * después de montar en cliente. En el primer render del servidor (y del
 * cliente antes de montar) se muestra el texto completo estático.
 */
export function Typewriter({
  text,
  delay = 0,
  speed = 0.035,
  className,
  caret = true,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const chars = React.useMemo(() => Array.from(text), [text]);

  // SSR y primer render del cliente: texto estático sin estilos inline
  // problemáticos para la hidratación.
  if (!mounted || reduced) {
    return (
      <span className={className}>
        {text}
        {caret && <span className="ml-0.5 text-sana-accent">▍</span>}
      </span>
    );
  }

  return (
    <span className={className}>
      {chars.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * speed,
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {ch}
        </motion.span>
      ))}
      {caret && (
        <motion.span
          aria-hidden
          className="ml-1 inline-block w-[2px] bg-sana-accent align-middle"
          initial={{ height: "0.9em", opacity: 1 }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{
            delay: delay + chars.length * speed + 0.1,
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ height: "0.9em" }}
        />
      )}
    </span>
  );
}
