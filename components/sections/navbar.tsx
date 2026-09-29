"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { Menu, X, Activity } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/lib/use-reduced-motion";

const NAV_LINKS = [
  { label: "Cómo funciona", anchor: "#como-funciona" },
  { label: "Pacientes", anchor: "#para-pacientes" },
  { label: "Doctores", anchor: "#para-doctores" },
  { label: "Seguridad", anchor: "#seguridad" },
  { label: "Preguntas", anchor: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const reduced = useReducedMotion();
  const mounted = useMounted();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <motion.div
        initial={!mounted ? false : reduced ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/40 px-3 py-2 sm:px-5 sm:py-2.5",
          scrolled
            ? "bg-white/70 shadow-[0_8px_30px_-12px_rgba(0,63,110,0.25)] backdrop-blur-xl backdrop-saturate-150"
            : "bg-white/40 backdrop-blur-md",
        )}
      >
        {/* Logo */}
        <Link
          href="#top"
          aria-label="Sana — ir al inicio"
          className="group flex items-center gap-2.5 pl-1"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-hero-gradient shadow-[0_4px_18px_-6px_rgba(0,63,110,0.55)]">
            <Activity
              className="h-4 w-4 text-white"
              strokeWidth={2.4}
              aria-hidden
            />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-sana-accent ecg-blink" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-heading text-lg font-bold tracking-tight text-sana-primary">
              Sana
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-sana-muted-soft">
              pulso·digital
            </span>
          </span>
        </Link>

        {/* Anchors (md+) */}
        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.anchor}
              href={l.anchor}
              className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-sana-primary/80 transition-colors hover:text-sana-primary"
            >
              <span>{l.label}</span>
              <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px scale-x-0 bg-sana-accent transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* CTAs (md+) */}
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild size="sm" variant="ghost" className="rounded-full">
            <Link href="#cta-doctores">Soy doctor</Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="primary"
            className="beam-border rounded-full"
          >
            <Link href="#cta-pacientes">Soy paciente</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((s) => !s)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sana-line bg-white text-sana-primary md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </motion.div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Menú"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/40 bg-white/85 p-3 shadow-[0_12px_40px_-12px_rgba(0,63,110,0.25)] backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map((l) => (
                <li key={l.anchor}>
                  <Link
                    onClick={() => setOpen(false)}
                    href={l.anchor}
                    className="block rounded-xl px-3 py-3 text-sm font-medium text-sana-primary hover:bg-sana-primary-50"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-sana-line pt-3">
              <Button asChild size="sm" variant="outline">
                <Link onClick={() => setOpen(false)} href="#cta-doctores">
                  Soy doctor
                </Link>
              </Button>
              <Button asChild size="sm" variant="primary">
                <Link onClick={() => setOpen(false)} href="#cta-pacientes">
                  Soy paciente
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
