"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { InfraSystemId } from "@/data/infrastructure";

/**
 * A thin vertical scan line sweeps the viewport when the active system
 * changes, announcing "ACTIVE SYSTEM" near the scan. Like the Phase 3
 * scanner but horizontal across the site — pure visual storytelling that
 * restarts on remount (key = system id).
 */
export function InfrastructureScanner({
  systemId,
  systemLabel,
  activeLabel,
  reduced = false,
}: {
  systemId: InfraSystemId | string;
  systemLabel: string;
  activeLabel: string;
  reduced?: boolean;
}) {
  if (reduced) return null;
  return (
    <ScannerSequence
      key={systemId}
      systemLabel={systemLabel}
      activeLabel={activeLabel}
    />
  );
}

function ScannerSequence({
  systemLabel,
  activeLabel,
}: {
  systemLabel: string;
  activeLabel: string;
}) {
  const [scanning, setScanning] = useState(true);
  const [labelPhase, setLabelPhase] = useState<"active" | null>("active");

  useEffect(() => {
    const t1 = window.setTimeout(() => setLabelPhase(null), 1100);
    const t2 = window.setTimeout(() => setScanning(false), 1600);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {scanning && (
        <div className="infra-scanline absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-400/80 to-transparent" />
      )}
      <div
        className={cn(
          "absolute start-1/2 top-20 -translate-x-1/2 rounded-sm border border-line-strong bg-ink-950/70 px-3 py-2 backdrop-blur-sm transition-opacity duration-300",
          labelPhase ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
      >
        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-accent-300">
          <span className="h-1 w-1 rounded-full bg-accent-400" />
          {activeLabel} — {systemLabel}
        </span>
      </div>
      <style>{`
        .infra-scanline { top: -1px; animation: infra-scan-y 1s ease-in-out forwards; }
        @keyframes infra-scan-y {
          0% { top: -1px; }
          100% { top: calc(100% + 1px); }
        }
      `}</style>
    </div>
  );
}