"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { INFRASTRUCTURE_SYSTEMS } from "@/data/infrastructure";
import type { InfraSystemId, InfraNodeKind } from "@/data/infrastructure";

/**
 * ENGINEERING SECTION — the same infrastructure data rendered as a premium
 * 2D sectional diagram. Serves two roles: the WebGL fallback (desktop) and
 * the dedicated mobile visual composition. No measurements or depths are
 * displayed — network depth is purely a compositing offset.
 */

const GROUND_Y = 300;
const PX = (x: number) => 320 + x * 34;
const PY = (depth: number) => GROUND_Y + Math.abs(depth) * 30;

const FLOW_ANIM = {
  stream: { dur: 1.5, dash: "10 6", width: 2.2 },
  pulse: { dur: 0.9, dash: "6 8", width: 2.4 },
  directional: { dur: 2.2, dash: "14 8", width: 2.2 },
  branches: { dur: 1.8, dash: "8 5", width: 2 },
  energy: { dur: 1.1, dash: "5 5", width: 2.6 },
  signal: { dur: 1.3, dash: "3 6", width: 1.5 },
} as const;

export function InfrastructureSectionSvg({
  activeId,
  revealed,
  className,
}: {
  activeId: InfraSystemId | null;
  revealed: boolean;
  className?: string;
}) {
  const uid = useId().replace(/[:]/g, "");

  return (
    <svg
      viewBox="0 0 640 420"
      role="img"
      aria-hidden
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101c2e" />
          <stop offset="100%" stopColor="#060a12" />
        </linearGradient>
        <pattern id={`${uid}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#16233a" strokeWidth="0.6" />
        </pattern>
        <pattern id={`${uid}-hatch`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#22314a" strokeWidth="1" />
        </pattern>
        <pattern id={`${uid}-soil`} width="34" height="10" patternUnits="userSpaceOnUse">
          <line x1="0" y1="5" x2="34" y2="5" stroke="#182741" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="640" height="420" fill={`url(#${uid}-sky)`} />
      <rect width="640" height="420" fill={`url(#${uid}-grid)`} opacity="0.6" />

      {/* ── Above ground ─────────────────────────────────────── */}
      <line x1="24" y1={GROUND_Y} x2="616" y2={GROUND_Y} stroke="#2b5278" strokeWidth="1.4" />
      <rect x="24" y={GROUND_Y} width="592" height="16" fill="#0d1826" />
      <rect x="24" y={GROUND_Y} width="592" height="16" fill={`url(#${uid}-hatch)`} opacity="0.4" />

      <g opacity={0.96}>
        <rect x={PX(-0.6) - 10} y={GROUND_Y - 8} width={PX(2) - PX(-0.6) + 20} height="10" fill="#223042" />
        <rect x={PX(0.7) - 44} y={GROUND_Y - 88} width="88" height="82" fill="rgba(124,192,255,0.07)" stroke="#7cc0ff" strokeWidth="1.4" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={PX(0.7) - 44}
            y1={GROUND_Y - 66 + i * 18}
            x2={PX(0.7) + 44}
            y2={GROUND_Y - 66 + i * 18}
            stroke="#5f7fa0"
            strokeWidth="2"
          />
        ))}
        <rect x={PX(0.7) - 8} y={GROUND_Y - 96} width="16" height="9" fill="#5f7fa0" />
      </g>

      <Tree x={PX(-3.1)} y={GROUND_Y} />
      <Tree x={PX(3.3)} y={GROUND_Y} />

      {/* ── Underground band ─────────────────────────────────── */}
      <rect x="24" y={GROUND_Y} width="592" height="110" fill={`url(#${uid}-soil)`} />

      <g className="transition-opacity duration-700" style={{ opacity: revealed ? 1 : 0 }}>
        {INFRASTRUCTURE_SYSTEMS.map((system) => {
          const isCurrent = activeId === system.id;
          const active = revealed && isCurrent;
          const subdued = revealed && activeId !== null && !isCurrent;
          const stroke = active ? system.accent : system.dim;
          const strokeWidth = FLOW_ANIM[system.flow].width;

          return (
            <g key={system.id} opacity={active ? 1 : subdued ? 0.4 : 0.5}>
              {system.routes.map((route, r) => {
                const d = route.points.map((p, pi) => `${pi === 0 ? "M" : "L"}${PX(p.x).toFixed(1)},${PY(p.depth).toFixed(1)}`).join(" ");
                return (
                  <path
                    key={`${system.id}-r${r}`}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray={FLOW_ANIM[system.flow].dash}
                    style={active ? { animation: `dashflow ${FLOW_ANIM[system.flow].dur}s linear infinite` } : undefined}
                  />
                );
              })}
              {system.nodes.map((node, ni) => (
                <NodeSymbol key={`${system.id}-n${ni}`} kind={node.kind} x={PX(node.pos.x)} y={PY(node.pos.depth)} color={stroke} />
              ))}
            </g>
          );
        })}
      </g>

      {/* Legend key — system numbers */}
      <g opacity={0.7}>
        {INFRASTRUCTURE_SYSTEMS.map((system, idx) => (
          <g key={system.id} transform={`translate(${40 + idx * 92}, 398)`}>
            <circle cx="4" cy="4" r="3.5" fill={activeId === system.id ? system.accent : "none"} stroke={system.accent} strokeWidth="1.2" />
            <text x="12" y="7" fill="#9aa6b8" fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="1">
              {String(idx + 1).padStart(2, "0")}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

function Tree({ x, y }: { x: number; y: number }) {
  return (
    <g opacity={0.85}>
      <rect x={x - 2} y={y - 12} width="4" height="12" fill="#2a3a45" />
      <circle cx={x} cy={y - 17} r="9" fill="#1e4a3d" />
    </g>
  );
}

const NODE_SYMBOLS: Record<InfraNodeKind, (x: number, y: number, color: string) => ReactNode> = {
  manhole: (x, y, color) => (
    <>
      <circle cx={x} cy={y} r="6.5" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <circle cx={x} cy={y} r="2.5" fill={color} />
    </>
  ),
  inspection: (x, y, color) => (
    <>
      <circle cx={x} cy={y} r="9" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <circle cx={x} cy={y} r="4" fill="none" stroke={color} strokeWidth="1.4" />
    </>
  ),
  transformer: (x, y, color) => (
    <>
      <rect x={x - 8} y={y - 6} width="16" height="12" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <line x1={x - 4} y1={y - 2} x2={x + 4} y2={y + 2} stroke={color} strokeWidth="1.3" />
      <line x1={x + 4} y1={y - 2} x2={x - 4} y2={y + 2} stroke={color} strokeWidth="1.3" />
    </>
  ),
  rmu: (x, y, color) => (
    <>
      <rect x={x - 6} y={y - 6} width="12" height="12" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke={color} strokeWidth="1.3" />
    </>
  ),
  panel: (x, y, color) => (
    <>
      <rect x={x - 4} y={y - 11} width="8" height="22" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <circle cx={x} cy={y - 6} r="1.4" fill={color} />
      <circle cx={x} cy={y} r="1.4" fill={color} />
      <circle cx={x} cy={y + 6} r="1.4" fill={color} />
    </>
  ),
  junction: (x, y, color) => (
    <>
      <rect x={x - 3.5} y={y - 3.5} width="7" height="7" rx="1.5" fill="rgba(6,10,18,0.7)" stroke={color} strokeWidth="1.4" />
      <circle cx={x} cy={y} r="1.4" fill={color} />
    </>
  ),
};

function NodeSymbol({ kind, x, y, color }: { kind: InfraNodeKind; x: number; y: number; color: string }) {
  const render = NODE_SYMBOLS[kind];
  return <>{render(x, y, color)}</>;
}