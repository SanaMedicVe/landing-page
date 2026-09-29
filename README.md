# Sana — Landing pública

Landing page oficial de **Sana**, la aplicación que conecta a pacientes con
doctores verificados en LATAM.

> **Idioma:** 100 % español · **Mercado objetivo:** Latinoamérica
> **Farmacias:** fuera del alcance público (no se anuncian, ni como
> "próximamente").

---

## Stack técnico

- **Next.js 16.3** (App Router + Turbopack)
- **React 19**
- **TypeScript** estricto
- **Tailwind CSS v4** (sintaxis `@theme`, sin `tailwind.config.js`)
- **shadcn/ui** — sólo los componentes necesarios:
  `button`, `card`, `accordion`, `badge`, `separator`
- **motion** (antes Framer Motion) — importar siempre desde `motion/react`
- **lucide-react** — iconografía (sin clichés médicos: sin corazones, cruces
  ni estetoscopios de stock)
- **NO** se usan: Lottie, 3D pesado, carruseles genéricos

## Cómo correr el proyecto

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
pnpm start
```

---

## Concepto creativo: "El Pulso Digital"

Toda la landing debe sentirse como un organismo vivo. La pieza central es
una **línea ECG horizontal persistente** que recorre toda la página,
cambiando su silueta según la sección visible.

| Sección | Mood del ECG | Sensación |
|---|---|---|
| Hero | `calm-night` | Pulso tranquilo nocturno |
| Cómo funciona | `steady` | Ritmo regular |
| Para pacientes / doctores | `calm` | Picos uniformes |
| Seguridad / Verified Doctor | `flat` | Calma total |
| FAQ | `steady` | Estable |
| Footer / CTA final | `calm-night` | Pulso nocturno |

Además del ECG:

- **Hero con tilt 3D** parallax al mover el mouse (springs de motion).
- **Headline con typewriter** letra por letra, sin scroll-jank.
- **Métricas con CountUp** sincronizadas a un pulso de ~60 bpm.
- **Pasos de "Cómo funciona"** con ondas `ripple` expansivas desde el icono.
- **Botones CTA primarios** con borde animado tipo *beam* (recorre el
  perímetro) — clase `.beam-border`.
- **Sello Verified Doctor** que se estampa (`rotate + scale + opacity`,
  easing `--ease-sana-stamp`).
- **Navbar con frosted glass** al hacer scroll (`backdrop-blur` + saturate).
- **Curvas easing personalizadas** (`--ease-sana-pulse`, `--ease-sana-soft`,
  `--ease-sana-snap`, `--ease-sana-stamp`). Nunca `ease-in-out` genérico.

---

## Paleta y tipografía

Definidas como CSS variables en `app/globals.css` con sintaxis Tailwind v4
(`@theme`):

- **Primary** `#003f6e` — Azul Profundo (PANTONE P 108 C)
- **Accent** `#0fb6cc` — Cian Vital (PANTONE P 121-6 C)
- **Night** `#183d70` — Azul Noche (PANTONE 295 U/C)
- **Fondo claro** `#FFFFFF` · **Fondo oscuro** `#183d70`
- **Texto principal** `#003f6e` (claro) / `#FFFFFF` (oscuro)
- **Texto secundario** gris 80 % / 60 %
- **Borde / divisor** gris 20 % / cian translúcido
- **Gradiente principal** linear `Azul Profundo → Cian Vital`

Tipografía:

- **Headings** — *Caviar Dreams*. Como no está en Google Fonts, se carga
  **Comfortaa** (mismo aire geométrico redondeado) con `next/font/google`
  y se registra `"Caviar Dreams"` como `fallback` para que, cuando el
  equipo de diseño cargue la fuente original, el navegador la prefiera.
- **Body** — *Open Sans* (Google Fonts)
- **Mono** — *Geist Mono* (Google Fonts)

---

## Sitemap / secciones

Orden estricto en `app/page.tsx`:

0. **Navbar flotante** — logo + anclas + CTAs "Soy paciente" / "Soy doctor"
1. **Hero** — propuesta de valor + CTAs + 2 tarjetas tilt
2. **Value props** — 4 chips de valor diferencial
3. **Problem** — storytelling de fricciones (caos → calma)
4. **How it works** — 3 pasos con ripple expansivo
5. **Para pacientes** — mockup de teléfono
6. **Para doctores** — mockup de dashboard web
7. **Seguridad** — copy prudente, sin claims legales específicos
8. **Verified Doctor** — lenguaje factual E3, sello estampado
9. **Beneficios** — grid asimétrico de 6
10. **FAQ** — acordeón shadcn (8 preguntas)
11. **CTAs finales** — cierre emocional + 2 CTAs
12. **Footer** — links legales + redes + copyright

---

## Accesibilidad y motion

- `prefers-reduced-motion: reduce` desactiva todas las animaciones y se
  respeta en cada componente (`useReducedMotion` basado en
  `useSyncExternalStore`).
- Focus-visible global con outline cian.
- Roles ARIA en navbar, accordions, dialog mobile.
- Contraste verificado en ambas paletas (claro / oscuro).
- HTML semántico (`<section>`, `<h1>-<h6>`, `<dl>` en métricas, `<button>`,
  `<a>`).

---

## Estructura de carpetas

```
.
├── app/
│   ├── globals.css          # @theme de Tailwind v4 + utilidades "Pulso Digital"
│   ├── layout.tsx           # metadata SEO en español, fuentes next/font
│   └── page.tsx             # orquesta las secciones en orden
├── components/
│   ├── shared/              # ECG, typewriter, count-up, tilt, observers
│   │   ├── ecg-backdrop.tsx
│   │   ├── ecg-line.tsx
│   │   ├── section-observer.tsx
│   │   ├── typewriter.tsx
│   │   ├── count-up.tsx
│   │   └── tilt-card.tsx
│   ├── sections/            # 1 archivo por sección
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── value-props.tsx
│   │   ├── problem.tsx
│   │   ├── how-it-works.tsx
│   │   ├── for-patients.tsx
│   │   ├── for-doctors.tsx
│   │   ├── security.tsx
│   │   ├── verified-doctor.tsx
│   │   ├── benefits.tsx
│   │   ├── faq.tsx
│   │   ├── final-cta.tsx
│   │   └── footer.tsx
│   └── ui/                  # primitivas shadcn (button, card, accordion…)
├── lib/
│   ├── utils.ts             # cn() — clsx + tailwind-merge
│   └── use-reduced-motion.ts
├── public/
│   ├── icon.svg             # favicon
│   └── og-sana.svg          # Open Graph 1200×630
├── components.json          # config shadcn
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

---

## Decisiones técnicas relevantes

- **Caviar Dreams no está en Google Fonts.** Se carga Comfortaa como
  sustituto de geometría compatible. Si el equipo de diseño sube la fuente
  original, basta con añadirla a `public/fonts/` y registrarla en
  `app/layout.tsx` con `next/font/local`.
- **Tailwind v4 usa `@theme` en CSS**, no `tailwind.config.js`. Toda la
  paleta y easings están en `app/globals.css`.
- **Server Components por defecto.** Solo los componentes con
  interactividad/animación llevan `"use client"` (la mayoría, porque la
  landing es muy expresiva visualmente).
- **`useReducedMotion` usa `useSyncExternalStore`** para cumplir con las
  reglas de React 19 sobre `setState` en effects (regla
  `react-hooks/set-state-in-effect` de Next 16 lint).
- **El validador de Next 16** (`/.next/types/validator.ts`) exige que las
  páginas tengan al menos un símbolo top-level además del default export
  — por eso `app/page.tsx` exporta también `metadata`. Sin esto, el
  validador reporta `is not a module`.
- **`lucide-react@1.48`** no incluye `Instagram`, `Twitter` ni `Linkedin`
  en esta versión; el footer usa glifos SVG inline personalizados.

---

## Criterios de aceptación (chequeo rápido)

- [x] Sitemap y orden aprobados
- [x] Copy principal tal como en el brief
- [x] No se anuncian features futuras
- [x] "Verified Doctor" con lenguaje factual (E3)
- [x] Farmacias NO se mencionan en ningún punto
- [x] Sin claims legales (HIPAA / ISO / GDPR)
- [x] Paleta Sana aplicada consistentemente
- [x] Animaciones innovadoras (no genéricas fade+slide)
- [x] 100 % en español
- [x] Responsive (mobile-first, sm / md / lg / xl)
- [x] `prefers-reduced-motion` respetado en todas las animaciones
- [x] `pnpm lint` y `pnpm build` pasan limpios
