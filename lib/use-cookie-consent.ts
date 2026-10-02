"use client";

import * as React from "react";

export type CookieConsent = "accepted" | "rejected";

const STORAGE_KEY = "sana.cookie-consent.v1";
const EVENT_NAME = "sana:cookies-changed";

function readConsent(): CookieConsent | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "accepted" || raw === "rejected") return raw;
    return undefined;
  } catch {
    // Modo privado de Safari y similares: localStorage puede lanzar.
    return undefined;
  }
}

function writeConsent(value: CookieConsent) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // No podemos escribir; el banner se seguirá mostrando.
  }
}

function clearConsent() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(EVENT_NAME));
  } catch {
    // Ignorar.
  }
}

export function getCookieConsent(): CookieConsent | undefined {
  return readConsent();
}

export function setCookieConsent(value: CookieConsent) {
  writeConsent(value);
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT_NAME, callback);
  // Sincronización entre pestañas.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT_NAME, callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CookieConsent | undefined {
  return readConsent();
}

function getServerSnapshot(): CookieConsent | undefined {
  // SSR: nunca leemos `localStorage` en servidor. El banner se
  // mostrará en la primera interacción cliente tras la hidratación.
  return undefined;
}

export function useCookieConsent(): {
  consent: CookieConsent | undefined;
  accept: () => void;
  reject: () => void;
  reset: () => void;
} {
  const consent = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    consent,
    accept: React.useCallback(() => writeConsent("accepted"), []),
    reject: React.useCallback(() => writeConsent("rejected"), []),
    reset: React.useCallback(() => clearConsent(), []),
  };
}
