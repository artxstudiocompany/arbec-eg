"use client";

import { getLayerIndex } from "@/data/engineering-core";
import type { EngineeringLayerId } from "@/data/engineering-core";

export function EngineeringInfoPanel({
  activeLayer,
  layer,
}: {
  activeLayer: EngineeringLayerId;
  layer: { system: string; title: string; description: string };
}) {
  const index = getLayerIndex(activeLayer);

  return (
    <div className="border-s-2 border-accent-500/50 ps-4">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fg-subtle">
          {layer.system}
        </span>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-accent-400">
          {index >= 0 ? `0${index + 1}` : ""}/08
        </span>
      </div>
      <h3
        key={activeLayer}
        className="mt-2 text-ar-h3 text-fg opacity-0 [animation:reveal-fade_0.6s_ease-out_forwards]"
      >
        {layer.title}
      </h3>
      <p
        key={`${activeLayer}-body`}
        className="mt-2 max-w-[46ch] text-ar-body-sm leading-relaxed text-fg-muted opacity-0 [animation:reveal-fade_0.6s_0.1s_ease-out_forwards]"
      >
        {layer.description}
      </p>

      <style>{`
        @keyframes reveal-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}