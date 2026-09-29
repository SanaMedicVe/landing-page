================================================================
TAREA: Construir la landing page pública de "Sana"
================================================================

## 1. CONTEXTO DEL PRODUCTO

- Nombre: Sana
- Tipo: Aplicación médica
- Pacientes: App móvil (iOS + Android)
- Doctores: Plataforma web
- Farmacias: NO anunciar (queda fuera del alcance público por ahora)
- Idioma de toda la landing: ESPAÑOL 100%
- Mercado objetivo: Latinoamérica (asumir)

## 2. STACK TECNOLÓGICO (OBLIGATORIO)

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4 (sintaxis @theme, NO tailwind.config.js)
- shadcn/ui (componentes: button, card, accordion, badge, separator, tabs opcional)
- motion (antes Framer Motion) para animaciones
- Iconografía: lucide-react
- NO usar: Lottie salvo caso muy justificado, efectos 3D pesados, carruseles genéricos

## 3. PALETA DE COLORES Y TIPOGRAFÍA

### Paleta de colores

- Color primario (principal):       Azul Profundo #003f6e (PANTONE P 108 C)
- Color secundario (acento):        Cian Vital #0fb6cc (PANTONE P 121-6 C) / #00b0da (PANTONE 306 U/C)
- Color de fondo claro:            Blanco puro #FFFFFF / Gris claro 20%
- Color de fondo oscuro:           Azul Noche #183d70 (PANTONE 295 U/C)
- Color de texto principal:        Azul Profundo #003f6e (en modo claro) / Blanco #FFFFFF (en modo oscuro)
- Color de texto secundario:       Gris 80% / Gris 60%
- Color de éxito / salud:          Cian Vital #0fb6cc (asociado al pulso cardíaco y ritmo de salud)
- Color de borde / divisor:        Gris 20% / Cian translúcido
- Gradiente principal (hero):      Linear de Azul Profundo #003f6e a Cian Vital #0fb6cc

### Tipografía

- Fuente para headings (H1-H6):   Caviar Dreams
- Fuente para cuerpo (body):       Open Sans
- Fuente monoespaciada (código):   Geist Mono

## 4. CONCEPTO CREATIVO "EL PULSO DIGITAL"

Toda la landing debe sentirse como un organismo vivo. NO usar animaciones genéricas
(fade-in + slide-up estándar). El concepto:

- Una línea tipo ECG recorre el fondo de toda la página horizontalmente, mutando su forma
  según la sección (más caótica en "El problema", más estable en "Cómo funciona",
  completamente plana en "Seguridad" = sensación de calma).
- Hero con dos tarjetas (Pacientes / Doctores) con tilt 3D parallax al mover el mouse.
- Headline del hero con efecto typewriter o scramble sutil.
- Métricas que cuentan hacia arriba sincronizadas con un pulso (~60bpm).
- Pasos de "Cómo funciona" con efecto ripple/onda expansiva desde el centro.
- Botones CTA primarios con borde animado estilo "beam" (recorre el perímetro).
- Sección "Verified Doctor" con sello que se estampa (rotate + scale + opacity).
- Navbar: efecto frosted glass al hacer scroll, con la línea ECG atravesando sutilmente.
- Curvas easing personalizadas (NO usar "ease-in-out" genérico).

## 5. SITEMAP / SECCIONES OBLIGATORIAS

Orden estricto de aparición:

  0. Navbar flotante (logo + anclas + 2 CTAs: "Soy paciente" / "Soy doctor")
  1. Hero (propuesta de valor + CTAs primarios)
  2. Propuesta de valor (chips / bullets de valor diferencial)
  3. El problema (storytelling que conecta con la solución) [OPCIONAL PERO RECOMENDADA]
  4. Cómo funciona (flujo en 3 pasos)
  5. Para Pacientes (mockup de teléfono, beneficios del lado paciente)
  6. Para Doctores (mockup de dashboard web, beneficios del lado doctor)
  7. Seguridad y confianza (badges, cifrado, copy prudente)
  8. Verified Doctor (lenguaje coherente con épica E3 — factual, no promocional)
  9. Beneficios (grid asimétrico de beneficios clave)
 10. FAQ (acordeón shadcn)
 11. CTAs finales (cierre emocional + 2 CTAs)
 12. Footer / Legal (links legales + redes + copyright)

## 6. COPY PRINCIPAL (BORRADOR — SUJETO A APROBACIÓN DE PRODUCTO)

### Hero

- H1: "Tu salud, conectada en tiempo real."
- Sub: "Sana une a pacientes con doctores verificados — desde una app intuitiva
  que cabe en tu bolsillo, y un panel clínico diseñado para profesionales."
- CTA primario: "Soy paciente"  → link a stores (iOS / Android)
- CTA secundario: "Soy doctor"   → link a registro profesional

### Propuesta de valor (4 chips)

  1. Doctores verificados, no bots
  2. Historial que viaja contigo
  3. Consultas cuando las necesitas
  4. Privacidad por diseño

### Cómo funciona (3 pasos)

  1. "Crea tu perfil" — paciente o profesional en minutos
  2. "Conecta" — busca especialidad o recibe pacientes verificados
  3. "Consulta" — seguimiento continuo desde la app o el panel web

### Para Pacientes

  H2: "Encuentra al especialista correcto."
  Bullets:

- Agenda en minutos, no en días
- Recibe seguimiento sin perder el hilo
- Tu historial médico siempre contigo
- Recordatorios automáticos de citas

### Para Doctores

  H2: "Menos clics, más consultas."
  Bullets:

- Tu panel clínico se adapta a cómo trabajas
- Pacientes ya verificados, listos para consulta
- Historial centralizado y seguro
- Métricas claras de tu práctica

### Seguridad (COPY PRUDENTE — NO hacer claims específicos sin aprobación legal)

  H2: "Privacidad por diseño."
  Copy sugerido: "Tu información viaja cifrada de extremo a extremo y se almacena
  cumpliendo con los estándares de protección de datos en salud aplicables a la región."
  ⚠️ NO usar claims como "Certificación HIPAA", "ISO 27001", "cumple GDPR" hasta
     que el equipo Legal apruebe.

### Verified Doctor (LENGUAJE COHERENTE CON E3 — FACTUAL, NO PROMOCIONAL)

  H2: "Verified Doctor."
  Copy: "Solo profesionales con cédula profesional vigente y especialidad acreditada
  forman parte de la red Sana. Cada perfil es verificado antes de estar disponible
  para los pacientes."
  ⚠️ No decir "garantizamos", "certificamos por X", ni claims no comprobables.

### Beneficios (grid de 6)

  1. Atención sin fricción
  2. Datos que te acompañan
  3. Especialidades variadas
  4. Soporte humano
  5. Sin papeleo
  6. Pensado para LATAM

### FAQ (mínimo 6 preguntas)

  1. ¿Qué es Sana?
  2. ¿Cómo me registro como paciente?
  3. ¿Cómo me registro como doctor?
  4. ¿Cuánto cuesta usar Sana?
  5. ¿Mis datos están seguros?
  6. ¿En qué países está disponible?
  (Agregar 2-3 más si aplica)

### CTAs finales

  H2: "Tu próxima consulta empieza aquí."
  CTA primario: "Descargar la app"
  CTA secundario: "Soy profesional de la salud"

## 7. RESTRICCIONES CRÍTICAS (DEL TICKET)

- ❌ NO anunciar features futuras no confirmadas
- ❌ NO mencionar farmacias ni como "próximamente" (solo si Producto lo decide explícitamente)
- ❌ NO usar claims legales específicos (HIPAA, ISO, GDPR) sin aprobación de Legal
- ❌ NO usar iconografía médica cliché (corazones, cruces, estetoscopios de stock)
- ❌ NO usar animaciones genéricas (fade-in + slide-up sin más)
- ✅ "Verified Doctor" debe usar lenguaje coherente con la épica E3
- ✅ Copy de seguridad debe ser prudente y verificable
- ✅ Toda la copy en español

## 8. ENTREGABLES

1. Estructura de carpetas del proyecto (/app, /components, /lib, etc.)
2. Archivo de configuración de shadcn (components.json)
3. globals.css con la paleta definida (CSS variables) + fuente base
4. Layout raíz con metadata SEO en español (title, description, og:image, lang="es")
5. Cada sección como componente separado en /app/_components o /components/sections
6. Página principal (app/page.tsx) que orquesta todas las secciones en orden
7. Componente de la línea ECG global (background persistente)
8. Navbar con efecto frosted glass
9. Animaciones implementadas con motion (NO con CSS puro salvo casos simples)
10. Responsive completo (mobile-first, breakpoints: sm / md / lg / xl)
11. Accesibilidad básica: roles ARIA, contraste, focus visible, prefers-reduced-motion

## 9. CRITERIOS DE ACEPTACIÓN (DEL TICKET)

- [ ] Sitemap/secciones aprobadas
- [ ] Copy principal aprobado
- [ ] No se anuncian features futuras
- [ ] "Verified Doctor" usa lenguaje coherente con E3
- [ ] Farmacias NO se presenta como próximamente (a menos que Producto lo indique)
- [ ] Paleta de colores y tipografía aplicadas consistentemente
- [ ] Animaciones innovadoras implementadas (no genéricas)
- [ ] 100% en español

## 10. CONSIDERACIONES TÉCNICAS

- Leer documentación local de Next.js 16 (node_modules/next/dist/docs/) — esta
  versión puede traer cambios importantes vs versiones anteriores.
- Tailwind v4 usa sintaxis @theme en CSS, NO tailwind.config.js.
- motion (antes Framer Motion) importar desde "motion/react".
- shadcn/ui se instala con `pnpm dlx shadcn@latest init` (compatible con Next 16 + Tailwind v4).
- Respetar prefers-reduced-motion: todas las animaciones deben tener fallback o desactivarse.
- Optimizar imágenes con next/image.
- Usar Server Components por defecto, Client Components solo cuando haya interactividad/animación.

================================================================
FIN DEL PROMPT
================================================================
