"use client";

import type { LocalizedInfraSystem } from "@/data/infrastructure";
import type { InfrastructureDict } from "./types";

/**
 * Active system detail — name, short description and documented scope,
 * ending with a contextual CTA back into ARBEC's quote flow (the same
 * mailto channel used by the Phase 6 service modules).
 */
export function InfrastructureInfoPanel({
  system,
  dict,
  email,
}: {
  system: LocalizedInfraSystem | null;
  dict: InfrastructureDict;
  email: string;
}) {
  const active = Boolean(system);
  const accent = system?.accent ?? "#7cc0ff";

  return (
    <div
      className="border-s-2 ps-4 transition-opacity duration-300"
      style={{ borderColor: active ? "color-mix(in srgb, " + accent + " 60%, transparent)" : undefined }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fg-subtle">
          {dict.command}
        </span>
        {system && (
          <span
            className="font-mono text-[0.625rem] uppercase tracking-[0.22em]"
            style={{ color: accent }}
          >
            {String(system.number).padStart(2, "0")}/06
          </span>
        )}
      </div>

      {system ? (
        <>
          <h3
            key={`${system.id}-title`}
            className="mt-2 text-ar-h3 text-fg opacity-0 [animation:infra-fade_0.6s_ease-out_forwards]"
          >
            {system.title}
          </h3>
          <p
            key={`${system.id}-body`}
            className="mt-2 max-w-[42ch] text-ar-body-sm leading-relaxed text-fg-muted opacity-0 [animation:infra-fade_0.6s_0.1s_ease-out_forwards]"
          >
            {system.shortDescription}
          </p>
          <div className="mt-3">
            <p className="text-ar-overline text-fg-subtle">{dict.scopeLabel}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {system.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-2 text-sm leading-snug text-fg-muted"
                >
                  <span aria-hidden className="h-px w-3 shrink-0 self-center" style={{ background: accent }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(
              `Infrastructure — ${system.title}`,
            )}`}
            className="mt-4 inline-flex h-9 items-center rounded-full border border-line px-4 text-xs font-semibold uppercase tracking-[0.14em] text-fg transition-colors hover:border-accent-500/60 hover:text-accent-300 focus-visible:outline-none focus-visible:border-accent-400"
          >
            {dict.cta}
          </a>
        </>
      ) : (
        <p className="mt-2 text-ar-body-sm leading-relaxed text-fg-subtle">
          {dict.selectHint}
        </p>
      )}

      <style>{`
        @keyframes infra-fade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}