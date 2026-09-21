"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDirection } from "@/lib/direction-context";
import { useReducedMotion } from "@/lib/motion";
import { getLocalizedProjects } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import type { ProjectRadarDict } from "./types";
import { ProjectRadarIntro } from "./ProjectRadarIntro";
import { ProjectIndex } from "./ProjectIndex";
import { ProjectRadarStage } from "./ProjectRadarStage";
import { ProjectRadarMobile } from "./ProjectRadarMobile";

const FOCUS_KEY = "arbec:radar:focus";

/**
 * PROJECT RADAR — an immersive project showcase (not a portfolio grid).
 * Desktop renders the index rail + cinematic stage; mobile renders a swipe
 * rail. The radar restores the last-viewed project via a sessionStorage guard
 * so returning from a detail page lands back on the same record.
 */
export function ProjectRadar({
  locale,
  dict,
  asH1 = false,
}: {
  locale: "en" | "ar";
  dict: ProjectRadarDict;
  asH1?: boolean;
}) {
  const dir = useDirection();
  const reduced = useReducedMotion();
  const projects = useMemo(() => getLocalizedProjects(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);

  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [activeIndex, setActiveIndex] = useState(0);

  // Restore after hydration; SSR and the first client render stay identical.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(FOCUS_KEY);
        if (!raw) return;
        const saved = JSON.parse(raw) as { slug?: string; filter?: ProjectCategory | "all" };
        const restored = saved.filter && projects.some(project => project.category === saved.filter) ? saved.filter : "all";
        const list = restored === "all" ? projects : projects.filter(project => project.category === restored);
        setFilter(restored);
        setActiveIndex(Math.max(0, list.findIndex(project => project.slug === saved.slug)));
        sessionStorage.removeItem(FOCUS_KEY);
      } catch { /* Storage may be disabled or malformed. */ }
    });
    return () => cancelAnimationFrame(frame);
  }, [projects]);

  const filtered = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  const active = filtered[safeIndex] ?? projects[0];

  const storeFocus = useCallback(() => {
    try {
      window.sessionStorage.setItem(
        FOCUS_KEY,
        JSON.stringify({ slug: active?.slug, filter }),
      );
    } catch {
      /* ignore */
    }
  }, [active, filter]);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? filtered.length - 1 : i - 1));
  }, [filtered.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i >= filtered.length - 1 ? 0 : i + 1));
  }, [filtered.length]);

  // Keyboard navigation — arrows move through the radar.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!sectionRef.current || !target || !sectionRef.current.contains(target)) return;
      if (!target.closest("[data-radar-keyboard]")) return;
      if (target.closest("a")) return;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;
      const forward = dir === "rtl" ? event.key === "ArrowLeft" : event.key === "ArrowRight";
      const backward = dir === "rtl" ? event.key === "ArrowRight" : event.key === "ArrowLeft";
      if (event.key === "ArrowDown" || forward) {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowUp" || backward) {
        event.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dir, next, prev]);

  const applyFilter = useCallback((f: ProjectCategory | "all") => {
    setFilter(f);
    setActiveIndex(0);
  }, []);

  if (!active) return null;

  return (
    <section
      ref={sectionRef}
      id="project-radar"
      data-radar
      className="relative scroll-mt-24 overflow-hidden section-spacing"
      aria-label={dict.intro.eyebrow}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(77,163,255,0.06),transparent_60%)]"
      />

      <ProjectRadarIntro
        eyebrow={dict.intro.eyebrow}
        titleLine1={dict.intro.titleLine1}
        titleLine2={dict.intro.titleLine2}
        lead={dict.intro.lead}
        dir={dir}
        asH1={asH1}
      />

      {/* Desktop immersive viewer */}
      <div data-radar-keyboard className="section-heading-gap hidden lg:block">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start gap-12 px-12">
          <ProjectIndex
            filter={filter}
            onFilter={applyFilter}
            projects={filtered}
            activeIndex={safeIndex}
            onSelect={goTo}
            dict={dict}
          />
          <ProjectRadarStage
            project={active}
            dict={dict}
            locale={locale}
            dir={dir}
            onPrev={prev}
            onNext={next}
            hasPrev={filtered.length > 1}
            hasNext={filtered.length > 1}
            onStoreFocus={storeFocus}
            headingLevel={asH1 ? 2 : 3}
          />
        </div>
      </div>

      {/* Mobile swipe rail */}
      <div data-radar-keyboard className="section-heading-gap lg:hidden">
        <ProjectRadarMobile
          projects={filtered}
          activeIndex={safeIndex}
          dict={dict}
          locale={locale}
          dir={dir}
          reduced={reduced}
          onSelect={goTo}
          onStoreFocus={storeFocus}
          headingLevel={asH1 ? 2 : 3}
        />
      </div>
    </section>
  );
}
