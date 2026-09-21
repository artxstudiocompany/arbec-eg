"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Direction } from "./direction-context";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type SlideFrom = "start" | "end" | "top" | "bottom";

export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Reactive subscription to the prefers-reduced-motion media query. */
export function useReducedMotion(): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", onStoreChange);
    return () => mq.removeEventListener("change", onStoreChange);
  }, []);
  const getSnapshot = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

function slideOffset(
  from: SlideFrom,
  dir: Direction,
  distance: number,
): { x: number; y: number } {
  const s = dir === "rtl" ? -1 : 1;
  switch (from) {
    case "start":
      return { x: distance * s, y: 0 };
    case "end":
      return { x: -distance * s, y: 0 };
    case "top":
      return { x: 0, y: -distance };
    case "bottom":
      return { x: 0, y: distance };
  }
}

export function useReveal(
  dir: Direction = "ltr",
  options?: {
    from?: SlideFrom;
    delay?: number;
    duration?: number;
    distance?: number;
  },
) {
  const ref = useRef<HTMLElement>(null);
  const from = options?.from ?? "bottom";

  useGSAP(
    () => {
      if (!ref.current) return;
      if (isReducedMotion()) {
        gsap.set(ref.current, { opacity: 1 });
        return;
      }
      const offset = slideOffset(from, dir, options?.distance ?? 20);
      gsap.fromTo(
        ref.current,
        { opacity: 0.35, x: offset.x, y: offset.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: options?.duration ?? 0.45,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}

export function useStaggerReveal(
  dir: Direction = "ltr",
  options?: {
    from?: SlideFrom;
    stagger?: number;
    delay?: number;
    duration?: number;
    distance?: number;
  },
) {
  const ref = useRef<HTMLDivElement>(null);
  const from = options?.from ?? "bottom";

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = Array.from(ref.current.children) as HTMLElement[];
      if (!items.length) return;
      if (isReducedMotion()) {
        gsap.set(items, { opacity: 1 });
        return;
      }
      const offset = slideOffset(from, dir, options?.distance ?? 18);
      gsap.fromTo(
        items,
        { opacity: 0.35, x: offset.x, y: offset.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: options?.duration ?? 0.45,
          delay: options?.delay ?? 0,
          stagger: options?.stagger ?? 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
