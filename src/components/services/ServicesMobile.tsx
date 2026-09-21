"use client";

import { useRef, type PointerEvent } from "react";
import type { LocalizedService, ServiceGroup } from "@/data/services";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import type { Direction } from "@/lib/direction-context";
import type { Locale } from "@/i18n/config";
import { SERVICE_ACCENTS, ServiceVisual } from "./ServiceVisual";
import { ServiceCta } from "./ServiceDetail";
import type { ServiceHubDict } from "./types";

/**
 * MOBILE SERVICES — a dedicated compact experience (never a shrunken radial
 * hub): filter chips, a large active visual with swipe/prev/next, condensed
 * detail and CTA. Everything is a large touch target; hover is never required.
 */
export function ServicesMobile({
  services,
  activeIndex,
  group,
  onGroup,
  onSelect,
  onPrev,
  onNext,
  dict,
  locale,
  dir,
  reduced,
}: {
  services: LocalizedService[];
  activeIndex: number;
  group: "all" | ServiceGroup;
  onGroup: (g: "all" | ServiceGroup) => void;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  dict: ServiceHubDict;
  locale: Locale;
  dir: Direction;
  reduced: boolean;
}) {
  const dragX = useRef<number | null>(null);
  const active = services[activeIndex];
  if (!active) return null;

  const accent = SERVICE_ACCENTS[active.visual];
  const groups: Array<"all" | ServiceGroup> = ["all", "contracting", "supplies"];
  const sign = dir === "rtl" ? -1 : 1;

  const email =
    active.group === "supplies"
      ? company.email.supplies
      : company.email.contracting;

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    dragX.current = e.clientX;
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragX.current === null) return;
    const dx = (e.clientX - dragX.current) * sign;
    dragX.current = null;
    if (Math.abs(dx) < 64) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  const onPointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    dragX.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter chips — horizontally scrollable */}
      <div
        role="group"
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onGroup(g)}
            aria-pressed={group === g}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-ar-overline transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
              group === g
                ? "border-accent-500 bg-accent-500/10 text-accent-300"
                : "border-line text-fg-muted hover:border-accent-500/50 hover:text-fg",
            )}
          >
            {dict.groups[g]}
          </button>
        ))}
      </div>

      {/* Active visual card — swipe + prev/next */}
      <div
        className="relative overflow-hidden rounded-2xl border border-line bg-ink-900/60"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{ touchAction: "pan-y" }}
      >
        <div className="relative aspect-[16/10]">
          <ServiceVisual visual={active.visual} className="absolute inset-0 h-full w-full" />
          {/* Chip */}
          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-md border border-line/80 bg-ink-950/70 px-3 py-1.5 backdrop-blur-sm">
            <span className="inline-block size-1.5 rounded-full" style={{ background: accent }} />
            <span className="text-ar-mono text-2xs tracking-[0.24em] text-fg">
              {String(active.number).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute bottom-4 right-4 rounded-md border border-line/80 bg-ink-950/70 px-3 py-1.5 backdrop-blur-sm">
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
              {active.nodeLabel}
            </span>
          </div>
        </div>

        {/* Prev / Next large controls */}
        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-3">
          <button
            type="button"
            onClick={onPrev}
            aria-label={dict.prev}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md border border-line px-4 text-ar-overline text-fg-muted transition-colors hover:border-accent-500/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          >
            <ArrowLeft />
            {dict.prev}
          </button>
          <span className="whitespace-nowrap text-ar-mono text-2xs tracking-[0.2em] text-fg-subtle">
            {String(active.number).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onNext}
            aria-label={dict.next}
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md border border-line px-4 text-ar-overline text-fg-muted transition-colors hover:border-accent-500/50 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400"
          >
            {dict.next}
            <ArrowRight />
          </button>
        </div>
      </div>

      {/* Detail */}
      <div>
        <p className="text-ar-overline text-accent-400">
          {dict.serviceLabel} / {String(active.number).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-ar-h3 text-fg">{active.title}</h3>
        <p className="mt-3 text-ar-body-sm leading-relaxed text-fg-muted">
          {active.shortDescription}
        </p>

        {active.points && active.points.length > 0 && (
          <div className="mt-5">
            <p className="text-ar-overline text-fg-subtle">{dict.capabilities}</p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {active.points.map((point) => (
                <li
                  key={point}
                  className="flex items-baseline gap-3 text-sm leading-snug text-fg-muted"
                >
                  <span aria-hidden className="h-px w-3 shrink-0 self-center bg-accent-500/70" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}

        <ServiceCta service={active} dict={dict} locale={locale} email={email} className="mt-6 sm:flex-row" />
      </div>

      {/* Mini index rail */}
      <div
        role="list"
        aria-label={dict.indexLabel}
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {services.map((service, i) => {
          const isActive = i === activeIndex;
          const a = SERVICE_ACCENTS[service.visual];
          return (
            <div key={service.slug} role="listitem" className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-pressed={isActive}
                aria-label={`${String(service.number).padStart(2, "0")} — ${service.title}`}
                className={cn(
                  "flex items-center gap-2 rounded-md border px-3 py-2.5 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-400",
                  isActive ? "border-current/40 bg-ink-800/80" : "border-line/70 opacity-55",
                )}
                style={{ color: a }}
              >
                <span className="text-ar-mono text-[10px] tracking-[0.2em]">{String(service.number).padStart(2, "0")}</span>
                <span className={cn("text-[10px] font-semibold uppercase tracking-[0.12em]", isActive ? "text-fg" : "text-fg-muted")}>
                  {service.nodeLabel}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Chevron({ path }: { path: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="inline-block size-4 shrink-0 rtl:-scale-x-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </svg>
  );
}

function ArrowLeft() {
  return <Chevron path="M20 12H4M10 6l-6 6 6 6" />;
}

function ArrowRight() {
  return <Chevron path="M4 12h16M14 6l6 6-6 6" />;
}
