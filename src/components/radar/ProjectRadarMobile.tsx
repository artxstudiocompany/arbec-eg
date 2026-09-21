"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import NextLink from "next/link";
import gsap from "gsap";
import { localePath, cn } from "@/lib/utils";
import type { Direction } from "@/lib/direction-context";
import type { LocalizedProject } from "@/data/projects";
import { CATEGORY_ACCENTS, ProjectVisual } from "./ProjectVisual";
import type { ProjectRadarDict } from "./types";

const TOTAL = 8;

/**
 * Mobile swipe rail — one project per card, driven by touch/drag (with mouse
 * + keyboard fallback). Dragging past the threshold snaps to the neighbour.
 */
export function ProjectRadarMobile({
  projects,
  activeIndex,
  dict,
  locale,
  dir,
  reduced,
  onSelect,
  onStoreFocus,
  headingLevel = 3,
}: {
  projects: LocalizedProject[];
  activeIndex: number;
  dict: ProjectRadarDict;
  locale: "en" | "ar";
  dir: Direction;
  reduced: boolean;
  onSelect: (index: number) => void;
  onStoreFocus: () => void;
  headingLevel?: 2 | 3;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const dragging = useRef(false);
  const [dragX, setDragX] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const active = projects[Math.min(activeIndex, projects.length - 1)];
  const Heading = headingLevel === 2 ? "h2" : "h3";

  const onPointerDown = useCallback((event: React.PointerEvent) => {
    if ((event.target as HTMLElement).closest("a, button")) return;
    dragging.current = true;
    x.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    setSwiping(true);
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!dragging.current) return;
      setDragX(event.clientX - x.current);
    },
    [],
  );

  const onPointerUp = useCallback((event?: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const threshold = 48;
    const logicalDrag = dir === "rtl" ? -dragX : dragX;
    if (Math.abs(logicalDrag) > threshold) {
      const target =
        logicalDrag < 0 ? Math.min(projects.length - 1, activeIndex + 1) : Math.max(0, activeIndex - 1);
      onSelect(target);
    }
    if (event && event.currentTarget.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragX(0);
    setSwiping(false);
  }, [dir, dragX, projects.length, activeIndex, onSelect]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (reduced) {
      gsap.killTweensOf(track);
      gsap.set(track, { x: 0, opacity: 1 });
      return;
    }
    gsap.killTweensOf(track);
    const tween = gsap.fromTo(
      track,
      { x: dir === "rtl" ? 60 : -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
    );
    return () => { tween.kill(); };
  }, [activeIndex, dir, reduced]);

  return (
    <div className="relative mx-auto max-w-2xl px-5 sm:px-8">
      {/* Dots */}
      <div className="mb-4 flex items-center justify-center gap-2" aria-hidden>
        {projects.map((project, i) => (
          <span
            key={project.slug}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              i === activeIndex ? "w-6 bg-accent-400" : "w-1.5 bg-line-strong",
            )}
          />
        ))}
      </div>

      <div
        ref={trackRef}
        role="group"
        aria-label={dict.project}
        aria-roledescription="carousel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { dragging.current = false; setDragX(0); setSwiping(false); }}
        className={cn(
          "relative touch-pan-y select-none overflow-hidden rounded-2xl border border-line transition-shadow duration-300",
          swiping && "cursor-grabbing",
        )}
        style={{ translate: `${dragX}px 0` }}
      >
        {active && (
          <article key={active.slug} data-radar-mobile aria-label={active.title}>
            {/* HUD header */}
            <div className="flex items-center justify-between px-5 pt-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em]">
              <span className="text-fg-muted">{dict.command}</span>
              <span className="flex items-center gap-2 text-accent-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-400" aria-hidden />
                {dict.completed}
              </span>
            </div>

            <div className="relative aspect-[16/9] w-full">
              <ProjectVisual
                category={active.category}
                className="h-full w-full"
              />
              <span className="absolute bottom-3 start-4 font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle">
                PRJ {active.number} / {String(TOTAL).padStart(2, "0")}
              </span>
            </div>

            <div className="border-t border-line p-5">
              <span
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]"
                style={{ color: CATEGORY_ACCENTS[active.category] }}
              >
                <span aria-hidden className="inline-block size-2 rotate-45 border" style={{ borderColor: CATEGORY_ACCENTS[active.category] }} />
                {dict.categories[active.category]}
              </span>
              <Heading className="mt-3 text-ar-h3 text-fg">{active.title}</Heading>
              <p className="mt-2 text-ar-body-sm text-fg-muted">
                {active.location}
              </p>
              <NextLink
                href={localePath(locale, `/projects/${active.slug}`)}
                onClick={onStoreFocus}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-xs font-semibold text-ink-950 transition-all duration-200 hover:bg-accent-400"
              >
                {dict.viewProject}
              </NextLink>
            </div>
          </article>
        )}

        {/* edge guards */}
        <span
          aria-hidden
          className="pointer-events-none absolute start-2 top-2 z-10 h-3 w-3 border-s border-t border-line-strong"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute end-2 top-2 z-10 h-3 w-3 border-e border-t border-line-strong"
        />
      </div>

      <p className="mt-4 text-center font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle">
        {dict.selectHint}
      </p>
    </div>
  );
}
