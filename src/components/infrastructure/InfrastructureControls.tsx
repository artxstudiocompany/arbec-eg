"use client";

import { cn } from "@/lib/utils";
import type { InfraSystemId } from "@/data/infrastructure";
import type { LocalizedInfraSystem } from "@/data/infrastructure";

/**
 * Infrastructure system selector — the discipline console. A numbered,
 * keyboard-accessible list that drives both the scene and the info panel.
 */
export function InfrastructureControls({
  systems,
  activeId,
  onSelect,
  systemLabel,
}: {
  systems: LocalizedInfraSystem[];
  activeId: InfraSystemId | null;
  onSelect: (id: InfraSystemId) => void;
  systemLabel: string;
}) {
  return (
    <div
      role="list"
      aria-label={systemLabel}
      className="flex flex-col gap-1.5"
    >
      {systems.map((system) => {
        const active = activeId === system.id;
        return (
          <div key={system.id} role="listitem">
            <button
              type="button"
              data-infra-control
              aria-pressed={active}
              onClick={() => onSelect(system.id)}
              className={cn(
                "group flex min-h-10 min-w-0 w-full items-center gap-3 rounded-md border px-3 py-2 text-start transition-colors duration-300 focus-visible:outline-none focus-visible:border-accent-400",
                active
                  ? "border-line-strong bg-glass text-fg"
                  : "border-transparent text-fg-muted hover:bg-glass hover:text-fg",
              )}
              style={active ? { borderColor: `color-mix(in srgb, ${system.accent} 60%, transparent)` } : undefined}
            >
              <span
                className="font-mono text-[0.625rem] tracking-[0.2em]"
                style={{ color: active ? system.accent : undefined }}
              >
                {String(system.number).padStart(2, "0")}
              </span>
              <span className="truncate text-ar-caption uppercase tracking-[0.14em] sm:text-xs">
                {system.nodeLabel}
              </span>
              <span
                aria-hidden
                className={cn(
                  "ms-auto block h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
                  active ? "" : "bg-fg-subtle/40",
                )}
                style={active ? { background: system.accent } : undefined}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
