import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AppScreenMockupProps = {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  priority?: boolean;
};

export function AppScreenMockup({
  label,
  icon,
  children,
  className,
  priority = false,
}: AppScreenMockupProps) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: "338 / 697" }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0" />
      <Image
        src="/mockups/mockup-iphone-14.png"
        alt=""
        aria-hidden
        width={338}
        height={697}
        sizes="(min-width: 768px) 220px, 50vw"
        className="pointer-events-none absolute inset-0 z-0 mx-auto block h-full w-full select-none object-fill"
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
      <div
        className="absolute z-10 flex flex-col overflow-hidden bg-white"
        style={{
          top: "3%",
          bottom: "2.7%",
          left: "4.8%",
          right: "4.8%",
          borderRadius: "13% / 6%",
        }}
      >
        <div className="flex items-center justify-between bg-sana-night-900 px-5 pb-1.5 pt-2 text-[10px] font-medium text-white/80">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-sana-accent" />
            Sana
          </span>
        </div>
        <div className="flex items-center justify-between px-3 pb-2 pt-2">
          <p className="font-heading text-[13px] font-semibold leading-tight text-sana-primary">
            {label}
          </p>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sana-accent-50 text-sana-accent-700">
            {icon}
          </span>
        </div>
        <div className="flex-1 space-y-2.5 overflow-hidden bg-white px-3 pb-4">
          {children}
        </div>
      </div>
    </div>
  );
}
