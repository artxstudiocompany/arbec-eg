import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle frosted panel. Uses the `glass` tokens — restrained blur, thin
 * hairline border. Never heavy glassmorphism.
 */
export function GlassSurface({
  children,
  className,
  strong = false,
}: {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        strong ? "glass-strong" : "glass",
        className,
      )}
    >
      {children}
    </div>
  );
}