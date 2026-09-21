"use client";

import { EVOLUTION_STAGE_COUNT } from "@/data/idea-to-reality";
import type { EvolutionStage } from "@/data/idea-to-reality";

/**
 * The active stage readout beside the theater — status pill, stage
 * counter, title and description. Re-keys on stage change so the text
 * transitions in (fade-only under reduced motion).
 */
export function StageMetadata({
  stage,
  title,
  description,
  stageLabel,
  stageActive,
  reduced = false,
}: {
  stage: EvolutionStage;
  title: string;
  description: string;
  stageLabel: string;
  stageActive: string;
  reduced?: boolean;
}) {
  return (
    <div
      key={reduced ? "static" : stage.id}
      className={reduced ? "" : "evo-meta"}
      aria-live="polite"
    >
      <p className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-accent-400">
        <span
          className="h-1.5 w-1.5 rounded-full bg-accent-400 animate-pulse"
          aria-hidden
        />
        {stageActive}
      </p>

      <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-fg-subtle">
        {stageLabel} {stage.number} / {String(EVOLUTION_STAGE_COUNT).padStart(2, "0")}
      </p>

      <h3 className="mt-3 text-ar-h2 text-fg">{title}</h3>

      <p className="mt-4 max-w-md text-ar-body-sm leading-relaxed text-fg-muted">
        {description}
      </p>

      {!reduced && (
        <style>{`
          @keyframes evo-meta-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: none; }
          }
          .evo-meta { animation: evo-meta-in 0.5s ease-out both; }
        `}</style>
      )}
    </div>
  );
}
