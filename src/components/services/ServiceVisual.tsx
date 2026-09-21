"use client";

import { useId } from "react";
import type { ServiceVisual as VisualType } from "@/data/services";

/**
 * Service visual system — one schematic language, nine distinct behaviours.
 * Every variant shares the same ink/grid/blueprint base; only the engineered
 * content differs. Wordless, so it reads equally well in LTR and RTL.
 */

export const SERVICE_ACCENTS: Record<VisualType, string> = {
  "supply-chain": "#7cc0ff",
  blueprint: "#a78bfa",
  structure: "#94a3b8",
  modular: "#6ee7d8",
  underground: "#4da3ff",
  "finishing-transform": "#dbb98a",
  "mep-systems": "#f87171",
  "power-dist": "#f0b24a",
  "energy-flow": "#fbbf24",
};

const INK = "#060a12";
const INK_LINE = "#16233a";
const BUILDING = "#2b5278";
const NEUTRAL = "#5a7090";

export function ServiceVisual({
  visual,
  className,
}: {
  visual: VisualType;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");
  const accent = SERVICE_ACCENTS[visual];

  return (
    <svg
      viewBox="0 0 640 440"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101c2e" />
          <stop offset="100%" stopColor={INK} />
        </linearGradient>
        <pattern
          id={`${uid}-grid`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M24 0H0v24"
            fill="none"
            stroke={INK_LINE}
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id={`${uid}-hatch`}
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke={accent} strokeWidth="0.7" />
        </pattern>
        <radialGradient id={`${uid}-glow`}>
          <stop offset="0%" stopColor={accent} stopOpacity="0.5" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shared frame — ink + engineering grid */}
      <rect width="640" height="440" fill={`url(#${uid}-bg)`} />
      <rect width="640" height="440" fill={`url(#${uid}-grid)`} />
      <rect width="640" height="440" fill="none" stroke={INK_LINE} strokeWidth="1" />

      {visual === "supply-chain" && <SupplyChain accent={accent} />}
      {visual === "blueprint" && <Blueprint accent={accent} />}
      {visual === "structure" && <Structure accent={accent} uid={uid} />}
      {visual === "modular" && <Modular accent={accent} uid={uid} />}
      {visual === "underground" && <Underground accent={accent} />}
      {visual === "finishing-transform" && (
        <FinishingTransform accent={accent} uid={uid} />
      )}
      {visual === "mep-systems" && <MepSystems accent={accent} />}
      {visual === "power-dist" && <PowerDist accent={accent} />}
      {visual === "energy-flow" && <EnergyFlow accent={accent} uid={uid} />}
    </svg>
  );
}

/* ── 01 · SUPPLIES — material flow through an engineered supply network ── */

function SupplyChain({ accent }: { accent: string }) {
  return (
    <g>
      <line x1="20" y1="380" x2="620" y2="380" stroke={BUILDING} strokeWidth="1.2" />

      {/* Spec sheet */}
      <rect x="56" y="112" width="130" height="200" fill="#0a1220" stroke={NEUTRAL} strokeWidth="1.2" />
      <line x1="74" y1="148" x2="170" y2="148" stroke={NEUTRAL} strokeWidth="0.8" />
      <line x1="74" y1="172" x2="168" y2="172" stroke={NEUTRAL} strokeWidth="0.8" />
      <line x1="74" y1="196" x2="164" y2="196" stroke={NEUTRAL} strokeWidth="0.8" />
      <line x1="74" y1="220" x2="168" y2="220" stroke={NEUTRAL} strokeWidth="0.8" />
      <line x1="74" y1="244" x2="150" y2="244" stroke={NEUTRAL} strokeWidth="0.8" />
      <circle cx="90" cy="138" r="5" fill="none" stroke={accent} strokeWidth="1.2" />
      <line x1="70" y1="282" x2="172" y2="282" stroke={accent} strokeWidth="1.4" strokeDasharray="5 4" />

      {/* Flow chevrons — SPEC → MATERIAL */}
      <path d="M206 210h0" stroke="none" />
      {[212, 246, 280].map((x) => (
        <path
          key={x}
          d={`M${x} 176 l14 22 -14 22`}
          fill="none"
          stroke={accent}
          strokeWidth="1.6"
          opacity="0.9"
        />
      ))}

      {/* Material blocks moving toward site */}
      {[140, 170, 200].map((y, i) => (
        <g key={i} className="animate-[dashflow_1.4s_linear_infinite]">
          <rect x={320 + (i % 2) * -14} y={y} width="92" height="22" fill="none" stroke={accent} strokeWidth="1.4" />
          <line x1={326 + (i % 2) * -14} y1={y + 11} x2={406 + (i % 2) * -14} y2={y + 11} stroke={accent} strokeWidth="0.6" strokeDasharray="8 6" />
        </g>
      ))}

      {/* Site */}
      <g transform="translate(470,90)">
        <line x1="0" y1="290" x2="130" y2="290" stroke={BUILDING} strokeWidth="1.2" />
        <rect x="20" y="120" width="90" height="170" fill="#0a1220" stroke={accent} strokeWidth="1.4" />
        <path d="M20 120 l45 -46 45 46" fill="none" stroke={accent} strokeWidth="1.4" />
        {[0, 1, 2, 3].map((f) => (
          <line key={f} x1="24" y1={150 + f * 34} x2="106" y2={150 + f * 34} stroke={BUILDING} strokeWidth="0.7" />
        ))}
        <rect x="48" y="230" width="24" height="60" fill="none" stroke={BUILDING} strokeWidth="1" />
        <path d="M-8 290 q16 -18 18 0" fill="none" stroke={NEUTRAL} strokeWidth="1" />
      </g>

      {/* Dims */}
      <path d="M30 100 v18" stroke={NEUTRAL} strokeWidth="0.8" />
      <path d="M610 100 v18" stroke={NEUTRAL} strokeWidth="0.8" />
      <line x1="30" y1="109" x2="610" y2="109" stroke={NEUTRAL} strokeWidth="0.8" strokeDasharray="2 6" />
    </g>
  );
}

/* ── 02 · TECHNICAL OFFICE — blueprints becoming coordinated drawings ── */

function Blueprint({ accent }: { accent: string }) {
  return (
    <g>
      <rect x="26" y="26" width="588" height="388" fill="none" stroke={BUILDING} strokeWidth="1.4" />
      <rect x="34" y="34" width="572" height="380" fill="none" stroke={BUILDING} strokeWidth="0.6" />
      <path d="M26 96 L96 26" stroke={BUILDING} strokeWidth="0.8" />

      {/* Compass */}
      <circle cx="80" cy="140" r="26" fill="none" stroke={NEUTRAL} strokeWidth="1" />
      <line x1="80" y1="114" x2="80" y2="166" stroke={NEUTRAL} strokeWidth="0.6" />
      <line x1="54" y1="140" x2="106" y2="140" stroke={NEUTRAL} strokeWidth="0.6" />
      <path d="M80 120 l10 40 -10 -12 -10 12 z" fill="none" stroke={accent} strokeWidth="1.2" />

      {/* Plan — walls + partitions */}
      <rect x="200" y="130" width="260" height="200" fill="#0a1220" stroke={accent} strokeWidth="1.8" />
      <line x1="330" y1="130" x2="330" y2="330" stroke={accent} strokeWidth="1" />
      <line x1="200" y1="230" x2="330" y2="230" stroke={accent} strokeWidth="1" strokeDasharray="8 5" />
      <line x1="330" y1="230" x2="460" y2="280" stroke={accent} strokeWidth="1" strokeDasharray="8 5" />
      {/* Door swing */}
      <path d="M330 270 A40 40 0 0 1 290 230" fill="none" stroke={NEUTRAL} strokeWidth="0.8" strokeDasharray="3 3" />
      <line x1="330" y1="270" x2="330" y2="230" stroke={NEUTRAL} strokeWidth="0.9" />
      {/* Windows */}
      {[220, 260, 300].map((y) => (
        <line key={y} x1="200" y1={y} x2="188" y2={y} stroke={accent} strokeWidth="1.2" />
      ))}
      {[160, 200, 240].map((y) => (
        <line key={y} x1="460" y1={y} x2="472" y2={y} stroke={accent} strokeWidth="1.2" />
      ))}

      {/* Section line */}
      <line x1="180" y1="190" x2="480" y2="190" stroke={NEUTRAL} strokeWidth="1" strokeDasharray="10 3" />
      <path d="M180 190 l-10 -6 v12 z" fill={NEUTRAL} />
      <path d="M480 190 l10 -6 v12 z" fill={NEUTRAL} />

      {/* Dimensions */}
      <line x1="160" y1="96" x2="540" y2="96" stroke={NEUTRAL} strokeWidth="0.8" />
      {[160, 540].map((x) => (
        <g key={x}>
          <line x1={x} y1="88" x2={x} y2="104" stroke={NEUTRAL} strokeWidth="0.8" />
          <line x1={x} y1="96" x2={x} y2="130" stroke={NEUTRAL} strokeWidth="0.4" strokeDasharray="2 3" />
        </g>
      ))}
      <path d="M160 96 l8 -3 -8 -3" fill={NEUTRAL} />
      <path d="M540 96 l-8 -3 8 -3" fill={NEUTRAL} />
      <line x1="330" y1="88" x2="330" y2="104" stroke={accent} strokeWidth="0.8" />

      {/* Title block */}
      <rect x="440" y="330" width="164" height="80" fill="none" stroke={accent} strokeWidth="1.2" />
      <line x1="440" y1="362" x2="604" y2="362" stroke={accent} strokeWidth="0.6" />
      <line x1="440" y1="394" x2="604" y2="394" stroke={accent} strokeWidth="0.6" />
      <line x1="480" y1="330" x2="480" y2="362" stroke={accent} strokeWidth="0.6" />
      <rect x="452" y="340" width="16" height="12" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
      <circle cx="556" cy="348" r="5" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
    </g>
  );
}

/* ── 03 · CIVIL — structure assembling layer by layer ── */

function Structure({ accent, uid }: { accent: string; uid: string }) {
  return (
    <g>
      {/* Ground + footing */}
      <line x1="30" y1="372" x2="610" y2="372" stroke={BUILDING} strokeWidth="1.2" />
      <rect x="150" y="352" width="280" height="20" fill={`url(#${uid}-hatch)`} stroke={accent} strokeWidth="1.2" />

      {/* Shell */}
      <rect x="190" y="70" width="200" height="282" fill="#0a1220" stroke={BUILDING} strokeWidth="1.2" />

      {/* Columns */}
      {[196, 246, 296, 346].map((x) => (
        <line key={x} x1={x} y1="70" x2={x} y2="352" stroke={accent} strokeWidth="3" opacity="0.85" />
      ))}

      {/* Floor slabs */}
      {[126, 186, 246, 306].map((y) => (
        <rect key={y} x="184" y={y} width="212" height="7" fill={accent} opacity="0.8" />
      ))}

      {/* Brick infill between columns (dashed) */}
      {[0, 1, 2, 3].map((f) => (
        <g key={f}>
          <line x1="200" y1={140 + f * 60} x2="246" y2={140 + f * 60} stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="4 3" />
          <line x1="250" y1={140 + f * 60} x2="296" y2={140 + f * 60} stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="4 3" />
          <line x1="300" y1={140 + f * 60} x2="346" y2={140 + f * 60} stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="4 3" />
          <line x1="350" y1={140 + f * 60} x2="386" y2={140 + f * 60} stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="4 3" />
        </g>
      ))}

      {/* Parapet + roof */}
      <line x1="186" y1="66" x2="394" y2="66" stroke={accent} strokeWidth="4" />
      <rect x="184" y="60" width="212" height="6" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />

      {/* Layer bracket */}
      {[70, 126, 186, 246].map((y, i) => (
        <g key={y}>
          <line x1="408" y1={y + 2} x2="408" y2={y + 56} stroke={accent} strokeWidth="0.8" />
          <rect x="438" y={y - 6} width="18" height="14" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
          <text x="447" y="4" fill={accent} fontSize="9" fontFamily="ui-monospace,monospace" textAnchor="middle">
            {String(i + 1).padStart(2, "0")}
          </text>
        </g>
      ))}
    </g>
  );
}

/* ── 04 · PREFAB — modular assembly ── */

function Modular({ accent, uid }: { accent: string; uid: string }) {
  return (
    <g>
      {/* Base pad */}
      <rect x="120" y="350" width="420" height="18" fill={`url(#${uid}-hatch)`} stroke={accent} strokeWidth="1.2" />

      {/* Two mounted modules */}
      {[135, 335].map((x) => (
        <g key={x}>
          <rect x={x} y="238" width="195" height="112" fill="#0a1220" stroke={accent} strokeWidth="1.6" />
          <line x1={x} y1="238" x2={x + 195} y2="238" stroke={NEUTRAL} strokeWidth="0.7" />
          <line x1={x + 30} y1="258" x2={x + 168} y2="258" stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="6 4" />
          <rect x={x + 52} y="286" width="30" height="40" fill="none" stroke={NEUTRAL} strokeWidth="1" />
          <line x1={x + 96} y1="286" x2={x + 96} y2="318" stroke={NEUTRAL} strokeWidth="0.8" />
        </g>
      ))}

      {/* Hoisted module */}
      <rect x="312" y="118" width="180" height="102" fill="#0a1220" stroke={accent} strokeWidth="1.6" />
      <line x1="326" y1="138" x2="478" y2="138" stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="6 4" />
      <line x1="360" y1="150" x2="360" y2="88" stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="3 5" />
      <line x1="440" y1="150" x2="440" y2="88" stroke={NEUTRAL} strokeWidth="0.6" strokeDasharray="3 5" />
      <line x1="342" y1="96" x2="470" y2="96" stroke={accent} strokeWidth="1.2" />

      {/* Seating arrow */}
      <path d="M402 220 v20 h0" stroke="none" />
      <line x1="402" y1="222" x2="402" y2="238" stroke={accent} strokeWidth="1.6" />
      <path d="M402 238 l-8 -6 8 12 8 -12 z" fill={accent} />

      {/* Joint marks */}
      {[330, 390, 450].map((x) => (
        <path key={x} d={`M${x} 300 l7 7 7 -7`} fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
      ))}
    </g>
  );
}

/* ── 05 · INFRASTRUCTURE — underground networks on a site map ── */

function Underground({ accent }: { accent: string }) {
  return (
    <g>
      {/* Site surface */}
      <rect x="50" y="40" width="540" height="330" fill="#0a1220" stroke={BUILDING} strokeWidth="1.2" />
      {/* Streets */}
      <line x1="50" y1="150" x2="590" y2="150" stroke="#1d2c44" strokeWidth="34" />
      <line x1="50" y1="150" x2="590" y2="150" stroke={BUILDING} strokeWidth="0.8" strokeDasharray="16 10" />
      <line x1="300" y1="40" x2="300" y2="370" stroke="#1d2c44" strokeWidth="34" />
      <line x1="300" y1="40" x2="300" y2="370" stroke={BUILDING} strokeWidth="0.8" strokeDasharray="16 10" />

      {/* Underground mains */}
      {[300, 318, 336].map((y, i) => (
        <line
          key={y}
          x1="66"
          y1={y}
          x2="574"
          y2={y - 8}
          stroke={accent}
          strokeWidth="1.6"
          strokeDasharray={i === 1 ? "14 7" : "6 5"}
          opacity="0.9"
          className="animate-[dashflow_1.6s_linear_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Manholes + chambers */}
      {[120, 210, 390, 480].map((x) => (
        <g key={x}>
          <circle cx={x} cy="298" r="9" fill="#0a1220" stroke={accent} strokeWidth="1.4" />
          <circle cx={x} cy="298" r="3" fill={accent} />
        </g>
      ))}
      <rect x="330" y="286" width="22" height="24" fill="#0a1220" stroke={accent} strokeWidth="1.4" />
      <line x1="334" y1="298" x2="348" y2="298" stroke={accent} strokeWidth="0.8" />

      {/* Transformer feeding LV */}
      <rect x="90" y="198" width="34" height="34" fill="#0a1220" stroke={accent} strokeWidth="1.4" />
      <path d="M98 206 L116 224 M116 206 L98 224" stroke={accent} strokeWidth="1" />
      <path d="M107 196 v-12 a14 14 0 0 1 14 0 v12" fill="none" stroke={NEUTRAL} strokeWidth="1" strokeDasharray="4 3" />

      {/* Connection runs on surface */}
      <path d="M120 300 q30 -20 40 0 M150 300 q20 -12 30 0 M402 300 q30 -20 40 0 M432 300 q20 -12 30 0" fill="none" stroke={NEUTRAL} strokeWidth="0.8" strokeDasharray="3 4" />
    </g>
  );
}

/* ── 06 · FINISHING — raw shell becoming finished architecture ── */

function FinishingTransform({ accent, uid }: { accent: string; uid: string }) {
  const stages = [
    { x: 74, fill: "none", glow: false },
    { x: 200, fill: "hatch", glow: false },
    { x: 326, fill: "flat", glow: false },
    { x: 452, fill: "flat", glow: true },
  ];
  return (
    <g>
      <line x1="30" y1="360" x2="610" y2="360" stroke={BUILDING} strokeWidth="1.2" />
      {stages.map((s, i) => (
        <g key={i}>
          {s.glow && <ellipse cx={s.x + 50} cy="250" rx="70" ry="80" fill={`url(#${uid}-glow)`} />}
          <rect x={s.x} y="150" width="100" height="210" fill={s.fill === "flat" ? "#101b2c" : "#0a1220"} stroke={i === 3 ? accent : BUILDING} strokeWidth={i === 3 ? 1.8 : 1.2} />
          {s.fill === "hatch" && <rect x={s.x} y="150" width="100" height="210" fill={`url(#${uid}-hatch)`} opacity="0.7" />}
          <path d={`M${s.x} 150 l50 -48 50 48`} fill={s.fill === "flat" ? "#101b2c" : "none"} stroke={i === 3 ? accent : BUILDING} strokeWidth={i === 3 ? 1.6 : 1.1} />
          {i >= 2 && (
            <>
              <rect x={s.x + 22} y="220" width="56" height="140" fill="none" stroke={NEUTRAL} strokeWidth="1" />
              <rect x={s.x + 36} y="236" width="20" height="30" fill={accent} opacity="0.55" />
              <rect x={s.x + 36} y="284" width="20" height="30" fill={accent} opacity="0.35" />
            </>
          )}
          {/* stage chip */}
          <rect x={s.x + 30} y="392" width="22" height="14" fill="none" stroke={i === 3 ? accent : NEUTRAL} strokeWidth="0.8" />
          <text x={s.x + 41} y="403" fill={i === 3 ? accent : NEUTRAL} fontSize="9" fontFamily="ui-monospace,monospace" textAnchor="middle">
            {String(i + 1).padStart(2, "0")}
          </text>
          {i < 3 && (
            <path d={`M${s.x + 112} 256 l12 -9 -12 -9`} fill="none" stroke={NEUTRAL} strokeWidth="1.4" />
          )}
        </g>
      ))}
    </g>
  );
}

/* ── 07 · MECHANICAL — building becomes transparent, systems visible ── */

function MepSystems({ accent }: { accent: string }) {
  return (
    <g>
      <line x1="30" y1="382" x2="610" y2="382" stroke={BUILDING} strokeWidth="1.2" />
      <rect x="140" y="78" width="280" height="304" fill="#0a1220" stroke={BUILDING} strokeWidth="1.2" />

      {/* Core riser */}
      <rect x="240" y="92" width="46" height="286" fill="none" stroke={accent} strokeWidth="1.6" />
      <line x1="249" y1="92" x2="249" y2="378" stroke={accent} strokeWidth="0.7" />
      <line x1="277" y1="92" x2="277" y2="378" stroke={accent} strokeWidth="0.7" />

      {/* Supply ducts + diffusers */}
      {[120, 200, 280].map((y) => (
        <g key={y}>
          <line x1="140" y1={y} x2="240" y2={y} stroke={accent} strokeWidth="1.2" />
          <line x1="286" y1={y} x2="420" y2={y} stroke={accent} strokeWidth="1.2" />
          <rect x="176" y={y - 4} width="14" height="8" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
          <rect x="366" y={y - 4} width="14" height="8" fill="none" stroke={NEUTRAL} strokeWidth="0.8" />
        </g>
      ))}

      {/* Fire main + sprinklers */}
      <line x1="140" y1="156" x2="420" y2="156" stroke={accent} strokeWidth="1.8" strokeDasharray="12 4" />
      {[168, 206, 244].map((x) => (
        <g key={x}>
          <line x1={x} y1="156" x2={x} y2="168" stroke={NEUTRAL} strokeWidth="0.7" />
          <circle cx={x} cy="172" r="4" fill="none" stroke={accent} strokeWidth="1.2" />
        </g>
      ))}

      {/* Plumbing riser */}
      <rect x="404" y="120" width="12" height="258" fill="none" stroke={NEUTRAL} strokeWidth="1.1" />
      <line x1="410" y1="300" x2="340" y2="378" stroke={NEUTRAL} strokeWidth="1" strokeDasharray="6 4" />
      <line x1="410" y1="330" x2="470" y2="378" stroke={NEUTRAL} strokeWidth="1" strokeDasharray="6 4" />

      {/* Mechanical room */}
      <rect x="140" y="330" width="100" height="52" fill="#0a1220" stroke={accent} strokeWidth="1.2" />
      <circle cx="190" cy="356" r="16" fill="none" stroke={accent} strokeWidth="1.3" />
      <path d="M190 346 a10 10 0 0 1 0 20 M190 336 v-6 M190 376 v-6" fill="none" stroke={accent} strokeWidth="0.9" />
    </g>
  );
}

/* ── 08 · ELECTRICAL — power distribution activating through the building ── */

function PowerDist({ accent }: { accent: string }) {
  return (
    <g>
      <line x1="30" y1="382" x2="610" y2="382" stroke={BUILDING} strokeWidth="1.2" />
      <rect x="150" y="78" width="260" height="304" fill="#0a1220" stroke={BUILDING} strokeWidth="1.2" />

      {/* Busbar riser */}
      <line x1="280" y1="96" x2="280" y2="330" stroke={accent} strokeWidth="3" />
      {[120, 150, 180, 210, 240, 270].map((y) => (
        <line key={y} x1="272" y1={y} x2="288" y2={y} stroke={accent} strokeWidth="0.8" />
      ))}

      {/* Floor distribution panels + feeds */}
      {[120, 190, 260].map((y) => (
        <g key={y}>
          <rect x="248" y={y} width="20" height="26" fill="#0a1220" stroke={accent} strokeWidth="1.2" />
          <line x1="248" y1={y + 8} x2="236" y2={y + 8} stroke={NEUTRAL} strokeWidth="0.8" />
          <line x1="268" y1={y + 8} x2="280" y2={y + 8} stroke={NEUTRAL} strokeWidth="0.8" />
          <line x1="268" y1={y + 18} x2="366" y2={y + 18} stroke={accent} strokeWidth="1.1" />
          <circle cx="374" cy={y + 18} r="8" fill="none" stroke={accent} strokeWidth="1.3" />
          <line x1="374" y1={y + 13} x2="374" y2={y + 23} stroke={accent} strokeWidth="1" />
          <circle cx="222" cy={y + 18} r="4" fill={accent} className="animate-pulse" />
        </g>
      ))}

      {/* Main switchboard */}
      <rect x="216" y="316" width="128" height="52" fill="#0a1220" stroke={accent} strokeWidth="1.6" />
      <line x1="216" y1="340" x2="344" y2="340" stroke={BUILDING} strokeWidth="0.8" />
      {[248, 280, 312].map((x) => (
        <line key={x} x1={x} y1="326" x2={x} y2="336" stroke={NEUTRAL} strokeWidth="1" />
      ))}
      <path d="M344 340 v42" stroke={accent} strokeWidth="2" />
      <line x1="280" y1="96" x2="280" y2="316" stroke={accent} strokeWidth="0.6" strokeDasharray="4 5" />
    </g>
  );
}

/* ── 09 · SOLAR — panels activate, energy flows into the building ── */

function EnergyFlow({ accent, uid }: { accent: string; uid: string }) {
  return (
    <g>
      <line x1="30" y1="386" x2="610" y2="386" stroke={BUILDING} strokeWidth="1.2" />

      {/* Sun arcs */}
      <g transform="translate(96,110)">
        <path d="M0 -30 A30 30 0 0 1 30 0" fill="none" stroke={accent} strokeWidth="1.4" />
        <line x1="-8" y1="-34" x2="-14" y2="-44" stroke={accent} strokeWidth="1.2" />
        <line x1="8" y1="-34" x2="14" y2="-44" stroke={accent} strokeWidth="1.2" />
        <line x1="34" y1="-8" x2="44" y2="-14" stroke={accent} strokeWidth="1.2" />
      </g>

      {/* Building */}
      <rect x="250" y="220" width="200" height="166" fill="#0a1220" stroke={BUILDING} strokeWidth="1.2" />
      <path d="M250 220 l100 -56 100 56" fill="none" stroke={BUILDING} strokeWidth="1.2" />
      {[250, 290, 330, 370].map((x) => (
        <rect key={x} x={x} y="248" width="12" height="18" fill={accent} opacity="0.5" />
      ))}
      <line x1="300" y1="344" x2="400" y2="344" stroke={BUILDING} strokeWidth="0.8" />
      <line x1="300" y1="382" x2="400" y2="382" stroke={BUILDING} strokeWidth="0.8" />

      {/* Panels on roof */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={272 + i * 52}
            y="142"
            width="46"
            height="12"
            transform={`rotate(-18 ${272 + i * 52} 148)`}
            fill="#101b2c"
            stroke={accent}
            strokeWidth="1.2"
          />
          <line x1={276 + i * 52} y1="139" x2={312 + i * 52} y2="129" stroke={accent} strokeWidth="0.6" />
          <line x1={284 + i * 52} y1="152" x2={320 + i * 52} y2="142" stroke={accent} strokeWidth="0.6" />
        </g>
      ))}

      {/* Energy flow path */}
      <path
        d="M296 158 q-10 40 -14 66"
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeDasharray="8 6"
        className="animate-[dashflow_0.9s_linear_infinite]"
      />
      <circle cx="284" cy="230" r="10" fill="none" stroke={accent} strokeWidth="1.3" />
      <line x1="284" y1="240" x2="284" y2="262" stroke={accent} strokeWidth="1.6" />
      <line x1="274" y1="270" x2="294" y2="270" stroke={accent} strokeWidth="2.2" />
      <rect x="258" y="272" width="44" height="24" fill="#0a1220" stroke={accent} strokeWidth="1.1" />
      <circle cx="280" cy="284" r="3" fill={accent} className="animate-pulse" />
      <path d="M302 284 h24" stroke={accent} strokeWidth="1.4" />
      <circle cx="332" cy="284" r="4" fill={accent} className="animate-pulse" />

      {/* Glow behind panels */}
      <ellipse cx="350" cy="150" rx="120" ry="54" fill={`url(#${uid}-glow)`} opacity="0.5" />
    </g>
  );
}
