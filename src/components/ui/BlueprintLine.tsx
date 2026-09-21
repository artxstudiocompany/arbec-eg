import { cn } from "@/lib/utils";

/**
 * Decorative architectural measurement line — end ticks + optional middle
 * annotation, evocative of construction documentation.
 */
export function BlueprintLine({
  label,
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-between", className)}
    >
      <span className="h-2.5 w-px bg-line-strong" />
      <span className="h-px flex-1 bg-line" />
      {label ? (
        <>
          <span className="mx-3 text-ar-mono uppercase tracking-[0.22em] text-fg-subtle">
            {label}
          </span>
          <span className="h-px flex-1 bg-line" />
        </>
      ) : null}
      <span className="h-2.5 w-px bg-line-strong" />
    </div>
  );
}