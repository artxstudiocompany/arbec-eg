"use client";

import dynamic from "next/dynamic";
import { EvolutionDiagram } from "./EvolutionDiagram";
import type { DriveRef } from "./scene/opacityDrive";
import { SceneGate } from "@/components/ui/SceneGate";

/**
 * Lazy-mounts the evolution WebGL theater (ssr:false so Three never runs
 * on the server). If WebGL is unavailable we render the premium SVG
 * cross-section diagram instead of a blank canvas.
 */
const Scene3D = dynamic(() => import("./ProjectEvolutionScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border border-accent-500/40 border-t-accent-400" />
        <span className="text-ar-mono uppercase tracking-[0.22em] text-fg-subtle">
          loading stage
        </span>
      </div>
    </div>
  ),
});

export function ProjectEvolutionScene({
  progress,
  stageIndex,
  reduced = false,
}: {
  progress: DriveRef;
  stageIndex: number;
  reduced?: boolean;
}) {
  return (
    <SceneGate
      className="relative h-full w-full"
      fallback={<EvolutionDiagram stageIndex={stageIndex} />}
    >
      {(active) => (
        <Scene3D
          active={active}
          progress={progress}
          stageIndex={stageIndex}
          reduced={reduced}
        />
      )}
    </SceneGate>
  );
}
