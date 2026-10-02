# Sana — Landing pública

Landing page oficial de **Sana**, la aplicación que conecta a pacientes con
doctores verificados en LATAM.

> **Idioma:** 100 % español · **Mercado objetivo:** Latinoamérica
> **Farmacias:** fuera del alcance público (no se anuncian, ni como
> "próximamente").

---

## Configuración de URLs externas

Todos los CTAs que salen de la landing (stores, login de doctores, redes
sociales, mails de contacto) leen sus URLs desde variables de entorno
públicas (`NEXT_PUBLIC_*`). Mientras la app no esté publicada o el login
de doctores no exista, los CTAs caen a `mailto:` seguros como último
fallback para que ningún enlace quede muerto.

Variables soportadas (todas opcionales; el helper en `lib/links.ts`
aplica fallback automático):

| Variable | Uso | Fallback |
| --- | --- | --- |
| `NEXT_PUBLIC_PATIENT_APP_IOS_URL` | App Store iOS | `mailto:app@sana.lat` |
| `NEXT_PUBLIC_PATIENT_APP_ANDROID_URL` | Google Play | `mailto:app@sana.lat` |
| `NEXT_PUBLIC_PATIENT_APP_URL` | URL única de la app | `NEXT_PUBLIC_PATIENT_APP_IOS_URL` |
| `NEXT_PUBLIC_DOCTOR_LOGIN_URL` | Login panel clínico | `mailto:doctores@sana.lat` |
| `NEXT_PUBLIC_DOCTOR_ONBOARDING_URL` | Formulario onboarding | `mailto:doctores@sana.lat` |
| `NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL` | Footer | (icono oculto si vacío) |
| `NEXT_PUBLIC_SOCIAL_X_URL` | Footer | (icono oculto si vacío) |
| `NEXT_PUBLIC_SOCIAL_LINKEDIN_URL` | Footer | (icono oculto si vacío) |
| `NEXT_PUBLIC_CONTACT_MAIL` | Mail principal | `hola@sana.lat` |
| `NEXT_PUBLIC_DOCTOR_CONTACT_MAIL` | Mail doctores | `doctores@sana.lat` |
| `NEXT_PUBLIC_LEGAL_MAIL` | Mail legal | `legal@sana.lat` |
| `NEXT_PUBLIC_PRIVACY_MAIL` | Mail privacidad | `privacidad@sana.lat` |

> **Importante:** cualquier URL externa añadida con estas variables se
> renderiza con `target="_blank"` y `rel="noopener noreferrer"`.

---

## Analítica y privacidad (Segment)

La landing captura **métricas mínimas de uso público** para distinguir
conversión Pacientes vs. Doctores y volumen de contacto. No se registra
información clínica ni información personal innecesaria.

### Eventos definidos

Todos centralizados en `lib/analytics.ts` (`ANALYTICS_EVENTS`):

| Evento | Cuándo se dispara | Audiencia |
| --- | --- | --- |
| `landing_visit` | Una vez por sesión, al montar la landing y tras aceptar cookies. | `patient` (denota visita pública) |
| `patient_cta` | Click en CTAs de paciente: "Descargar la app" (hero y final), badges de App Store y Google Play. | `patient` |
| `doctor_cta` | Click en CTAs de doctor: "Solicitar onboarding", "Ya soy doctor · Login", "¿Eres profesional de la salud?" (final). | `doctor` |
| `contact_cta` | Click en icono del footer: mailto de contacto, Instagram, X, LinkedIn. | `contact` |

### Propiedades permitidas (whitelist)

`lib/analytics.ts` define `ALLOWED_PROPS` por evento. Cualquier prop
fuera de la whitelist se descarta silenciosamente (fail-closed). Además,
`track()` sanitiza los valores: descarta strings con `?token=`,
`?code=`, `bearer …`, saltos de línea o longitud > 200.

| Evento | Props |
| --- | --- |
| `landing_visit` | `audience`, `section`, `locale` |
| `patient_cta` | `audience`, `cta_label`, `section`, `target_kind` |
| `doctor_cta` | `audience`, `cta_label`, `section`, `target_kind` |
| `contact_cta` | `audience`, `cta_label`, `section`, `channel` |

**Nunca** se envía la URL completa del CTA: el helper `classifyHref()`
devuelve un `target_kind` (`app_store_ios`, `app_store_android`,
`doctor_login`, `doctor_onboarding`, `mailto`, `social_instagram`,
`social_x`, `social_linkedin`, `anchor`, `external`) para que el destino
real no viaje a Segment y se imposibilite la fuga de tokens.

### Privacidad y consentimiento

- **Gate por consentimiento.** `track()` lee `localStorage`
  (`sana.cookie-consent.v1`) y **sólo emite cuando el visitante aceptó
  cookies**. Si el visitante rechazó, `track()` es no-op. Si aún no
  decidió, no emitimos hasta que el banner cambie la decisión a
  `accepted` (escuchamos `sana:cookies-changed`).
- **Sin PHI.** El módulo nunca lee inputs, URLs, query strings,
  `sessionStorage`, `localStorage` de la app, ni headers.
- **Sin tokens.** El sanitizador descarta valores que parezcan tokens
  (`?token=`, `?code=`, `?access_token=`, `bearer …`). Sólo se envía
  el `target_kind`, nunca el href.
- **Anti-duplicado.** `landing_visit` se marca en `sessionStorage`
  (`sana:analytics:visited.v1`) para que se emita como máximo una vez
  por sesión.
- **Modo "essential" en cookies rechazadas.** Si el visitante rechaza,
  Segment ni siquiera recibe eventos: el SDK queda cargado pero
  inactivo.

### Variables de entorno

| Variable | Default | Efecto |
| --- | --- | --- |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | `true` en producción, `false` en dev | Kill-switch global. Si `false`, `track()` es no-op y el SDK no se carga. |
| `NEXT_PUBLIC_SEGMENT_WRITE_KEY` | `undefined` | Write key pública de Segment. Sin ella, `track()` es no-op silencioso. |

> **Importante:** nunca se exponen secrets. La write key es pública
> (es la misma que va en el `<script>` de Segment en el navegador).

### Cómo apagarlo / validarlo

- **Apagado temporal** (staging, demo legal): `NEXT_PUBLIC_ANALYTICS_ENABLED=false`.
- **Validación en local**: dejar `NODE_ENV=development` (default) ⇒ no emite.
- **Validar cableado en staging**: `NEXT_PUBLIC_ANALYTICS_ENABLED=true` + write key de un source de staging en Segment.
- **Auditar eventos**: en Segment Debugger, filtrar por `Sana Web`;
  sólo deben verse los 4 eventos listados, con props dentro de la
  whitelist, y `landing_visit` como máximo 1 vez por sesión por
  visitante.

### Cobertura legal

La sección §3 del `Aviso de privacidad` ya cubre "Analizar patrones de
uso agregados y anónimos". Esta implementación cumple lo prometido:
sólo eventos agregables, sin cookies publicitarias de terceros y sin
cruzar datos con `mailto:` o redes sociales.

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
- **@segment/analytics-next** — analítica pública de la landing (ver
  sección "Analítica y privacidad"): 4 eventos definidos, sin PHI,
  gate por consentimiento, kill-switch vía env var.
- **NO** se usan: Lottie, 3D pesado, carruseles genéricos, cookies
  publicitarias de terceros

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
| --- | --- | --- |
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
│   ├── shared/              # ECG, typewriter, count-up, tilt, observers, analytics
│   │   ├── ecg-backdrop.tsx
│   │   ├── ecg-line.tsx
│   │   ├── section-observer.tsx
│   │   ├── typewriter.tsx
│   │   ├── count-up.tsx
│   │   ├── tilt-card.tsx
│   │   ├── analytics-provider.tsx  # inicializa Segment (cliente)
│   │   └── analytics-boot.tsx      # dispara `landing_visit` tras consentimiento
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
│   ├── links.ts             # helpers de URLs externas (CTAs)
│   ├── analytics.ts         # track() + whitelist de eventos/props (Segment)
│   ├── use-cookie-consent.ts
│   └── use-reduced-motion.ts
├── public/
│   ├── icon.svg             # favicon
│   └── og-sana.png          # Open Graph 1200×630
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

### Ticket: Métricas mínimas de uso público (Segment)

- [x] **Eventos definidos** — `landing_visit`, `patient_cta`,
      `doctor_cta`, `contact_cta` (whitelist en `lib/analytics.ts`).
- [x] **No se captura PHI** — el módulo no lee inputs, URL, query
      strings ni `localStorage`; sólo envía props de la whitelist.
- [x] **No se envían tokens ni datos sensibles** — sanitizador
      descarta `?token=`, `?code=`, `?access_token=`, `bearer …`;
      nunca se envía la URL completa, sólo un `target_kind`.
- [x] **Se puede distinguir conversión Doctor/Patient** — cada
      `track()` incluye `audience: "patient" | "doctor" | "contact"`.
- [x] **Gate por consentimiento** — `track()` sólo emite cuando
      `localStorage.sana.cookie-consent.v1 === "accepted"`.
- [x] **Anti-duplicado** — `landing_visit` se emite máximo 1 vez por
      sesión (`sessionStorage.sana:analytics:visited.v1`).
- [x] **Kill-switch** — `NEXT_PUBLIC_ANALYTICS_ENABLED=false`
      desactiva todo el tracking.
