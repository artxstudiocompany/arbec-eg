"use client";

export type EngineeringMetadataProps = {
  command: string;
  systemLabel: string;
  modeLabel: string;
  visualization: string;
  modeActive: string;
  activeSystem: string;
};

/**
 * Subtle HUD metadata around the viewport — pure UI labels, no fake
 * engineering measurements or project coordinates.
 */
export function EngineeringMetadata({
  command,
  systemLabel,
  modeLabel,
  visualization,
  modeActive,
  activeSystem,
}: EngineeringMetadataProps) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-fg-subtle lg:block">
      {/* Top-start: ARBEC / ENGINEERING CORE */}
      <span className="absolute start-4 top-3 text-fg-muted">{command}</span>

      {/* Top-end: SYSTEM / ACTIVE */}
      <span className="absolute end-4 top-3 flex items-center gap-1.5 text-fg-muted">
        {systemLabel}: {modeActive}
        <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
      </span>

      {/* Bottom-start: active layer system id */}
      <span className="absolute start-4 bottom-3 text-accent-400">
        {activeSystem}
      </span>

      {/* Bottom-end: mode */}
      <span className="absolute end-4 bottom-3 flex items-center gap-2 text-fg-muted">
        <span>{modeLabel}</span>
        <span className="text-fg-subtle">·</span>
        <span className="text-fg-subtle">{visualization}</span>
      </span>
    </div>
  );
}