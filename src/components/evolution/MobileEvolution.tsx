"use client";

import { useStaggerReveal } from "@/lib/motion";
import { useDirection } from "@/lib/direction-context";
import {
  EVOLUTION_STAGES,
  EVOLUTION_STAGE_COUNT,
} from "@/data/idea-to-reality";
import type { EvolutionVisualStage } from "@/data/idea-to-reality";
import type { IdeaToRealityDict } from "./types";

/**
 * Mobile storytelling — each stage is its own stacked card with a small
 * engaged visual glyph. No scaled-down desktop scene, no forced 3D.
 */
export function MobileEvolution({ dict }: { dict: IdeaToRealityDict }) {
  const dir = useDirection();
  const ref = useStaggerReveal(dir, {
    from: "start",
    distance: 24,
    stagger: 0.06,
  });

  return (
    <div className="relative mx-auto mt-8 max-w-3xl px-5 sm:px-8 lg:hidden">
      <div ref={ref} className="flex flex-col">
        {EVOLUTION_STAGES.map((s) => (
          <article key={s.id} className="border-t border-line py-5">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[0.625rem] tracking-[0.28em] text-fg-subtle">
                {s.number} / {String(EVOLUTION_STAGE_COUNT).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden />
            </div>

            <div className="mt-4 flex items-start gap-5">
              <span
                className="mt-1 size-3 shrink-0 rotate-45 border"
                style={{ borderColor: s.accentColor }}
                aria-hidden
              />
              <div className="min-w-0">
                <h3 className="text-ar-h3 text-fg">{dict.stages[s.id].title}</h3>
                <p className="mt-2 text-ar-body-sm leading-relaxed text-fg-muted">
                  {dict.stages[s.id].description}
                </p>
                <div className="mt-3">
                  <StageGlyph visualStage={s.visualStage} accent={s.accentColor} />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="h-px bg-line" aria-hidden />
    </div>
  );
}

function StageGlyph({
  visualStage,
  accent,
}: {
  visualStage: EvolutionVisualStage;
  accent: string;
}) {
  return (
    <svg
      viewBox="0 0 64 40"
      className="h-10 w-full max-w-[12rem]"
      role="img"
      aria-hidden="true"
    >
      <rect
        x="22"
        y="8"
        width="26"
        height="25"
        fill="none"
        stroke={accent}
        strokeWidth="1.2"
      />

      {visualStage === "blueprint" && (
        <g stroke={accent} strokeWidth="0.8" fill="none">
          <line x1="22" y1="14" x2="48" y2="14" />
          <line x1="22" y1="20.5" x2="48" y2="20.5" />
          <line x1="22" y1="27" x2="48" y2="27" />
          <line x1="35" y1="8" x2="35" y2="33" />
        </g>
      )}
      {visualStage === "engineeringModel" && (
        <g stroke={accent} strokeWidth="0.9" fill="none">
          <line x1="26" y1="9" x2="26" y2="33" />
          <line x1="35" y1="9" x2="35" y2="33" />
          <line x1="44" y1="9" x2="44" y2="33" />
          <line x1="24" y1="16" x2="46" y2="16" />
          <line x1="24" y1="24" x2="46" y2="24" />
        </g>
      )}
      {visualStage === "technicalDrawings" && (
        <g stroke={accent} strokeWidth="0.8" fill="none">
          <line x1="50" y1="8" x2="50" y2="33" />
          <line x1="47" y1="15" x2="53" y2="15" />
          <line x1="47" y1="23" x2="53" y2="23" />
          <circle cx="29" cy="13" r="4" />
        </g>
      )}
      {visualStage === "materials" && (
        <g stroke={accent} strokeWidth="0.9" fill="none">
          <rect x="6" y="27" width="12" height="6" />
          <rect x="20" y="26" width="9" height="7" />
          <circle cx="52" cy="28" r="4" />
          <path d="M22 8 v25 M22 8 h26" strokeDasharray="2 2" opacity="0.6" />
        </g>
      )}
      {visualStage === "structure" && (
        <g stroke={accent} strokeWidth="0.8">
          <line x1="22" y1="8" x2="48" y2="33" />
          <line x1="48" y1="8" x2="22" y2="33" />
          <line x1="35" y1="8" x2="35" y2="33" strokeWidth="1" />
        </g>
      )}
      {visualStage === "mep" && (
        <g stroke={accent} strokeWidth="0.9">
          <line x1="28" y1="9" x2="28" y2="33" />
          <line x1="40" y1="9" x2="40" y2="33" />
          <line x1="23" y1="17" x2="48" y2="17" />
          <line x1="23" y1="26" x2="48" y2="26" />
        </g>
      )}
      {visualStage === "finishes" && (
        <g>
          {[13, 20.5, 27].map((y) => (
            <g key={y}>
              <rect
                x="23"
                y={y - 2.5}
                width="24"
                height="4.5"
                fill={`${accent}33`}
              />
              <line
                x1="24"
                y1={y + 0.25}
                x2="46"
                y2={y + 0.25}
                stroke="#ffd9a0"
                strokeWidth="0.8"
              />
            </g>
          ))}
        </g>
      )}
      {visualStage === "completed" && (
        <g stroke={accent} strokeWidth="1.1" fill="none">
          <circle cx="52" cy="12" r="6" />
          <path d="M49 12 L51.5 14.5 L55 9.5" strokeWidth="1.3" />
        </g>
      )}

      <line
        x1="6"
        y1="33"
        x2="58"
        y2="33"
        stroke={accent}
        strokeWidth="0.6"
        opacity="0.55"
      />
    </svg>
  );
}
