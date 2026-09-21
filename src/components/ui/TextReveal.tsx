"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { directionSign, useDirection } from "@/lib/direction-context";
import { isReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Word-by-word text reveal, direction-aware. Handles `prefers-reduced-motion`
 * by rendering fully visible text.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.035,
  from = "start",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  from?: "start" | "bottom";
}) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const dir = useDirection();

  useGSAP(
    () => {
      const el = rootRef.current;
      const words = wordRefs.current;
      if (!el || !words.length) return;

      if (isReducedMotion()) {
        gsap.set(words, { opacity: 1, x: 0, y: 0 });
        return;
      }

      const offsetX = from === "start" ? 28 * directionSign(dir) : 0;
      const offsetY = from === "bottom" ? 36 : 0;

      gsap.fromTo(
        words,
        { opacity: 0, x: offsetX, y: offsetY },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.7,
          delay,
          stagger,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef },
  );

  return (
    <span ref={rootRef} className={cn("inline-flex flex-wrap", className)}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          ref={(node) => {
            if (node) wordRefs.current[index] = node;
          }}
          className="inline-block"
          style={{ marginInlineEnd: "0.25em" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}