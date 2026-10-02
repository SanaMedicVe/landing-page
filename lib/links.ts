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

export function getPatientAppIosUrl(): string {
  return pick(
    env().NEXT_PUBLIC_PATIENT_APP_IOS_URL,
    "mailto:app@sana.lat?subject=Sana%20App%20iOS",
  );
}

export function getPatientAppAndroidUrl(): string {
  return pick(
    env().NEXT_PUBLIC_PATIENT_APP_ANDROID_URL,
    "mailto:app@sana.lat?subject=Sana%20App%20Android",
  );
}

export function getPatientAppUrl(): string {
  return pick(env().NEXT_PUBLIC_PATIENT_APP_URL, getPatientAppIosUrl());
}

export function getDoctorLoginUrl(): string {
  return pick(
    env().NEXT_PUBLIC_DOCTOR_LOGIN_URL,
    "mailto:doctores@sana.lat?subject=Sana%20%E2%80%94%20Ya%20soy%20doctor",
  );
}

export function getDoctorOnboardingUrl(): string {
  return pick(
    env().NEXT_PUBLIC_DOCTOR_ONBOARDING_URL,
    "mailto:doctores@sana.lat?subject=Sana%20%E2%80%94%20Solicitud%20de%20onboarding",
  );
}

export function getSocialInstagramUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_INSTAGRAM_URL ?? null;
}

export function getSocialXUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_X_URL ?? null;
}

export function getSocialLinkedinUrl(): string | null {
  return env().NEXT_PUBLIC_SOCIAL_LINKEDIN_URL ?? null;
}

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

export function mailto(to: string, subject?: string): string {
  if (!subject) return `mailto:${to}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
}

export const EXTERNAL_LINK_PROPS = {
  target: "_blank",
  rel: "noopener noreferrer",
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
