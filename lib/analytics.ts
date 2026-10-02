"use client";

import type { Analytics } from "@segment/analytics-next";

export const ANALYTICS_EVENTS = [
  "landing_visit",
  "patient_cta",
  "doctor_cta",
  "contact_cta",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export type AnalyticsAudience = "patient" | "doctor" | "contact";

export type AnalyticsTargetKind =
  | "app_store_ios"
  | "app_store_android"
  | "app_store_generic"
  | "doctor_login"
  | "doctor_onboarding"
  | "mailto"
  | "social_instagram"
  | "social_x"
  | "social_linkedin"
  | "anchor"
  | "external";

export const ALLOWED_PROPS: Readonly<
  Record<AnalyticsEvent, readonly string[]>
> = {
  landing_visit: ["audience", "section", "locale"],
  patient_cta: ["audience", "cta_label", "section", "target_kind"],
  doctor_cta: ["audience", "cta_label", "section", "target_kind"],
  contact_cta: ["audience", "cta_label", "section", "channel"],
};

export type AnalyticsProps = Readonly<
  Record<string, string | number | boolean>
>;

function env() {
  return process.env as Record<string, string | undefined>;
}

export function isAnalyticsEnabled(): boolean {
  const flag = env().NEXT_PUBLIC_ANALYTICS_ENABLED;
  if (flag === undefined) return env().NODE_ENV === "production";
  return flag === "true" || flag === "1";
}

export function getSegmentWriteKey(): string | undefined {
  const key = env().NEXT_PUBLIC_SEGMENT_WRITE_KEY;
  return typeof key === "string" && key.trim().length > 0
    ? key.trim()
    : undefined;
}

/**
 * Helpers para clasificar el destino de un CTA sin enviar la URL real.
 * La idea es responder "¿qué tipo de acción es?" sin exponer el href.
 */
export function classifyHref(href: string | undefined): AnalyticsTargetKind {
  if (!href) return "external";
  const h = href.toLowerCase();
  if (h.startsWith("mailto:")) return "mailto";
  if (h.startsWith("#")) return "anchor";
  if (h.includes("apps.apple.com") || h.includes("appsto.re")) {
    return "app_store_ios";
  }
  if (h.includes("play.google.com")) return "app_store_android";
  if (h.includes("instagram.com")) return "social_instagram";
  if (h.includes("twitter.com") || h.includes("x.com")) return "social_x";
  if (h.includes("linkedin.com")) return "social_linkedin";
  const doctorLogin = env().NEXT_PUBLIC_DOCTOR_LOGIN_URL?.toLowerCase() ?? "";
  const doctorOnb =
    env().NEXT_PUBLIC_DOCTOR_ONBOARDING_URL?.toLowerCase() ?? "";
  if (doctorLogin && h.startsWith(doctorLogin.split("?")[0])) {
    return "doctor_login";
  }
  if (doctorOnb && h.startsWith(doctorOnb.split("?")[0])) {
    return "doctor_onboarding";
  }
  return "app_store_generic";
}

const FORBIDDEN_PATTERNS = [
  /\?token=/i,
  /[?&](code|access_token|id_token|state)=/i,
  /bearer\s+[a-z0-9._-]{20,}/i,
  /[\r\n]/,
];

function isCleanValue(value: unknown): boolean {
  if (typeof value === "boolean" || typeof value === "number") return true;
  if (typeof value !== "string") return false;
  if (value.length > 200) return false;
  for (const re of FORBIDDEN_PATTERNS) {
    if (re.test(value)) return false;
  }
  return true;
}

function sanitizeProps(
  event: AnalyticsEvent,
  raw: AnalyticsProps | undefined,
): AnalyticsProps {
  if (!raw) return {};
  const allowed = ALLOWED_PROPS[event];
  const out: Record<string, string | number | boolean> = {};
  for (const key of Object.keys(raw)) {
    if (!allowed.includes(key)) continue;
    const v = raw[key];
    if (!isCleanValue(v)) continue;
    out[key] = v as string | number | boolean;
  }
  return out;
}

type ConsentState = "accepted" | "rejected" | undefined;

function readConsent(): ConsentState {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem("sana.cookie-consent.v1");
    if (raw === "accepted" || raw === "rejected") return raw;
    return undefined;
  } catch {
    return undefined;
  }
}

let analyticsPromise: Promise<Analytics | null> | null = null;
let analyticsInstance: Analytics | null = null;

async function getAnalytics(): Promise<Analytics | null> {
  if (!isAnalyticsEnabled()) return null;
  const writeKey = getSegmentWriteKey();
  if (!writeKey) return null;

  if (analyticsInstance) return analyticsInstance;
  if (analyticsPromise) return analyticsPromise;

  analyticsPromise = (async () => {
    const { AnalyticsBrowser } = await import("@segment/analytics-next");
    const [instance] = await AnalyticsBrowser.load({ writeKey });
    analyticsInstance = instance;
    return instance;
  })().catch((err) => {
    // Si Segment falla (red, CSP, etc.) seguimos con no-op silencioso
    // para no romper la landing.
    if (env().NODE_ENV !== "production") {
      console.warn("[analytics] Segment load failed:", err);
    }
    return null;
  });

  return analyticsPromise;
}

const VISITED_KEY = "sana:analytics:visited.v1";

function alreadyVisitedThisSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(VISITED_KEY) === "1";
  } catch {
    return false;
  }
}

function markVisitedThisSession() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(VISITED_KEY, "1");
  } catch {
    // sessionStorage puede no estar disponible (modo privado Safari).
    // En ese caso permitimos re-envíos: aceptable porque `landing_visit`
    // no contiene PII y Segment deduplica por `messageId`.
  }
}

export async function track(
  event: AnalyticsEvent,
  props?: AnalyticsProps,
): Promise<void> {
  if (!isAnalyticsEnabled()) return;
  if (!(ANALYTICS_EVENTS as readonly string[]).includes(event)) return;

  const consent = readConsent();
  if (consent !== "accepted") return;

  const safe = sanitizeProps(event, props);

  if (event === "landing_visit") {
    if (alreadyVisitedThisSession()) return;
    markVisitedThisSession();
  }

  const a = await getAnalytics();
  if (!a) return;
  try {
    a.track(event, safe as Record<string, unknown>);
  } catch {
    // No propagamos: el tracking nunca debe romper la UI.
  }
}

export async function initAnalytics(): Promise<void> {
  if (!isAnalyticsEnabled()) return;
  await getAnalytics();
}
