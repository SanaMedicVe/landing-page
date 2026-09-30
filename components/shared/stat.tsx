import * as React from "react";

type StatProps = {
  label: string;
  value: React.ReactNode;
  tone?: "dark" | "light";
};

export function Stat({ label, value, tone = "dark" }: StatProps) {
  const isDark = tone === "dark";
  return (
    <div className="flex flex-col">
      <dd
        className={
          "flex items-center gap-2 font-heading text-2xl font-semibold sm:text-3xl " +
          (isDark ? "text-white" : "text-sana-primary")
        }
      >
        <span className="inline-block h-2 w-2 rounded-full bg-sana-accent pulse-dot" />
        {value}
      </dd>
      <dt
        className={
          "mt-1 text-xs uppercase tracking-wider " +
          (isDark ? "text-white/55" : "text-sana-muted-soft")
        }
      >
        {label}
      </dt>
    </div>
  );
}