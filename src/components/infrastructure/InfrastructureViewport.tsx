"use client";

import dynamic from "next/dynamic";
import { SceneGate } from "@/components/ui/SceneGate";
import type { InfraSystemId } from "@/data/infrastructure";
import type { InfraSceneDriver } from "./scene/infra-utils";
import { InfrastructureSectionSvg } from "./InfrastructureSectionSvg";

const Scene3D = dynamic(() => import("./scene/InfrastructureScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-ink-950/40" aria-label="Loading engineering scene">
      <span className="size-6 animate-spin rounded-full border border-accent-500/40 border-t-accent-400" />
    </div>
  ),
});

/**
 * The viewport is static-first. SceneGate keeps the readable sectional
 * diagram available on mobile, reduced-motion devices, failed GPUs, and
 * during SSR, and only mounts the cinematic scene close to the viewport.
 */
export function InfrastructureViewport({
  activeId,
  progressRef,
  revealed = true,
}: {
  activeId: InfraSystemId | null;
  progressRef: InfraSceneDriver;
  revealed?: boolean;
}) {
  const fallback = (
    <InfrastructureSectionSvg
      activeId={activeId}
      revealed={revealed}
      className="h-full w-full"
    />
  );

  return (
    <SceneGate fallback={fallback} className="h-full w-full">
      {(active) => (
        <Scene3D
          activeId={activeId}
          progressRef={progressRef}
          reduced={false}
          active={active}
        />
      )}
    </SceneGate>
  );
}
