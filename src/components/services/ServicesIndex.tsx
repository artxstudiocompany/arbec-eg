"use client";

import type { LocalizedService, ServiceGroup } from "@/data/services";
import { cn } from "@/lib/utils";
import type { ServiceHubDict } from "./types";

/**
 * SERVICE INDEX — the desktop checklist rail.
 * Group filters narrow the module set (factually grounded in the source:
 * General Contracting / General Supplies). Active row is highlighted and the
 * rail stays sticky beside the hub.
 */
export function ServicesIndex({
  services,
  activeIndex,
  group,
  onGroup,
  onSelect,
  dict,
}: {
  services: LocalizedService[];
  activeIndex: number;
  group: "all" | ServiceGroup;
  onGroup: (g: "all" | ServiceGroup) => void;
  onSelect: (index: number) => void;
  dict: ServiceHubDict;
}) {
  const groups: Array<"all" | ServiceGroup> = ["all", "contracting", "supplies"];

  return (
    <aside
      aria-label={dict.indexLabel}
      className="flex flex-col gap-6 lg:sticky lg:top-28"
    >
      {/* Group filter */}
      <div role="group" className="flex flex-wrap gap-2">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onGroup(g)}
            aria-pressed={group === g}
            className={cn(
              "rounded-full border px-3 py-1.5 text-ar-overline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
              group === g
                ? "border-accent-500 bg-accent-500/10 text-accent-300"
                : "border-line text-fg-muted hover:border-accent-500/50 hover:text-fg",
            )}
          >
            {dict.groups[g]}
          </button>
        ))}
      </div>

      <ul className="flex flex-col divide-y divide-line/70 border-y border-line">
        {services.map((service, i) => {
          const active = i === activeIndex;
          return (
            <li key={service.slug}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "group flex w-full items-baseline gap-4 px-2 py-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent-400",
                  active ? "bg-ink-800/70" : "hover:bg-ink-900/60",
                )}
              >
                <span
                  className={cn(
                    "text-ar-mono text-xs tracking-[0.2em] transition-colors",
                    active ? "text-accent-400" : "text-fg-subtle",
                  )}
                >
                  {String(service.number).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "flex-1 text-sm font-medium uppercase tracking-[0.12em] transition-colors",
                    active ? "text-fg" : "text-fg-muted group-hover:text-fg",
                  )}
                >
                  {service.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "h-px w-4 bg-line transition-all",
                    active ? "w-8 bg-accent-500" : "group-hover:w-8",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ul>

      <p className="hidden text-2xs font-mono uppercase tracking-[0.22em] text-fg-subtle lg:block">
        {dict.selectHint}
      </p>
    </aside>
  );
}
