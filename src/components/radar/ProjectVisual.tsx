import type { ProjectCategory } from "@/data/projects";

/** Per-category drawing accent — mirrors the palette used across the site. */
export const CATEGORY_ACCENTS: Record<ProjectCategory, string> = {
  caravan: "#7cc0ff",
  civil: "#94a3b8",
  finishing: "#dbb98a",
  infrastructure: "#6ee7d8",
  solar: "#f0b24a",
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  caravan: "CARAVANS",
  civil: "CIVIL",
  finishing: "FINISHING",
  infrastructure: "NETWORKS",
  solar: "SOLAR",
};

/**
 * Engineered SVG artwork — schematic, never photography. Each category gets
 * a technical drawing (plan/elevation/section) drawn as line art on the
 * blueprint grid, so every project carries a distinct verified visual
 * without inventing imagery.
 */
export function ProjectVisual({
  category,
  className,
}: {
  category: ProjectCategory;
  className?: string;
}) {
  const accent = CATEGORY_ACCENTS[category];

  return (
    <svg
      viewBox="0 0 800 520"
      className={className}
      aria-hidden
    >
      <defs>
        <pattern id="pv-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#1c2a3e" strokeWidth="0.5" />
        </pattern>
        <pattern
          id="pv-hatch"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="8" stroke={accent} strokeWidth="0.6" opacity="0.5" />
        </pattern>
        <linearGradient id="pv-vignette" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1220" />
          <stop offset="100%" stopColor="#060a12" />
        </linearGradient>
      </defs>

      <rect width="800" height="520" fill="url(#pv-vignette)" />
      <rect width="800" height="520" fill="url(#pv-grid)" />

      {/* sheet frame */}
      <rect
        x="16"
        y="16"
        width="768"
        height="488"
        fill="none"
        stroke={accent}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M16 16h80 M704 16h80 M16 504h80 M704 504h80"
        stroke={accent}
        strokeWidth="2"
        opacity="0.7"
      />

      {category === "caravan" && <CaravanDrawing accent={accent} />}
      {category === "civil" && <CivilDrawing accent={accent} />}
      {category === "finishing" && <FinishingDrawing accent={accent} />}
      {category === "infrastructure" && <InfrastructureDrawing accent={accent} />}
      {category === "solar" && <SolarDrawing accent={accent} />}
    </svg>
  );
}

function CaravanDrawing({ accent }: { accent: string }) {
  return (
    <g stroke={accent}>
      {/* ground line */}
      <line
        x1="80"
        y1="400"
        x2="720"
        y2="400"
        strokeWidth="1.5"
      />
      {/* three caravan units */}
      {[0, 1, 2].map((i) => {
        const x = 120 + i * 190;
        return (
          <g key={i}>
            <rect
              x={x}
              y={200}
              width="160"
              height="200"
              fill={`${accent}10`}
              strokeWidth="2"
            />
            {/* shed roof */}
            <path
              d={`M${x - 10} 200 L${x + 80} 150 L${x + 170} 200`}
              fill={`${accent}08`}
              strokeWidth="2"
            />
            {/* windows */}
            {[0, 1].map((w) => (
              <rect
                key={w}
                x={x + 24 + w * 72}
                y={250}
                width="48"
                height="36"
                fill="url(#pv-hatch)"
                strokeWidth="1"
              />
            ))}
            {/* entrance door */}
            <rect
              x={x + 116}
              y={300}
              width="34"
              height="100"
              fill="none"
              strokeWidth="1.5"
            />
            {/* wheel skirt */}
            <path
              d={`M${x + 10} 400 l18 -24 h104 l18 24`}
              fill="none"
              strokeWidth="1.5"
            />
            <line x1={x + 34} y1="390" x2={x + 34} y2="404" strokeWidth="1.5" />
            <line x1={x + 126} y1="390" x2={x + 126} y2="404" strokeWidth="1.5" />
            {/* dimension */}
            <line x1={x} y1="124" x2={x} y2="176" strokeWidth="0.8" opacity="0.5" />
            <line x1={x + 160} y1="124" x2={x + 160} y2="176" strokeWidth="0.8" opacity="0.5" />
            <line x1={x} y1="150" x2={x} y2="176" strokeWidth="1" />
            <line x1={x + 160} y1="150" x2={x + 160} y2="176" strokeWidth="1" />
          </g>
        );
      })}
      {/* site tag */}
      <text
        x="400"
        y="452"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="3"
        opacity="0.7"
      >
        SITE LAYOUT — CARAVAN WING
      </text>
      <text
        x="400"
        y="476"
        textAnchor="middle"
        fill={accent}
        fontSize="11"
        opacity="0.45"
      >
        PLAN · SHEET A-12 · 1:100
      </text>
    </g>
  );
}

function CivilDrawing({ accent }: { accent: string }) {
  return (
    <g stroke={accent}>
      {/* ground + foundation */}
      <line x1="80" y1="420" x2="720" y2="420" strokeWidth="1.5" />
      <line x1="120" y1="420" x2="120" y2="460" strokeWidth="1.5" />
      <line x1="680" y1="420" x2="680" y2="460" strokeWidth="1.5" />
      <rect
        x="120"
        y="402"
        width="560"
        height="18"
        fill={`${accent}14`}
        strokeWidth="1.5"
      />
      {/* column grid */}
      {[200, 360, 520].map((x) => (
        <g key={x}>
          <rect
            x={x - 22}
            y={180}
            width="44"
            height="222"
            fill={`${accent}0d`}
            strokeWidth="2"
          />
          {[2, 3, 4, 5].map((r) => (
            <line
              key={r}
              x1={x - 16}
              y1={180 + r * 38}
              x2={x + 16}
              y2={180 + r * 38}
              strokeWidth="0.8"
              opacity="0.5"
            />
          ))}
        </g>
      ))}
      {/* roof/floor slabs */}
      {[140, 330, 520].map((y) => (
        <rect
          key={y}
          x="140"
          y={y}
          width="520"
          height="14"
          fill={`${accent}12`}
          strokeWidth="2"
        />
      ))}
      {/* rebar hatch in the transfer beam area */}
      <rect
        x="260"
        y="352"
        width="280"
        height="14"
        fill="url(#pv-hatch)"
        strokeWidth="1"
        opacity="0.8"
      />
      {/* dimension string */}
      <line x1="200" y1="92" x2="200" y2="124" strokeWidth="0.8" opacity="0.5" />
      <line x1="520" y1="92" x2="520" y2="124" strokeWidth="0.8" opacity="0.5" />
      <line x1="200" y1="108" x2="520" y2="108" strokeWidth="1" />
      <text
        x="360"
        y="100"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="2"
      >
        L = 32000
      </text>
      <text
        x="400"
        y="500"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="3"
        opacity="0.7"
      >
        STRUCTURAL FRAME — ELEVATION
      </text>
      <text
        x="400"
        y="90"
        textAnchor="middle"
        fill={accent}
        fontSize="11"
        opacity="0.45"
      >
        RC COLUMNS · SLABS · FOUNDATIONS
      </text>
    </g>
  );
}

function FinishingDrawing({ accent }: { accent: string }) {
  return (
    <g stroke={accent}>
      {/* room outline */}
      <rect x="120" y="120" width="560" height="280" fill={`${accent}08`} strokeWidth="2" />
      {/* ceiling recess + light */}
      <line x1="120" y1="170" x2="680" y2="170" strokeWidth="1" opacity="0.6" />
      <rect x="380" y="118" width="40" height="6" fill={accent} opacity="0.7" />
      {/* dado line */}
      <line x1="120" y1="280" x2="680" y2="280" strokeWidth="1.2" />
      {/* wall panels */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={140 + i * 104}
          y={190}
          width="92"
          height="76"
          fill={`${accent}0c`}
          strokeWidth="1"
        />
      ))}
      {/* tile band above dado */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={140 + i * 104}
          y={296}
          width="92"
          height="24"
          fill="url(#pv-hatch)"
          strokeWidth="0.8"
          opacity="0.75"
        />
      ))}
      {/* flush door */}
      <rect x="560" y="160" width="100" height="200" fill={`${accent}0d`} strokeWidth="1.5" />
      <line x1="624" y1="160" x2="624" y2="360" strokeWidth="1.5" />
      <circle cx="616" cy="300" r="3" fill={accent} />
      {/* floor hatch */}
      <rect
        x="120"
        y="384"
        width="560"
        height="16"
        fill="url(#pv-hatch)"
        strokeWidth="1"
      />
      {/* level datum */}
      <text
        x="400"
        y="500"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="3"
        opacity="0.7"
      >
        INTERIOR ELEVATION — FINISHING WORKS
      </text>
    </g>
  );
}

function InfrastructureDrawing({ accent }: { accent: string }) {
  return (
    <g stroke={accent}>
      {/* ground */}
      <line x1="80" y1="150" x2="720" y2="150" strokeWidth="1.5" />
      {/* trench walls */}
      {[160, 340].map((x) => (
        <path
          key={x}
          d={`M${x} 150 v120`}
          strokeWidth="2"
        />
      ))}
      <line x1="160" y1="270" x2="340" y2="270" strokeWidth="1.5" />
      {/* excavation hatch */}
      <rect x="160" y="150" width="180" height="120" fill="url(#pv-hatch)" opacity="0.6" />
      {/* main pipe */}
      <ellipse cx="200" cy="230" rx="26" ry="30" fill={`${accent}0e`} strokeWidth="2" />
      <line x1="160" y1="218" x2="240" y2="218" strokeWidth="1" opacity="0.6" />
      <line x1="160" y1="242" x2="240" y2="242" strokeWidth="1" opacity="0.6" />
      {/* sewer pipe */}
      <rect x="280" y="214" width="60" height="34" fill={`${accent}0a`} strokeWidth="2" />
      {/* manhole cover */}
      <circle cx="320" cy="150" r="30" fill={`${accent}0c`} strokeWidth="1.5" />
      <circle cx="320" cy="150" r="22" fill="none" strokeWidth="1" opacity="0.6" />
      <line x1="320" y1="120" x2="320" y2="180" strokeWidth="0.8" opacity="0.5" />
      <line x1="290" y1="150" x2="350" y2="150" strokeWidth="0.8" opacity="0.5" />
      {/* flow arrows */}
      <path d="M108 206 l-20 0 m0 0 l8 -6 m-8 6 l8 6" fill="none" strokeWidth="1.4" />
      <path d="M692 206 l20 0 m0 0 l-8 -6 m8 6 l-8 6" fill="none" strokeWidth="1.4" />
      <text
        x="400"
        y="360"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="3"
        opacity="0.7"
      >
        UTILITY TRENCH — SECTION
      </text>
      <text
        x="400"
        y="328"
        textAnchor="middle"
        fill={accent}
        fontSize="11"
        opacity="0.45"
      >
        MAIN LINE · SEWER · MANHOLE
      </text>
    </g>
  );
}

function SolarDrawing({ accent }: { accent: string }) {
  return (
    <g stroke={accent}>
      {/* concrete pad */}
      <rect
        x="140"
        y="368"
        width="520"
        height="34"
        fill={`${accent}10`}
        strokeWidth="2"
      />
      <rect
        x="140"
        y="402"
        width="520"
        height="14"
        fill="url(#pv-hatch)"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* anchor bolts */}
      {[200, 360, 520].map((x) => (
        <g key={x}>
          <rect x={x - 6} y="356" width="12" height="18" fill={accent} opacity="0.7" />
          <line x1={x} y1="356" x2={x} y2="332" strokeWidth="2" />
        </g>
      ))}
      {/* racking posts */}
      {[200, 360, 520].map((x) => (
        <path key={x} d={`M${x} 332 l0 -76`} strokeWidth="2" />
      ))}
      <path d="M200 300 q80 -22 160-0 M360 300 q80 -22 160 0" strokeWidth="1" opacity="0.6" />
      {/* panel rows */}
      {[0, 1].map((r) => (
        <g key={r}>
          {[0, 1, 2].map((c) => (
            <g key={c}>
              <rect
                x={164 + c * 116}
                y={196 + r * 44}
                width="104"
                height="34"
                fill={`${accent}0a`}
                strokeWidth="1.4"
              />
              {/* cell grid */}
              {[0, 1, 2, 3].map((g) => (
                <line
                  key={g}
                  x1={176 + c * 116 + g * 22}
                  y1={202 + r * 44}
                  x2={176 + c * 116 + g * 22}
                  y2={224 + r * 44}
                  strokeWidth="0.5"
                  opacity="0.5"
                />
              ))}
              <line
                x1={170 + c * 116}
                y1={213 + r * 44}
                x2={262 + c * 116}
                y2={213 + r * 44}
                strokeWidth="0.5"
                opacity="0.5"
              />
            </g>
          ))}
        </g>
      ))}
      {/* cable trench */}
      <line x1="140" y1="444" x2="660" y2="444" strokeWidth="1.2" opacity="0.7" strokeDasharray="6 5" />
      <text
        x="400"
        y="504"
        textAnchor="middle"
        fill={accent}
        fontSize="14"
        letterSpacing="3"
        opacity="0.7"
      >
        PV FOUNDATION — RACKING ARRAY
      </text>
      <line x1="400" y1="456" x2="400" y2="486" strokeWidth="0.8" opacity="0.5" />
    </g>
  );
}
