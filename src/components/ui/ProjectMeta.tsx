import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Technical metadata block — label/value pairs rendered as engineering
 * documentation (monospace labels, hairline separators).
 */
export function ProjectMeta({
  items,
  className,
}: {
  items: Array<{ label: ReactNode; value: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-baseline justify-between gap-4 border-b border-line pb-2 last:border-0"
        >
          <dt className="text-ar-mono uppercase tracking-[0.18em] text-fg-subtle">
            {item.label}
          </dt>
          <dd className="text-ar-mono text-end text-fg">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}