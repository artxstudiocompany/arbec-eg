"use client";

import dynamic from "next/dynamic";
import type { EngineeringLayerId } from "@/data/engineering-core";
import { EngineeringFallback } from "./EngineeringFallback";
import { SceneGate } from "@/components/ui/SceneGate";

/**
 * Lazy-mounts the WebGL scene (ssr:false so Three never runs on the
 * server). If WebGL is unavailable we render the premium SVG/CSS
 * fallback instead of a blank canvas.
 */
const Scene3D = dynamic(() => import("./EngineeringScene3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="size-8 animate-spin rounded-full border border-accent-500/40 border-t-accent-400" />
        <span className="text-ar-mono uppercase tracking-[0.22em] text-fg-subtle">
          loading viewport
        </span>
      </div>
    </div>
  ),
});

export function EngineeringScene({
  activeLayer,
  reduced = false,
}: {
  activeLayer: EngineeringLayerId;
  reduced?: boolean;
}) {
  return (
    <SceneGate
      className="relative h-full w-full"
      fallback={<EngineeringFallback activeLayer={activeLayer} />}
    >
      {(active) => (
        <Scene3D active={active} activeLayer={activeLayer} reduced={reduced} />
      )}
    </SceneGate>
  );
}
