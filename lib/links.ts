/**
 * Helper centralizado de enlaces configurables.
 *
 * Todos los CTAs que salen de la landing (Pacientes, Doctores, Redes,
 * Contacto) leen sus URLs desde variables de entorno públicas
 * (`NEXT_PUBLIC_*`). Mientras la app no esté publicada o el login de
 * doctores no exista, los `fallback` apuntan a `mailto:` para que
 * ningún CTA quede como enlace muerto.
 *
 * Variables soportadas (todas opcionales — el helper aplica fallback):
 *
 *   NEXT_PUBLIC_PATIENT_APP_IOS_URL       App Store (iOS)
 *   NEXT_PUBLIC_PATIENT_APP_ANDROID_URL   Google Play (Android)
 *   NEXT_PUBLIC_PATIENT_APP_URL           URL única (si aún no hay stores separadas)
 *   NEXT_PUBLIC_DOCTOR_LOGIN_URL          Login del panel web del doctor
 *   NEXT_PUBLIC_DOCTOR_ONBOARDING_URL     Formulario / endpoint de onboarding
 *
 *   NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL
 *   NEXT_PUBLIC_SOCIAL_X_URL
 *   NEXT_PUBLIC_SOCIAL_LINKEDIN_URL
 *
 *   NEXT_PUBLIC_CONTACT_MAIL              Mail principal de contacto
 *   NEXT_PUBLIC_DOCTOR_CONTACT_MAIL       Mail para doctores (solicitudes)
 *   NEXT_PUBLIC_LEGAL_MAIL                Mail legal
 *   NEXT_PUBLIC_PRIVACY_MAIL              Mail de privacidad
 */

type AppEnv = Record<string, string | undefined>;

function env(): AppEnv {
  // En SSR no existe `window`, pero `process.env` sí está disponible.
  return process.env as AppEnv;
}

function pick(url: string | undefined, fallback: string): string {
  // Aceptamos URLs vacías como "no configurado".
  if (typeof url === "string" && url.trim().length > 0) return url.trim();
  return fallback;
}

// ─────────────────────────────────────────────────────────────────────
//  Paciente — App móvil
// ─────────────────────────────────────────────────────────────────────

/**
 * URL de la App Store (iOS). Si no está configurada, devolvemos un
 * `mailto:` de contacto (sin email pre-llenado) como fallback seguro.
 */
export function getPatientAppIosUrl(): string {
  return pick(
    env().NEXT_PUBLIC_PATIENT_APP_IOS_URL,
    "mailto:app@sana.lat?subject=Sana%20App%20iOS",
  );
}

/** URL de Google Play (Android). Mismo fallback que iOS. */
export function getPatientAppAndroidUrl(): string {
  return pick(
    env().NEXT_PUBLIC_PATIENT_APP_ANDROID_URL,
    "mailto:app@sana.lat?subject=Sana%20App%20Android",
  );
}

/**
 * URL única de la app (cuando aún no hay stores separadas).
 * Si tampoco hay una URL única, caemos al fallback de iOS.
 */
export function getPatientAppUrl(): string {
  return pick(
    env().NEXT_PUBLIC_PATIENT_APP_URL,
    getPatientAppIosUrl(),
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Doctor — login + onboarding
// ─────────────────────────────────────────────────────────────────────

/** URL del login del panel web del doctor. */
export function getDoctorLoginUrl(): string {
  return pick(
    env().NEXT_PUBLIC_DOCTOR_LOGIN_URL,
    "mailto:doctores@sana.lat?subject=Sana%20%E2%80%94%20Ya%20soy%20doctor",
  );
}

/** URL del formulario de onboarding de doctores. */
export function getDoctorOnboardingUrl(): string {
  return pick(
    env().NEXT_PUBLIC_DOCTOR_ONBOARDING_URL,
    "mailto:doctores@sana.lat?subject=Sana%20%E2%80%94%20Solicitud%20de%20onboarding",
  );
}

// ─────────────────────────────────────────────────────────────────────
//  Redes sociales
// ─────────────────────────────────────────────────────────────────────

export function getSocialInstagramUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL ?? null;
}

export function getSocialXUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_X_URL ?? null;
}

export function getSocialLinkedinUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ?? null;
}

// ─────────────────────────────────────────────────────────────────────
//  Mails de contacto
// ─────────────────────────────────────────────────────────────────────

export function getContactMail(): string {
  return pick(env().NEXT_PUBLIC_CONTACT_MAIL, "hola@sana.lat");
}

export function getDoctorContactMail(): string {
  return pick(env().NEXT_PUBLIC_DOCTOR_CONTACT_MAIL, "doctores@sana.lat");
}

export function getLegalMail(): string {
  return pick(env().NEXT_PUBLIC_LEGAL_MAIL, "legal@sana.lat");
}

export function getPrivacyMail(): string {
  return pick(env().NEXT_PUBLIC_PRIVACY_MAIL, "privacidad@sana.lat");
}

// ─────────────────────────────────────────────────────────────────────
//  Helper para mailto: con subject pre-llenado
// ─────────────────────────────────────────────────────────────────────

/**
 * Construye un `mailto:` con `subject` codificado en UTF-8.
 * Si el `subject` está vacío, devuelve solo el `to`.
 */
export function mailto(to: string, subject?: string): string {
  if (!subject) return `mailto:${to}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
}

// ─────────────────────────────────────────────────────────────────────
//  Helper para render seguro de links externos
// ─────────────────────────────────────────────────────────────────────

/**
 * Props a aplicar a un `<a>` que sale del sitio (target=_blank).
 * Centralizamos aquí para no repetir `rel` y `referrerPolicy`.
 */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
  // `noreferrer` ya va incluido arriba; lo añadimos explícito por si
  // algún auditor lo busca por nombre.
  referrerPolicy: "no-referrer" as const,
} as const;

export function isExternalUrl(href: string): boolean {
  // mailto:, tel:, #, rutas internas y rutas que empiezan por /
  // NO se consideran externas (no deben abrirse en pestaña nueva).
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("/")) return false;
  if (href.startsWith("mailto:")) return false;
  if (href.startsWith("tel:")) return false;
  return true;
}

export function externalLinkProps(href: string) {
  return isExternalUrl(href) ? EXTERNAL_LINK_PROPS : {};
}