"use client";

import { useEffect, useState } from "react";
import { EvolutionProgress } from "./EvolutionProgress";
import type { EvolutionStageId } from "@/data/idea-to-reality";

/**
 * HUD labels around the stage viewport — command ID, analyzing/active
 * announcement, corner brackets and the progress readout. Remounts on
 * stage change so the announcement repeats, like the engineering scanner.
 */
export function EvolutionOverlay({
  command,
  analyzing,
  stageActive,
  selectHint,
  stageId,
  stageIndex,
  stageLabel,
  reduced = false,
}: {
  command: string;
  analyzing: string;
  stageActive: string;
  selectHint: string;
  stageId: EvolutionStageId;
  stageIndex: number;
  stageLabel: string;
  reduced?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden font-mono lg:block">
      {/* Corner brackets */}
      <span
        className="absolute start-2 top-2 h-3 w-3 border-s border-t border-line-strong"
        aria-hidden
      />
      <span
        className="absolute end-2 top-2 h-3 w-3 border-e border-t border-line-strong"
        aria-hidden
      />
      <span
        className="absolute start-2 bottom-2 h-3 w-3 border-s border-b border-line-strong"
        aria-hidden
      />
      <span
        className="absolute end-2 bottom-2 h-3 w-3 border-e border-b border-line-strong"
        aria-hidden
      />

      <span className="absolute start-4 top-3 text-[0.5625rem] uppercase tracking-[0.2em] text-fg-muted">
        {command}
      </span>

      <span className="absolute end-4 top-3 flex items-center gap-2 text-[0.5625rem] uppercase tracking-[0.2em] text-accent-300">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400"
          aria-hidden
        />
        {reduced ? (
          stageActive
        ) : (
          <Announcer key={stageId} analyzing={analyzing} stageActive={stageActive} />
        )}
      </span>

      <div className="absolute bottom-3 start-4">
        <EvolutionProgress stageIndex={stageIndex} stageLabel={stageLabel} />
      </div>

      <span className="absolute bottom-3 end-4 text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle">
        {selectHint}
      </span>
    </div>
  );
}

function Announcer({
  analyzing,
  stageActive,
}: {
  analyzing: string;
  stageActive: string;
}) {
  const [phase, setPhase] = useState<"analyzing" | "active">("analyzing");

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("active"), 750);
    return () => window.clearTimeout(t);
  }, []);

  return <>{phase === "analyzing" ? analyzing : stageActive}</>;
}