"use client";

import { EVOLUTION_STAGES, EVOLUTION_STAGE_COUNT } from "@/data/idea-to-reality";

/**
 * Process-monitor progress readout — "STAGE 03 / 08" with a fill bar.
 */
export function EvolutionProgress({
  stageIndex,
  stageLabel,
}: {
  stageIndex: number;
  stageLabel: string;
}) {
  const stage = EVOLUTION_STAGES[stageIndex];
  const pct = ((stageIndex + 1) / EVOLUTION_STAGE_COUNT) * 100;

  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fg-muted">
        {stageLabel} {stage.number} / {String(EVOLUTION_STAGE_COUNT).padStart(2, "0")}
      </span>
      <span className="relative h-px w-28 overflow-hidden bg-line-strong">
        <span
          className="absolute inset-y-0 start-0 block bg-accent-400 transition-[width] duration-700"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
}