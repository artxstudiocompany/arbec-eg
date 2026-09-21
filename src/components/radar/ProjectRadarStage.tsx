"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NextLink from "next/link";
import { localePath, cn } from "@/lib/utils";
import type { Direction } from "@/lib/direction-context";
import { useReducedMotion } from "@/lib/motion";
import type { LocalizedProject } from "@/data/projects";
import { CATEGORY_ACCENTS, ProjectVisual } from "./ProjectVisual";
import type { ProjectRadarDict } from "./types";

const TOTAL = 8;

/**
 * Desktop immersive stage — the radar viewport showing the active project's
 * engineered schematic, HUD readouts, and project meta. A cinematic
 * 700–1200ms transition animates the swap when the active project changes.
 */
export function ProjectRadarStage({
  project,
  dict,
  locale,
  dir,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onStoreFocus,
  headingLevel = 3,
}: {
  project: LocalizedProject;
  dict: ProjectRadarDict;
  locale: "en" | "ar";
  dir: Direction;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onStoreFocus: () => void;
  headingLevel?: 2 | 3;
}) {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced) return;
      const s = dir === "rtl" ? -1 : 1;
      const tl = gsap.timeline();

      tl.fromTo(
        wipeRef.current,
        { scaleX: 1, transformOrigin: s === -1 ? "left" : "right" },
        { scaleX: 0, duration: 0.35, ease: "power2.in" },
      );
      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        0.25,
      );

      return () => tl.kill();
    },
    { dependencies: [project.slug, reduced, dir], scope: stageRef },
  );

  const accent = CATEGORY_ACCENTS[project.category];
  const categoryLabel = dict.categories[project.category];
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div ref={stageRef} className="relative flex flex-col">
      {/* Viewport */}
      <div className="relative aspect-[16/10] max-h-[68vh] w-full overflow-hidden rounded-2xl border border-line bg-ink-900/60">
        <ProjectVisual
          category={project.category}
          className="h-full w-full"
        />

        {/* Cinematic wipe overlay */}
        <div
          ref={wipeRef}
          aria-hidden
          className={cn("pointer-events-none absolute inset-0 bg-ink-900", reduced && "hidden")}
        />

        {/* HUD corners */}
        <span
          aria-hidden
          className="absolute start-2 top-2 h-3 w-3 border-s border-t border-line-strong"
        />
        <span
          aria-hidden
          className="absolute end-2 top-2 h-3 w-3 border-e border-t border-line-strong"
        />
        <span
          aria-hidden
          className="absolute start-2 bottom-2 h-3 w-3 border-s border-b border-line-strong"
        />
        <span
          aria-hidden
          className="absolute end-2 bottom-2 h-3 w-3 border-e border-b border-line-strong"
        />

        {/* HUD command */}
        <span className="absolute start-4 top-3 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-muted">
          {dict.command}
        </span>

        {/* HUD status */}
        <span className="absolute end-4 top-3 flex items-center gap-2 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-accent-300">
          <span
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400"
            aria-hidden
          />
          {dict.completed}
        </span>

        {/* Bottom-left readout */}
        <span className="absolute bottom-3 start-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle">
          PRJ {project.number} / {String(TOTAL).padStart(2, "0")}
        </span>

        {/* Bottom-right hint */}
        <span className="absolute bottom-3 end-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle">
          {dict.selectHint}
        </span>
      </div>

      {/* Meta panel below viewport */}
      <div ref={metaRef} className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block size-2.5 rotate-45 border"
              style={{ borderColor: accent }}
            />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-400">
              {categoryLabel}
            </span>
          </div>
          <Heading className="mt-3 text-ar-h2 text-fg">{project.title}</Heading>
          <p className="mt-2 text-ar-body-sm text-fg-muted">
            {project.location}
          </p>
          {project.needsDetails && (
            <p className="mt-3 text-ar-caption text-fg-subtle italic">
              {dict.recordNote}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <NavButton
            label={dict.prev}
            onClick={onPrev}
            disabled={!hasPrev}
            className="rotate-180"
          />
          <NavButton
            label={dict.next}
            onClick={onNext}
            disabled={!hasNext}
          />
          <NextLink
            href={localePath(locale, `/projects/${project.slug}`)}
            data-radar-view-project
            onClick={onStoreFocus}
            className={cn(
              "ms-3 inline-flex items-center gap-2 rounded-full px-7 py-3.5",
              "bg-accent-500 text-ink-950 text-sm font-semibold transition-all duration-200",
              "hover:bg-accent-400 hover:shadow-[0_0_32px_rgba(77,163,255,0.4)]",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
            )}
          >
            {dict.viewProject}
          </NextLink>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  className,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full border border-line font-mono text-xs transition-colors duration-200",
        "text-fg-muted hover:border-accent-500/60 hover:text-fg disabled:opacity-30 disabled:pointer-events-none",
        className,
      )}
    >
      ▶
    </button>
  );
}
