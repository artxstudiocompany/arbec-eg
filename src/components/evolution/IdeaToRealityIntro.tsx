"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";
import type { Direction } from "@/lib/direction-context";

gsap.registerPlugin(ScrollTrigger);

export function IdeaToRealityIntro({
  eyebrow,
  titleLine1,
  titleLine2,
  lead,
  dir,
}: {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lead: string;
  dir: Direction;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (isReducedMotion()) return;
      const s = dir === "rtl" ? -1 : 1;
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-evo-reveal]",
        ref.current,
      );
      gsap.fromTo(
        items,
        { opacity: 0, x: 32 * s, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
        },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative pt-12 pb-7 sm:pt-16 sm:pb-9">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <p
          data-evo-reveal
          className="flex items-center gap-3 text-ar-overline text-accent-400"
        >
          <span
            aria-hidden
            className="h-px w-10 bg-accent-500 [mask-image:linear-gradient(to_right,#000,transparent)]"
          />
          {eyebrow}
        </p>
        <h2 id="idea-to-reality-title" className="mt-6 text-ar-display text-fg">
          <span data-evo-reveal className="block">
            {titleLine1}
          </span>
          <span
            data-evo-reveal
            className="block bg-gradient-to-r from-fg via-fg to-accent-300 bg-clip-text text-transparent"
          >
            {titleLine2}
          </span>
        </h2>
        <p
          data-evo-reveal
          className="mt-6 max-w-2xl text-ar-body-lg leading-relaxed text-fg-muted"
        >
          {lead}
        </p>
      </div>
    </div>
  );
}
