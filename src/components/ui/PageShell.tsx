import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { GridBackground } from "./GridBackground";

/**
 * Application shell: owns the shared blueprint-page backdrop (grid lines,
 * corner ticks, vignette) so every route gets the same engineering canvas.
 * Sits behind the sticky header, above the ink surface.
 */
export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative isolate min-h-dvh", className)}>
      <GridBackground />
      {children}
    </div>
  );
}
