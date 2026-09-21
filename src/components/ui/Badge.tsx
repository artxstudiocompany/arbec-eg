import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "accent" | "signal" | "success" | "warn" | "error";

const variantClasses: Record<BadgeVariant, string> = {
  neutral: "border-line text-fg-muted",
  accent: "border-accent-500/40 text-accent-300",
  signal: "border-signal-400/40 text-signal-400",
  success: "border-success/40 text-success",
  warn: "border-warn/40 text-warn",
  error: "border-error/40 text-error",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-ar-caption font-medium tracking-wide",
        variantClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}