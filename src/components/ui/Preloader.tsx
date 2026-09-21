import { cn } from "@/lib/utils";

/**
 * Abstract ARBEC geometry — a rotated square (blueprint reference frame)
 * with an inner measurement axis and a signal point. The standalone mark
 * used by future loading/transition screens; kept here as the primitive.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("inline-block shrink-0", className)}
    >
      <path d="M24 5 43 24 24 43 5 24Z" />
      <path d="M24 12 36 24 24 36 12 24Z" opacity={0.6} />
      <path d="M5 24h38M24 5v38" opacity={0.35} />
      <circle cx="24" cy="24" r="3.5" fill="currentColor" stroke="none" />
      <circle cx="24" cy="24" r="10.5" opacity={0.25} strokeDasharray="3 4" />
    </svg>
  );
}

/**
 * Full-viewport preloader primitive (glyph + hairline progress). Not wired
 * globally yet — reserved for the page-transition phase.
 */
export function Preloader({
  show = true,
  label,
  className,
}: {
  show?: boolean;
  label?: string;
  className?: string;
}) {
  if (!show) return null;
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-ink-950/95 backdrop-blur-sm",
        className,
      )}
    >
      <LogoMark className="size-14 animate-[spin_2.4s_linear_infinite] text-accent-500" />
      <span className="mx-auto h-px w-40 overflow-hidden bg-line">
        <span
          aria-hidden
          className="block h-full w-1/3 animate-[slide-x_1.4s_ease-in-out_infinite] bg-accent-500"
        />
      </span>
    </div>
  );
}