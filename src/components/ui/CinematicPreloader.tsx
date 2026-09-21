"use client";

import { useEffect } from "react";

type CinematicPreloaderProps = {
  initializing: string;
  ready: string;
  loading: string;
  onComplete?: () => void;
};

/** A decorative boot trace, never a gate in front of usable content.
 * CSS finishes it even without JavaScript; no fake loading percentage. */
export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  useEffect(() => { onComplete?.(); }, [onComplete]);
  return <div aria-hidden="true" className="boot-trace pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-accent-500 via-signal-400 to-transparent" />;
}
