"use client";

import * as React from "react";

function subscribeReduced(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedServerSnapshot(): boolean {
  return false;
}

export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribeReduced,
    getReducedSnapshot,
    getReducedServerSnapshot,
  );
}

const MOUNT_EVENT = "sana:mounted";
const mountedIds = new Set<string>();

function notify() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(MOUNT_EVENT));
  }
}

function subscribeMounted(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(MOUNT_EVENT, callback);
  window.addEventListener("pageshow", () => {
    mountedIds.clear();
    notify();
  });
  return () => window.removeEventListener(MOUNT_EVENT, callback);
}

function getMountedSnapshot(): ReadonlySet<string> {
  return mountedIds;
}

function getMountedServerSnapshot(): ReadonlySet<string> {
  return EMPTY_SET;
}

const EMPTY_SET: ReadonlySet<string> = new Set<string>();

export function useMounted(): boolean {
  const id = React.useId();
  const snapshot = React.useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getMountedServerSnapshot,
  );

  React.useEffect(() => {
    if (!mountedIds.has(id)) {
      mountedIds.add(id);
      notify();
    }
  }, [id]);

  return snapshot.has(id);
}
