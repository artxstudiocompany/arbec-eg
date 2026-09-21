"use client";

import { EVOLUTION_STAGES } from "@/data/idea-to-reality";
import type { EvolutionStage } from "@/data/idea-to-reality";

function accent(i: number): string {
  return EVOLUTION_STAGES[i].accentColor;
}

/**
 * Data-driven cross-section diagram of the project journey — used as the
 * premium fallback when WebGL is unavailable, and as the visual anchor of
 * the mobile storytelling. Each stage adds its layer cumulatively.
 */
export function EvolutionDiagram({ stageIndex }: { stageIndex: number }) {
  const stage: EvolutionStage = EVOLUTION_STAGES[stageIndex];

  return (
    <svg
      viewBox="0 0 320 340"
      className="mx-auto h-full max-h-full w-auto"
      role="img"
      aria-label="ARBEC project development journey diagram"
    >
      <defs>
        <linearGradient id="evo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101c2e" />
          <stop offset="100%" stopColor="#060a12" />
        </linearGradient>
        <pattern id="evo-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0v20" fill="none" stroke="#1c2a3e" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="320" height="340" fill="url(#evo-sky)" />
      <rect width="320" height="340" fill="url(#evo-grid)" />
      <line x1="10" y1="296" x2="310" y2="296" stroke="#2b5278" strokeWidth="1" />

      {/* Building footprint outline */}
      <rect
        x="90"
        y="70"
        width="140"
        height="226"
        fill={
          stageIndex >= 4 ? `${accent(4)}22` : "rgba(124,192,255,0.05)"
        }
        stroke={stageIndex >= 4 ? accent(4) : "#2b5278"}
        strokeWidth={stageIndex >= 4 ? 2.5 : 1.2}
        className="transition-[fill,stroke] duration-700"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="90"
          y1={70 + (i + 1) * 45}
          x2="230"
          y2={70 + (i + 1) * 45}
          stroke="#2b5278"
          strokeWidth="0.8"
          opacity="0.5"
        />
      ))}

      {/* Engineering — structure */}
      {stageIndex >= 1 && (
        <g className="transition-opacity duration-700" stroke={accent(1)}>
          <line x1="100" y1="90" x2="100" y2="290" strokeWidth="2" />
          <line x1="220" y1="90" x2="220" y2="290" strokeWidth="2" />
          <line x1="160" y1="90" x2="160" y2="290" strokeWidth="2" />
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1="100"
              y1={115 + i * 45}
              x2="220"
              y2={115 + i * 45}
              strokeWidth="1.4"
              strokeDasharray="4 3"
            />
          ))}
        </g>
      )}

      {/* Technical office — dimensions & sections */}
      {stageIndex >= 2 && (
        <g className="transition-opacity duration-700" stroke={accent(2)}>
          <line x1="248" y1="70" x2="248" y2="296" strokeWidth="1.2" />
          <line x1="240" y1="85" x2="256" y2="85" strokeWidth="1" />
          <line x1="240" y1="160" x2="256" y2="160" strokeWidth="0.8" />
          <line x1="240" y1="230" x2="256" y2="230" strokeWidth="1" />
          <circle cx="122" cy="120" r="14" fill="none" strokeWidth="1.2" />
          <circle cx="122" cy="120" r="4" fill="none" strokeWidth="0.8" />
        </g>
      )}

      {/* Procurement — materials gathering at grade */}
      {stageIndex >= 3 && (
        <g className="transition-opacity duration-700" stroke={accent(3)} fill="none">
          <rect x="238" y="272" width="26" height="20" strokeWidth="1.4" />
          <rect x="270" y="280" width="20" height="14" strokeWidth="1.2" />
          <circle cx="252" cy="260" r="8" strokeWidth="1.4" />
          <path d="M244 258 L232 240 M260 268 L268 236" strokeWidth="1" opacity="0.7" />
        </g>
      )}

      {/* Construction — structural steel web */}
      {stageIndex >= 4 && (
        <g className="transition-opacity duration-700" stroke={accent(4)} fill="none">
          {[105, 135, 165, 195, 225].map((x) => (
            <line key={x} x1={x} y1="70" x2={x} y2="296" strokeWidth="0.9" opacity="0.8" />
          ))}
          {[105, 135, 165, 195, 225].map((x) => (
            <line
              key={`b${x}`}
              x1={x}
              y1="70"
              x2={x + 20}
              y2="296"
              strokeWidth="0.7"
              opacity="0.5"
            />
          ))}
        </g>
      )}

      {/* MEP — systems risers */}
      {stageIndex >= 5 && (
        <g className="transition-opacity duration-700" stroke={accent(5)}>
          <line x1="138" y1="82" x2="138" y2="290" strokeWidth="2" />
          <line x1="178" y1="82" x2="178" y2="290" strokeWidth="2" />
          <line x1="87" y1="140" x2="233" y2="140" strokeWidth="1" />
          <line x1="87" y1="205" x2="233" y2="205" strokeWidth="1" />
          <line x1="87" y1="270" x2="233" y2="270" strokeWidth="1" />
        </g>
      )}

      {/* Finishing — interior warm fields */}
      {stageIndex >= 6 && (
        <g className="transition-opacity duration-700">
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <rect
                x="102"
                y={115 + i * 45 - 6}
                width="116"
                height="7"
                fill={`${accent(6)}55`}
              />
              <line
                x1="108"
                y1={115 + i * 45}
                x2="212"
                y2={115 + i * 45}
                stroke="#ffd9a0"
                strokeWidth="0.8"
                opacity="0.7"
              />
            </g>
          ))}
        </g>
      )}

      {/* Delivery — completion ring + check */}
      {stageIndex >= 7 && (
        <g className="transition-opacity duration-700">
          <circle cx="222" cy="80" r="16" fill="none" stroke={accent(7)} strokeWidth="1.6" />
          <path
            d="M216 80 L220 84 L228 75"
            fill="none"
            stroke={accent(7)}
            strokeWidth="1.8"
          />
        </g>
      )}

      {/* Legend: STAGE 0N / 08 */}
      <text
        x="20"
        y="322"
        fill="#70839c"
        fontSize="10"
        letterSpacing="2"
        fontFamily="monospace"
        className="uppercase"
      >
        {stage.number} / 08
      </text>
    </svg>
  );
}