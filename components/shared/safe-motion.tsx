"use client";

import * as React from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { useMounted } from "@/lib/use-reduced-motion";

type AnyMotionComponent = React.ComponentType<Record<string, unknown>>;

/**
 * `motion` SSR-safe: hasta que el componente esté montado en cliente,
 * todas las props de animación (`initial`, `animate`, `whileInView`, etc.)
 * se tratan como inertes para que el HTML del servidor coincida con el
 * primer render del cliente. Tras el mount, las animaciones funcionan
 * normalmente y se respeta `prefers-reduced-motion`.
 */
export function createSafeMotion<Tag extends keyof HTMLElementTagNameMap>(
  tag: Tag
) {
  type Props = HTMLMotionProps<Tag> & { children?: React.ReactNode };

  const MotionAny = motion(tag) as unknown as AnyMotionComponent;

  const SafeMotion = React.forwardRef<unknown, Props>(function SafeMotion(
    props,
    ref
  ) {
    const { initial, animate, whileInView, whileHover, whileTap, ...rest } =
      props as Props;
    const mounted = useMounted();
    const reduced = useReducedMotion();

    if (!mounted || reduced) {
      return <MotionAny ref={ref as React.Ref<unknown>} {...rest} />;
    }

    return (
      <MotionAny
        ref={ref as React.Ref<unknown>}
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