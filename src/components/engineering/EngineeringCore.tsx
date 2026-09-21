"use client";

import { useCallback, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { useDirection } from "@/lib/direction-context";
import { ENGINEERING_LAYERS } from "@/data/engineering-core";
import type { EngineeringLayerId } from "@/data/engineering-core";
import { EngineeringIntro } from "./EngineeringIntro";
import { EngineeringScene } from "./EngineeringScene";
import { EngineeringControls } from "./EngineeringControls";
import { EngineeringInfoPanel } from "./EngineeringInfoPanel";
import { EngineeringScanner } from "./EngineeringScanner";
import { EngineeringMetadata } from "./EngineeringMetadata";

gsap.registerPlugin(ScrollTrigger);

export type EngineeringCoreDict = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  command: string;
  system: string;
  mode: string;
  visualization: string;
  modeActive: string;
  analyzing: string;
  layerActive: string;
  selectHint: string;
  layers: Record<
    EngineeringLayerId,
    { system: string; title: string; description: string }
  >;
};

export function EngineeringCore({
  dict,
}: {
  dict: EngineeringCoreDict;
}) {
  const dir = useDirection();
  const reduced = useReducedMotion();
  const [activeLayer, setActiveLayer] = useState<EngineeringLayerId>(
    "architecture",
  );
  const [entered, setEntered] = useState(false);

  const select = useCallback((layer: EngineeringLayerId) => {
    setActiveLayer(layer);
  }, []);

  useGSAP(() => {
    if (!entered) return;
    if (reduced) return;
    // Cinematic entry: the core grid fades + rises slightly as one block.
    const el = document.querySelector("[data-core-grid]");
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      },
    );
  }, { dependencies: [entered] });

  const activeInfo = dict.layers[activeLayer];
  const activeSystemId =
    ENGINEERING_LAYERS.find((l) => l.id === activeLayer)?.accentColor ===
    "#7cc0ff"
      ? dict.layers.architecture.system
      : activeInfo.system;

  return (
    <section
      id="engineering-core"
      className="section-spacing relative scroll-mt-24 overflow-hidden"
      aria-label={dict.eyebrow}
      onPointerEnter={() => setEntered(true)}
    >
      {/* Ambient section backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(77,163,255,0.07),transparent_60%)]"
      />

      <EngineeringIntro
        eyebrow={dict.eyebrow}
        titleLine1={dict.titleLine1}
        titleLine2={dict.titleLine2}
        lead={dict.lead}
        dir={dir}
      />

      <div
        data-core-grid
        className="relative mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-5 sm:px-8 lg:mt-10 lg:grid-cols-[240px_1fr_280px] lg:items-start lg:gap-8 lg:px-12"
      >
        {/* Desktop controls — start side */}
        <div className="order-2 hidden lg:order-1 lg:sticky lg:top-28 lg:block">
          <EngineeringControls
            layers={dict.layers}
            activeLayer={activeLayer}
            onSelect={select}
          />
        </div>

        {/* Central visualization */}
        <div className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-ink-900/60 sm:aspect-[16/11] lg:aspect-auto lg:h-[30rem]">
            <EngineeringScene activeLayer={activeLayer} reduced={reduced} />
            <EngineeringScanner
              layerId={activeLayer}
              analyzing={dict.analyzing}
              layerActive={dict.layerActive}
              reduced={reduced}
            />
            <EngineeringMetadata
              command={dict.command}
              systemLabel={dict.system}
              modeLabel={dict.mode}
              visualization={dict.visualization}
              modeActive={dict.modeActive}
              activeSystem={activeSystemId}
            />
          </div>
          {/* mobile controls — just under the viewport */}
          <div className="mt-2 lg:hidden">
            <EngineeringControls
              layers={dict.layers}
              activeLayer={activeLayer}
              onSelect={select}
            />
          </div>
        </div>

        {/* Info panel — end side */}
        <div className="order-3 lg:sticky lg:top-28 lg:order-3">
          <EngineeringInfoPanel activeLayer={activeLayer} layer={activeInfo} />
          <p className="mt-6 hidden text-2xs font-mono uppercase tracking-[0.22em] text-fg-subtle lg:block">
            {dict.selectHint}
          </p>
        </div>
      </div>
    </section>
  );
}
