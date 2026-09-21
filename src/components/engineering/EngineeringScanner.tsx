"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { EngineeringLayerId } from "@/data/engineering-core";

/**
 * A thin vertical scan line sweeps the viewport when the layer changes,
 * announcing "ANALYZING..." then "LAYER ACTIVE". Pure visual storytelling.
 * The whole sequence restarts by remounting (key = layerId), so no
 * reset work runs inside an effect.
 */
export function EngineeringScanner({
  layerId,
  analyzing,
  layerActive,
  reduced = false,
}: {
  layerId: EngineeringLayerId;
  analyzing: string;
  layerActive: string;
  reduced?: boolean;
}) {
  if (reduced) return null;
  return (
    <ScannerSequence
      key={layerId}
      analyzing={analyzing}
      layerActive={layerActive}
    />
  );
}

function ScannerSequence({
  analyzing,
  layerActive,
}: {
  analyzing: string;
  layerActive: string;
}) {
  const [scanning, setScanning] = useState(true);
  const [showLabel, setShowLabel] = useState<"analyzing" | "active" | null>(
    "analyzing",
  );

  useEffect(() => {
    const t1 = window.setTimeout(() => setShowLabel("active"), 800);
    const t2 = window.setTimeout(() => {
      setShowLabel(null);
      setScanning(false);
    }, 1900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {scanning && (
        <div className="scanner-line absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-accent-400/80 to-transparent" />
      )}
      <div
        className={cn(
          "absolute start-1/2 top-1/2 -translate-y-1/2 rounded-sm border border-line-strong bg-ink-950/70 px-3 py-2 backdrop-blur-sm transition-[opacity,transform] duration-300",
          showLabel ? "opacity-100" : "opacity-0",
        )}
        style={
          showLabel ? { transform: "translate(-50%, -50%)" } : undefined
        }
        aria-live="polite"
      >
        <span className="flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.22em] text-fg">
          <span
            className={cn(
              "h-1 w-1 rounded-full",
              showLabel === "active" ? "bg-success" : "bg-accent-400",
            )}
          />
          {showLabel === "analyzing"
            ? analyzing
            : showLabel === "active"
              ? layerActive
              : ""}
        </span>
      </div>
      <style>{`
        .scanner-line { left: -1px; animation: scanner-x 1.1s ease-in-out forwards; }
        @keyframes scanner-x {
          0% { left: -1px; }
          100% { left: calc(100% + 1px); }
        }
      `}</style>
    </div>
  );
}