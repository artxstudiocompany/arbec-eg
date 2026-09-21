"use client";

import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { useReducedMotion } from "@/lib/motion";
import { isWebGLAvailable } from "@/lib/webgl";
import { cn } from "@/lib/utils";

function subscribeDesktop(notify: () => void) {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
function desktopSnapshot() { return window.matchMedia("(min-width: 1024px)").matches; }
function subscribeVisibility(notify: () => void) {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
}
function visibleSnapshot() { return document.visibilityState !== "hidden"; }

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

/** One lifecycle for every engineering viewport. Static content is the default,
 * including SSR, small screens, reduced motion, failed GPU contexts and errors.
 * Canvas children must use the supplied active flag for their frame loop. */
export function SceneGate({
  fallback,
  children,
  className,
}: {
  fallback: ReactNode;
  children: (active: boolean) => ReactNode;
  className?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const desktop = useSyncExternalStore(subscribeDesktop, desktopSnapshot, () => false);
  const tabVisible = useSyncExternalStore(subscribeVisibility, visibleSnapshot, () => true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const detect = () => {
      setNear(true);
      setWebgl(isWebGLAvailable());
    };
    const preload = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        detect();
        preload.disconnect();
      }
    }, { rootMargin: "240px 0px" });
    const visibility = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.01 });
    const lost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    preload.observe(element);
    visibility.observe(element);
    element.addEventListener("webglcontextlost", lost, true);
    return () => {
      preload.disconnect();
      visibility.disconnect();
      element.removeEventListener("webglcontextlost", lost, true);
    };
  }, []);

  const enhanced = near && desktop && !reduced && webgl && !contextLost;
  const active = enhanced && inView && tabVisible;
  return (
    <div ref={host} className={cn("relative h-full w-full", className)} data-scene-mode={enhanced ? "3d" : "static"} data-scene-active={active}>
      {enhanced ? <SceneBoundary fallback={fallback}>{children(active)}</SceneBoundary> : fallback}
    </div>
  );
}
