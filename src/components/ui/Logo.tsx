import { cn } from "@/lib/utils";

/**
 * Temporary wordmark. The legacy raster logo
 * (`cropped-cropped-ALL-removebg-preview-220x60.png`) is queued for SVG
 * re-export and migration into `/public/images/brand` in the asset phase.
 * The wordmark intentionally stays Latin in both locales.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="font-display text-base leading-none font-semibold tracking-[0.34em] text-fg">
        ARBEC
      </span>
      <span aria-hidden className="size-1 rounded-full bg-accent-500" />
    </span>
  );
}
