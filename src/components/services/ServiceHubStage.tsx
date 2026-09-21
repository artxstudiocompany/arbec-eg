"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { isReducedMotion } from "@/lib/motion";
import type { Direction } from "@/lib/direction-context";
import type { LocalizedService } from "@/data/services";
import { SERVICE_ACCENTS } from "./ServiceVisual";
import type { ServiceHubDict } from "./types";

gsap.registerPlugin(ScrollTrigger);

type Pos = { x: number; y: number };

function nodePos(index: number, total: number, dir: Direction): Pos {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  const x = 50 + 36 * Math.cos(angle);
  const y = 50 + 40 * Math.sin(angle);
  return dir === "rtl" ? { x: 100 - x, y } : { x, y };
}

/**
 * SERVICE HUB — the desktop engineering system.
 * Service "nodes" radiate around a central building core, each tied to the
 * hub by a connection line. Selecting a node activates its connection, reacts
 * the core, and dims the other modules.
 */
export function ServiceHubStage({
  services,
  activeIndex,
  dict,
  dir,
  reduced,
  onSelect,
}: {
  services: LocalizedService[];
  activeIndex: number;
  dict: ServiceHubDict;
  dir: Direction;
  reduced: boolean;
  onSelect: (index: number) => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const active = services[activeIndex];
  const activeAccent = active ? SERVICE_ACCENTS[active.visual] : undefined;

  useGSAP(
    () => {
      const el = innerRef.current;
      if (!el) return;
      if (reduced || isReducedMotion()) return;
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.96, filter: "blur(8px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
    },
    { scope: innerRef, dependencies: [reduced] },
  );

  if (!active || !activeAccent) return null;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el || reduced || isReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.rotate = `${ny * -0.35}deg`;
  };

  const onPointerLeave = () => {
    const el = innerRef.current;
    if (el) el.style.rotate = "0deg";
  };

  const positions = services.map((_, i) => nodePos(i, services.length, dir));

  return (
    <div
      ref={innerRef}
      id="services-hub"
      className="relative aspect-[10/9] w-full select-none overflow-hidden rounded-2xl border border-line bg-ink-900/60"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      role="group"
      aria-label={dict.hub}
    >
      {/* Ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_70%_at_50%_50%,rgba(77,163,255,0.08),transparent_65%)]"
      />

      {/* Connection lines — node to central core */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {positions.map((p, i) => {
          const isActive = i === activeIndex;
          const accent = SERVICE_ACCENTS[services[i].visual];
          return (
            <line
              key={services[i].slug}
              x1={p.x * 100}
              y1={p.y * 100}
              x2="50"
              y2="50"
              stroke={isActive ? accent : "#2b5278"}
              strokeWidth={isActive ? 0.9 : 0.45}
              strokeDasharray={isActive ? "7 5" : "3 5"}
              opacity={isActive ? 0.95 : 0.35}
              className="transition-all duration-500"
            />
          );
        })}
      </svg>

      {/* Central core */}
      <div className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed sm:h-64 sm:w-64"
          style={{
            borderColor: `color-mix(in srgb, ${activeAccent} 35%, transparent)`,
          }}
        />
        <HubCore accent={activeAccent} />
        <div className="mt-4 flex flex-col items-center gap-1">
          <span className="text-ar-mono tracking-[0.26em] text-fg-subtle">
            {dict.systemLabel} / {String(active.number).padStart(2, "0")}
          </span>
          <span
            className="max-w-[10rem] truncate text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: activeAccent }}
          >
            {active.nodeLabel}
          </span>
        </div>
        {/* Active index reading */}
        <div className="mt-2 flex items-center gap-2 text-ar-mono text-2xs tracking-[0.24em] text-fg-subtle">
          <span aria-hidden className="inline-block size-1.5 rounded-full" style={{ background: activeAccent }} />
          {String(active.number).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
        </div>
      </div>

      {/* Nodes */}
      {services.map((service, i) => {
        const p = positions[i];
        const isActive = i === activeIndex;
        const accent = SERVICE_ACCENTS[service.visual];
        return (
          <button
            key={service.slug}
            type="button"
            onClick={() => onSelect(i)}
            aria-pressed={isActive}
            aria-label={`${String(service.number).padStart(2, "0")} — ${service.title}`}
            className={cn(
              "absolute z-20 flex w-[7rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg border bg-ink-950/70 py-2 backdrop-blur-sm transition-all duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-400 sm:w-32",
              isActive
                ? "scale-105 border-current/40"
                : "border-line opacity-40 hover:scale-105 hover:border-current/40 hover:opacity-90",
            )}
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                color: accent,
              } as CSSProperties
            }
          >
            <span className="text-ar-mono text-[10px] tracking-[0.28em]" style={{ color: accent }}>
              {String(service.number).padStart(2, "0")}
            </span>
            <span className="px-1 text-center text-[10px] font-semibold uppercase leading-tight tracking-[0.14em] text-fg sm:text-[11px]">
              {service.nodeLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function HubCore({ accent }: { accent: string }) {
  return (
    <svg
      viewBox="0 0 120 130"
      aria-hidden
      className="h-32 w-32 sm:h-44 sm:w-44"
      style={{ filter: `drop-shadow(0 0 18px ${accent}33)` }}
    >
      {/* Shell */}
      <rect x="10" y="12" width="100" height="108" fill="#0a1322" stroke="#2b5278" strokeWidth="1.1" />
      {/* Floor lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="10"
          y1={32 + i * 20}
          x2="110"
          y2={32 + i * 20}
          stroke="#2b5278"
          strokeWidth="0.7"
        />
      ))}
      {/* Core shaft */}
      <rect x="52" y="12" width="16" height="108" fill="none" stroke="#2b5278" strokeWidth="0.8" strokeDasharray="3 3" />
      {/* Active slabs */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="10"
          y1={32 + i * 20}
          x2="110"
          y2={32 + i * 20}
          stroke={accent}
          strokeWidth="1.4"
          opacity="0.85"
          className="transition-colors duration-500"
        />
      ))}
      {/* Plinth */}
      <rect x="4" y="112" width="112" height="14" fill={accent} opacity="0.9" />
      <line x1="4" y1="112" x2="116" y2="112" stroke={accent} strokeWidth="1.4" />
      {/* Foundation ticks */}
      {[24, 44, 64, 84].map((x) => (
        <line key={x} x1={x} y1="112" x2={x} y2="118" stroke="#0a1322" strokeWidth="1.2" />
      ))}
    </svg>
  );
}
