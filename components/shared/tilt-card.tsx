"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number; // en grados
  className?: string;
  children: React.ReactNode;
}

/**
 * Tilt 3D parallax al mover el mouse.
 * Usa springs de motion para suavizar el movimiento.
 */
export function TiltCard({
  maxTilt = 8,
  className,
  children,
  ...rest
}: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 22, mass: 0.6 });

  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      className={cn("relative", className)}
      {...(rest as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
}
