"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/motion";
import { useDirection } from "@/lib/direction-context";
import {
  EVOLUTION_STAGES,
} from "@/data/idea-to-reality";
import type { IdeaToRealityDict } from "./types";
import { IdeaToRealityIntro } from "./IdeaToRealityIntro";
import { ProjectEvolutionScene } from "./ProjectEvolutionScene";
import { MobileEvolution } from "./MobileEvolution";
import { StageMetadata } from "./StageMetadata";
import { StageIndicator } from "./StageIndicator";
import { EvolutionOverlay } from "./EvolutionOverlay";

gsap.registerPlugin(ScrollTrigger);

/**
 * FROM IDEA → REALITY — a scroll-driven theater. A tall track pins a
 * stage while scroll progress drives the camera reveal. The stage index
 * is controlled by button clicks (not scroll position).
 */
export function IdeaToReality({ dict }: { dict: IdeaToRealityDict }) {
  const dir = useDirection();
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [stageIndex, setStageIndex] = useState(0);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;

    const st = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => {
      st.kill();
    };
  }, { dependencies: [reduced] });

  const stage = EVOLUTION_STAGES[stageIndex];
  const titles = EVOLUTION_STAGES.map((s) => dict.stages[s.id].title);

  return (
    <section
      id="idea-to-reality"
      className="relative scroll-mt-24 overflow-hidden"
      aria-labelledby="idea-to-reality-title"
    >
      {/* Ambient section backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(77,163,255,0.06),transparent_60%)]"
      />

      <IdeaToRealityIntro
        eyebrow={dict.intro.eyebrow}
        titleLine1={dict.intro.titleLine1}
        titleLine2={dict.intro.titleLine2}
        lead={dict.intro.lead}
        dir={dir}
      />

      {/* Mobile storytelling */}
      <MobileEvolution dict={dict} />

      {/* Desktop sticky theater */}
      <div
        ref={trackRef}
        data-evo-track
        className="relative hidden pb-12 lg:block lg:pb-16"
      >
        <div className="flex items-center py-4">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,3fr)_minmax(0,1fr)] items-center gap-8 px-12">
            <StageMetadata
              stage={stage}
              title={dict.stages[stage.id].title}
              description={dict.stages[stage.id].description}
              stageLabel={dict.stage}
              stageActive={dict.stageActive}
              reduced={reduced}
            />

            <div className="relative aspect-[16/10] max-h-[72vh] w-full overflow-hidden rounded-2xl border border-line bg-ink-900/60">
              <ProjectEvolutionScene
                progress={progress}
                stageIndex={stageIndex}
                reduced={reduced}
              />
              <EvolutionOverlay
                command={dict.command}
                analyzing={dict.analyzing}
                stageActive={dict.stageActive}
                selectHint={dict.selectHint}
                stageId={stage.id}
                stageIndex={stageIndex}
                stageLabel={dict.stage}
                reduced={reduced}
              />
            </div>

            <StageIndicator
              activeIndex={stageIndex}
              stages={EVOLUTION_STAGES}
              titles={titles}
              stageLabel={dict.stage}
              onSelect={(i) => setStageIndex(i)}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
