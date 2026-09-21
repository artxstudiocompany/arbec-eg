"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/motion";
import { useDirection } from "@/lib/direction-context";
import type { Locale } from "@/i18n/config";
import { getLocalizedInfrastructureSystems, type InfraSystemId } from "@/data/infrastructure";
import { company } from "@/data/company";
import { cn, localePath } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { InfrastructureDict } from "./types";
import { STORY_ORDER } from "./types";
import { InfrastructureIntro } from "./InfrastructureIntro";
import { InfrastructureViewport } from "./InfrastructureViewport";
import { InfrastructureControls } from "./InfrastructureControls";
import { InfrastructureInfoPanel } from "./InfrastructureInfoPanel";
import { InfrastructureScanner } from "./InfrastructureScanner";

/** A bounded engineering presentation, never a tall invisible scroll track. */
export function InfrastructureExperience({ locale, dict, serviceDict }: {
  locale: Locale;
  dict: InfrastructureDict;
  serviceDict: { back: string; count: string };
}) {
  const dir = useDirection();
  const reduced = useReducedMotion();
  const ar = locale === "ar";
  const systems = useMemo(() => getLocalizedInfrastructureSystems(locale), [locale]);
  const [activeId, setActiveId] = useState<InfraSystemId | null>(null);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const progressRef = useRef(0);
  const transition = useRef<gsap.core.Tween | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const activeSystem = systems.find(system => system.id === activeId) ?? null;
  const displayStep = step;
  const stage = dict.story[STORY_ORDER[displayStep]];

  useEffect(() => () => { transition.current?.kill(); }, [reduced]);

  function selectStep(index: number) {
    transition.current?.kill();
    setPlaying(false);
    setStep(index);
    const target = index / (STORY_ORDER.length - 1);
    if (reduced) progressRef.current = target;
    else transition.current = gsap.to(progressRef, { current: target, duration: 0.75, ease: "power2.inOut", overwrite: true });
  }

  function selectSystem(id: InfraSystemId) {
    setActiveId(current => current === id ? null : id);
    if (step < 3) selectStep(3);
  }

  function playSequence() {
    transition.current?.kill();
    if (playing) { setPlaying(false); return; }
    setStep(0);
    setPlaying(true);
    transition.current = gsap.fromTo(progressRef, { current: 0 }, {
      current: 1, duration: 10, ease: "none",
      onUpdate: () => setStep(Math.min(STORY_ORDER.length - 1, Math.floor(progressRef.current * STORY_ORDER.length))),
      onComplete: () => setPlaying(false),
    });
  }

  function handleSystemKeys(event: KeyboardEvent<HTMLDivElement>) {
    if (event.altKey || event.ctrlKey || event.metaKey || !(event.target as HTMLElement).closest("[data-infra-control]")) return;
    const next = event.key === "ArrowDown" || event.key === (dir === "rtl" ? "ArrowLeft" : "ArrowRight");
    const previous = event.key === "ArrowUp" || event.key === (dir === "rtl" ? "ArrowRight" : "ArrowLeft");
    if (!next && !previous) return;
    event.preventDefault();
    const current = systems.findIndex(system => system.id === activeId);
    const index = (current + (next ? 1 : -1) + systems.length) % systems.length;
    selectSystem(systems[index].id);
    consoleRef.current?.querySelectorAll<HTMLButtonElement>("[data-infra-control]")[index]?.focus();
  }

  return (
    <section id="infrastructure-experience" className="relative scroll-mt-24 overflow-hidden border-y border-line bg-ink-900/35">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(77,163,255,0.05),transparent_65%)]" />
      <InfrastructureIntro eyebrow={dict.eyebrow} titleLine1={dict.titleLine1} titleLine2={dict.titleLine2} lead={dict.lead} countValue={dict.total} countLabel={dict.count} dir={dir} />
      <Container className="relative pb-10 sm:pb-14">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-medium text-fg-muted">{ar ? "استكشف مراحل المنظومة" : "Explore the system sequence"}</span>
          {!reduced && <button type="button" onClick={playSequence} aria-pressed={playing} className="min-h-10 rounded-full border border-line-strong bg-ink-800 px-4 text-xs text-accent-300 transition-colors hover:border-accent-400">{playing ? (ar ? "إيقاف التسلسل" : "Pause sequence") : (ar ? "تشغيل التسلسل" : "Play sequence")}</button>}
        </div>
        <div role="group" aria-label={ar ? "مراحل البنية التحتية" : "Infrastructure stages"} className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {STORY_ORDER.map((key, index) => <button key={key} type="button" aria-pressed={displayStep === index} onClick={() => selectStep(index)} className={cn("flex min-h-12 items-center gap-2 rounded-lg border px-3 py-2 text-start text-xs transition-colors", displayStep === index ? "border-accent-400/60 bg-accent-500/10 text-fg" : "border-line bg-ink-950/40 text-fg-muted hover:border-line-strong hover:text-fg")}><span className="font-mono text-accent-400">{String(index + 1).padStart(2, "0")}</span><span>{dict.story[key].title}</span></button>)}
        </div>
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line-strong bg-ink-950 sm:aspect-[16/10] lg:aspect-[16/9]">
              <InfrastructureViewport activeId={activeId} progressRef={progressRef} revealed={displayStep > 0} />
              <InfrastructureScanner systemId={activeId ?? "water"} systemLabel={activeSystem?.nodeLabel ?? dict.systemLabel} activeLabel={dict.activeSystem} reduced={reduced || !activeId} />
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-2 font-mono text-[9px] tracking-wider text-accent-300 sm:inset-x-4 sm:top-4 sm:text-[10px]">
                <span className="rounded border border-line bg-ink-950/85 px-2 py-1.5">{dict.command}</span>
                <span className="rounded border border-line bg-ink-950/85 px-2 py-1.5">{String(displayStep + 1).padStart(2, "0")} / 06</span>
              </div>
            </div>
            <div className="mt-4 flex gap-3 rounded-lg border border-line bg-ink-950/50 p-4" aria-live="polite" aria-atomic="true">
              <span aria-hidden="true" className="font-mono text-lg text-accent-400">{String(displayStep + 1).padStart(2, "0")}</span>
              <div><h3 className="text-sm font-semibold text-fg">{stage.title}</h3><p className="mt-1 text-sm leading-7 text-fg-muted">{stage.description}</p></div>
            </div>
          </div>
          <div ref={consoleRef} onKeyDown={handleSystemKeys} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <InfrastructureControls systems={systems} activeId={activeId} onSelect={selectSystem} systemLabel={dict.systemLabel} />
            <InfrastructureInfoPanel system={activeSystem} dict={dict} email={company.email.contracting} />
          </div>
        </div>
        <div className="mt-7 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="max-w-xl text-sm leading-7 text-fg-muted">{dict.finalMessage}</p>
          <div className="flex shrink-0 flex-wrap items-center gap-3">
            <Button href={localePath(locale, "/contact")} size="sm">{dict.cta}</Button>
            <a href="#services" className="rounded-full px-3 py-2 text-xs text-fg-muted hover:text-fg">{serviceDict.back}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
