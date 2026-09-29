"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useMounted } from "@/lib/use-reduced-motion";

/**
 * `motion` SSR-safe: hasta que el componente esté montado en cliente,
 * todas las props de animación (`initial`, `animate`, `whileInView`, etc.)
 * se tratan como inertes para que el HTML del servidor coincida con el
 * primer render del cliente. Tras el mount, las animaciones funcionan
 * normalmente y se respeta `prefers-reduced-motion`.
 *
 * Esto evita los mismatches de hidratación que produce framer-motion
 * cuando escribe estilos inline de `initial` durante el SSR.
 *
 * La API es compatible con `motion.div`, `motion.h2`, etc.
 */
export function createSafeMotion<P extends keyof typeof motion>(
  Component: (typeof motion)[P]
) {
  type Props = HTMLMotionProps<P> & { children?: React.ReactNode };

  const SafeMotion = React.forwardRef<unknown, Props>(function SafeMotion(
    props,
    ref
  ) {
    const { initial, animate, whileInView, whileHover, whileTap, ...rest } =
      props;
    const mounted = useMounted();
    const reduced = useReducedMotion();

    if (!mounted || reduced) {
      // Sin animación, render normal
      const MotionAny = Component as unknown as React.ElementType;
      return <MotionAny ref={ref} {...rest} />;
    }

    const MotionAny = Component as unknown as React.ElementType;
    return (
      <MotionAny
        ref={ref}
        initial={initial}
        animate={animate}
        whileInView={whileInView}
        whileHover={whileHover}
        whileTap={whileTap}
        {...rest}
      />
    );
  });

  return SafeMotion;
}

export const SafeMotionDiv = createSafeMotion("div");
export const SafeMotionH2 = createSafeMotion("h2");
export const SafeMotionP = createSafeMotion("p");
export const SafeMotionLi = createSafeMotion("li");
export const SafeMotionDl = createSafeMotion("dl");
export const SafeMotionSpan = createSafeMotion("span");
export const SafeMotionSection = createSafeMotion("section");

export { motion, useReducedMotion, useMounted };
export type { Variants };
