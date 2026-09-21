"use client";

import { ENGINEERING_LAYERS } from "@/data/engineering-core";
import type { EngineeringLayerId } from "@/data/engineering-core";

/**
 * Premium CSS/SVG fallback used when WebGL is unavailable or the device
 * is low-end. A stylized building cross-section with layered overlays
 * that reveal the active engineering system. Same data, same controls.
 */
export function EngineeringFallback({
  activeLayer,
}: {
  activeLayer: EngineeringLayerId;
}) {
  const layer = ENGINEERING_LAYERS.find((l) => l.id === activeLayer);
  const color = layer?.accentColor ?? "#7cc0ff";

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <svg
        viewBox="0 0 320 340"
        className="h-full max-h-full w-auto"
        role="img"
        aria-label="ARBEC engineering layers diagram"
      >
        <defs>
          <linearGradient id="fb-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101c2e" />
            <stop offset="100%" stopColor="#060a12" />
          </linearGradient>
          <pattern id="fb-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0v20" fill="none" stroke="#1c2a3e" strokeWidth="0.6" />
          </pattern>
        </defs>

        <rect width="320" height="340" fill="url(#fb-sky)" />
        <rect width="320" height="340" fill="url(#fb-grid)" />

        {/* Ground line */}
        <line x1="10" y1="296" x2="310" y2="296" stroke="#2b5278" strokeWidth="1" />

        {/* Building shell */}
        <rect
          x="90"
          y="70"
          width="140"
          height="226"
          fill="rgba(124,192,255,0.06)"
          stroke={activeLayer === "architecture" ? color : "#2b5278"}
          strokeWidth={activeLayer === "architecture" ? 2 : 1.2}
          className="transition-[stroke,stroke-width] duration-500"
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
            opacity={0.6}
          />
        ))}
        <line x1="160" y1="70" x2="160" y2="296" stroke="#2b5278" strokeWidth="0.8" opacity={0.6} />

        {/* Layer overlays (cross-section of systems inside the shell) */}
        {activeLayer !== "architecture" && (
          <g className="transition-opacity duration-500" style={{ color }}>
            {activeLayer === "civil" && (
              <>
                <line x1="100" y1="90" x2="100" y2="290" stroke={color} strokeWidth="2" />
                <line x1="220" y1="90" x2="220" y2="290" stroke={color} strokeWidth="2" />
                <line x1="100" y1="85" x2="220" y2="85" stroke={color} strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="100"
                    y1={110 + i * 45}
                    x2="220"
                    y2={110 + i * 45}
                    stroke={color}
                    strokeWidth="1.4"
                    strokeDasharray="4 3"
                  />
                ))}
              </>
            )}
            {activeLayer === "hvac" && (
              <>
                <rect x="98" y="120" width="10" height="170" fill={color} opacity="0.5" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <line
                      x1="108"
                      y1={135 + i * 45}
                      x2="180"
                      y2={135 + i * 45}
                      stroke={color}
                      strokeWidth="1.6"
                    />
                    <circle cx="150" cy={135 + i * 45} r="3" fill={color} className="motion-safe:animate-pulse" />
                  </g>
                ))}
              </>
            )}
            {activeLayer === "electrical" && (
              <>
                <line x1="170" y1="95" x2="170" y2="290" stroke={color} strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <line x1="170" y1={125 + i * 45} x2="150" y2={125 + i * 45} stroke={color} strokeWidth="1.4" />
                    <circle cx="150" cy={125 + i * 45} r="2.5" fill={color} className="motion-safe:animate-pulse" />
                  </g>
                ))}
                <circle cx="215" cy="150" r="4" fill={color} />
              </>
            )}
            {activeLayer === "plumbing" && (
              <>
                <line x1="120" y1="130" x2="120" y2="290" stroke={color} strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <line x1="120" y1={160 + i * 45} x2="210" y2={160 + i * 45} stroke={color} strokeWidth="1.4" strokeDasharray="6 2" />
                    <circle cx="160" cy={160 + i * 45} r="2.5" fill={color} className="motion-safe:animate-pulse" />
                  </g>
                ))}
              </>
            )}
            {activeLayer === "fire" && (
              <>
                <line x1="200" y1="150" x2="200" y2="290" stroke={color} strokeWidth="2" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <g key={i}>
                    <line x1="105" y1={175 + i * 30} x2="200" y2={175 + i * 30} stroke={color} strokeWidth="1.4" />
                    <rect x={105} y={175 + i * 30 - 1.5} width="6" height="3" fill={color} />
                  </g>
                ))}
              </>
            )}
            {activeLayer === "infrastructure" && (
              <g>
                {[135, 160, 185, 210].map((y, i) => (
                  <line
                    key={i}
                    x1={90 + (i % 2) * 15}
                    y1="296"
                    x2={260 + (i % 2) * 10}
                    y2={y}
                    stroke={color}
                    strokeWidth="1.6"
                    strokeDasharray="7 4"
                    className="motion-safe:animate-[dashflow_1.4s_linear_infinite]"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </g>
            )}
            {activeLayer === "solar" && (
              <g>
                {[125, 145, 165].map((yy, i) => (
                  <g key={i}>
                    <rect x={115} y={yy} width="26" height="8" fill="none" stroke={color} strokeWidth="1.4" />
                    <line x1="116" y1={yy + 4} x2="139" y2={yy + 4} stroke={color} strokeWidth="0.8" />
                  </g>
                ))}
                <line x1="160" y1="70" x2="160" y2="110" stroke={color} strokeWidth="2" />
                <circle cx="160" cy="110" r="2.5" fill={color} className="motion-safe:animate-pulse" />
              </g>
            )}
          </g>
        )}

        {/* Shadow */}
        <ellipse cx="160" cy="300" rx="78" ry="8" fill="#0a1220" opacity="0.8" />
      </svg>
    </div>
  );
}
