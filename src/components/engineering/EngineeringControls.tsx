"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ENGINEERING_LAYERS } from "@/data/engineering-core";
import type { EngineeringLayerId } from "@/data/engineering-core";

export type EngineeringControlsProps = {
  layers: Record<
    EngineeringLayerId,
    { system: string; title: string; description: string }
  >;
  activeLayer: EngineeringLayerId;
  onSelect: (layer: EngineeringLayerId) => void;
};

/**
 * Discipline selector. Desktop: a vertical list on the start side.
 * Mobile: a horizontally swipeable strip. Keyboard accessible.
 */
export function EngineeringControls({
  layers,
  activeLayer,
  onSelect,
}: EngineeringControlsProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const buttons = ENGINEERING_LAYERS.map((layer, i) => {
    const label = layers[layer.id].title;
    const active = layer.id === activeLayer;
    return (
      <button
        key={layer.id}
        type="button"
        role="tab"
        aria-selected={active}
        tabIndex={active ? 0 : -1}
        aria-label={label}
        onClick={() => onSelect(layer.id)}
        className={cn(
          "group flex min-w-0 items-center gap-3 rounded-md border border-transparent px-3 py-2 text-start transition-colors duration-300 focus-visible:outline-none focus-visible:border-accent-400",
          active
            ? "border-line-strong bg-glass text-fg"
            : "text-fg-muted hover:bg-glass hover:text-fg",
        )}
      >
        <span
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.2em]",
            active ? "text-accent-400" : "text-fg-subtle",
          )}
        >
          {String(i + 1).padStart(2, "0")}
        </span>
        <span className="truncate text-ar-caption uppercase tracking-[0.14em] sm:text-xs">
          {label}
        </span>
        <span
          aria-hidden
          className={cn(
            "ms-auto block h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
            active ? "bg-accent-400" : "bg-fg-subtle/40",
          )}
        />
      </button>
    );
  });

  if (isMobile) {
    return (
      <div className="-mx-5 overflow-x-auto px-5 pt-6 pb-4 sm:-mx-8 sm:px-8 lg:hidden">
        <div
          role="tablist"
          aria-label={layers[activeLayer]?.system ?? ""}
          className="flex w-max gap-2"
        >
          {ENGINEERING_LAYERS.map((layer, i) => (
            <button
              key={layer.id}
              type="button"
              role="tab"
              aria-selected={layer.id === activeLayer}
              tabIndex={layer.id === activeLayer ? 0 : -1}
              onClick={() => onSelect(layer.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-ar-caption uppercase tracking-[0.12em] transition-colors duration-300 focus-visible:outline-none focus-visible:border-accent-400",
                layer.id === activeLayer
                  ? "border-accent-500/60 bg-accent-500/10 text-fg"
                  : "border-line bg-glass text-fg-muted",
              )}
            >
              {String(i + 1).padStart(2, "0")} · {layers[layer.id].title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      aria-label="Engineering disciplines"
      role="tablist"
      className="hidden flex-col gap-1 lg:flex"
    >
      {buttons}
    </div>
  );
}
