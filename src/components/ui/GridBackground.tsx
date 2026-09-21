import { cn } from "@/lib/utils";

/**
 * Reusable blueprint grid backdrop. Lives at -z-10 inside an `isolate`
 * container so it sits above the page background but below all content.
 */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 -z-10 opacity-[0.3]",
        className,
      )}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
        maskImage:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #000 25%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 90% 70% at 50% 0%, #000 25%, transparent 80%)",
      }}
    />
  );
}