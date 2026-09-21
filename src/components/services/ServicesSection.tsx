"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLocalizedServices, type ServiceGroup } from "@/data/services";
import { useDirection } from "@/lib/direction-context";
import { useReducedMotion } from "@/lib/motion";
import type { Locale } from "@/i18n/config";
import { ServicesIntro } from "./ServicesIntro";
import { ServicesIndex } from "./ServicesIndex";
import { ServiceHubStage } from "./ServiceHubStage";
import { ServiceDetail } from "./ServiceDetail";
import { ServiceVisual } from "./ServiceVisual";
import { ServicesMobile } from "./ServicesMobile";
import type { ServiceHubDict } from "./types";

/**
 * SERVICES EXPERIENCE.
 *
 * Services are the systems that turn engineering into reality. Desktop exposes
 * an interactive engineering hub (index rail · central core + nodes · active
 * module panel); mobile gets a dedicated swipe experience. Group filters are
 * factually grounded in the source: General Contracting / General Supplies.
 */
export function ServicesSection({
  locale,
  dict,
  asH1 = false,
}: {
  locale: Locale;
  dict: ServiceHubDict;
  asH1?: boolean;
}) {
  const dir = useDirection();
  const reduced = useReducedMotion();
  const services = useMemo(() => getLocalizedServices(locale), [locale]);
  const sectionRef = useRef<HTMLElement>(null);

  const [group, setGroup] = useState<"all" | ServiceGroup>("all");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(
    () => (group === "all" ? services : services.filter((s) => s.group === group)),
    [group, services],
  );

  const safeIndex = Math.min(activeIndex, Math.max(filtered.length - 1, 0));
  const active = filtered[safeIndex] ?? services[0];

  const goTo = useCallback((index: number) => setActiveIndex(index), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (filtered.length <= 1 ? 0 : (i <= 0 ? filtered.length - 1 : i - 1))),
    [filtered.length],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (filtered.length <= 1 ? 0 : (i >= filtered.length - 1 ? 0 : i + 1))),
    [filtered.length],
  );
  const applyGroup = useCallback((g: "all" | ServiceGroup) => {
    setGroup(g);
    setActiveIndex(0);
  }, []);

  // Keyboard navigation — switch engineering modes.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (!sectionRef.current || !target || !sectionRef.current.contains(target)) return;
      if (!target.closest("[data-services-keyboard]")) return;
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

  if (!active) return null;

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-24 overflow-hidden section-spacing"
      aria-label={dict.intro.eyebrow}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_10%,rgba(77,163,255,0.06),transparent_60%)]"
      />

      <ServicesIntro
        eyebrow={dict.intro.eyebrow}
        titleLine1={dict.intro.titleLine1}
        titleLine2={dict.intro.titleLine2}
        lead={dict.intro.lead}
        dir={dir}
        countValue="09"
        countLabel={dict.count}
        asH1={asH1}
      />

      <div data-services-keyboard className="section-heading-gap hidden lg:block">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)_minmax(0,1.1fr)] items-start gap-12 px-12">
          <ServicesIndex
            services={filtered}
            activeIndex={safeIndex}
            group={group}
            onGroup={applyGroup}
            onSelect={goTo}
            dict={dict}
          />

          <ServiceHubStage
            services={filtered}
            activeIndex={safeIndex}
            dict={dict}
            dir={dir}
            reduced={reduced}
            onSelect={goTo}
          />

          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-xl border border-line bg-ink-900/60">
              <ServiceVisual
                visual={active.visual}
                className="aspect-[16/9] h-auto w-full transition-opacity duration-500"
              />
            </div>
            <div className="mt-6">
              <ServiceDetail service={active} dict={dict} locale={locale} />
            </div>
            <p className="mt-6 hidden text-2xs font-mono uppercase tracking-[0.22em] text-fg-subtle lg:block">
              {dict.selectHint}
            </p>
          </div>
        </div>
      </div>

      <div data-services-keyboard className="section-heading-gap max-w-3xl px-5 sm:px-8 lg:hidden">
        <ServicesMobile
          services={filtered}
          activeIndex={safeIndex}
          group={group}
          onGroup={applyGroup}
          onSelect={goTo}
          onPrev={prev}
          onNext={next}
          dict={dict}
          locale={locale}
          dir={dir}
          reduced={reduced}
        />
      </div>
    </section>
  );
}
