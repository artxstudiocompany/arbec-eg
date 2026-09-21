"use client";

import { cn } from "@/lib/utils";
import type { EvolutionStage } from "@/data/idea-to-reality";

/**
 * Desktop process-monitor rail — jumping to any stage scrolls the
 * theater to that snapshot. Designed as an engineering checklist,
 * not a decorative timeline.
 */
export function StageIndicator({
  activeIndex,
  stages,
  titles,
  stageLabel,
  onSelect,
}: {
  activeIndex: number;
  stages: readonly EvolutionStage[];
  titles: readonly string[];
  stageLabel: string;
  onSelect: (i: number) => void;
}) {
  return (
    <div className="relative">
      <span className="absolute start-4 top-3 bottom-3 w-px bg-line-strong" aria-hidden />
      <ol className="relative flex flex-col gap-4" aria-label={stageLabel}>
        {stages.map((s, i) => {
          const active = i === activeIndex;
          const done = i < activeIndex;
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={active ? "step" : undefined}
                aria-label={`${s.number} · ${titles[i]}`}
                className="group flex w-full items-center gap-3 text-start"
              >
                <span
                  className={cn(
                    "relative z-10 flex size-8 shrink-0 items-center justify-center border font-mono text-[0.625rem] transition-colors duration-300",
                    active
                      ? "border-accent-400 bg-accent-400/10 text-accent-300"
                      : done
                        ? "border-line-strong text-fg-subtle group-hover:border-accent-500/60"
                        : "border-line text-fg-subtle group-hover:border-accent-500/60",
                  )}
                >
                  {s.number.replace(/^0/, "")}
                </span>
                <span
                  className={cn(
                    "font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300",
                    active
                      ? "text-accent-300"
                      : done
                        ? "text-fg-muted"
                        : "text-fg-subtle group-hover:text-fg",
                  )}
                >
                  {titles[i]}
                </span>
                {active && (
                  <span
                    className="h-px flex-1 bg-gradient-to-r from-accent-400/70 to-transparent"
                    aria-hidden
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}