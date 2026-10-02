"use client";

import * as React from "react";

import { initAnalytics } from "@/lib/analytics";

export function AnalyticsProvider() {
  React.useEffect(() => {
    void initAnalytics();
  }, []);

  return null;
}
