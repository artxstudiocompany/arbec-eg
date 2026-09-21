import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { DotIcon } from "@/components/ui/icons";

/**
 * Monospace engineering annotation — e.g. "PROJECT 001", "SYSTEM // ONLINE".
 * Used sparingly as blueprint-flavoured micro-labels.
 */
export function TechnicalLabel({
  children,
  className,
  tone = "muted",
}: {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "accent" | "signal";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-ar-mono uppercase tracking-[0.22em]",
        tone === "muted" && "text-fg-subtle",
        tone === "accent" && "text-accent-400",
        tone === "signal" && "text-signal-400",
        className,
      )}
    >
      <DotIcon
        className={cn(
          "text-[0.5rem]",
          tone === "muted" && "text-fg-subtle",
          tone === "accent" && "text-accent-500",
          tone === "signal" && "text-signal-400",
        )}
      />
      {children}
    </span>
  );
}