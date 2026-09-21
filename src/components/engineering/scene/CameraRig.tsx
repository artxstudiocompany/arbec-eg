"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cinematic camera with very subtle pointer-responsive parallax.
 * Architectural observer perspective — not a game. Very restrained.
 */
export function CameraRig({ reduced }: { reduced?: boolean }) {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const target = useRef(new THREE.Vector3(8.5, 4.8, 11.5));

  useEffect(() => {
    if (reduced) return;
    const handler = (e: PointerEvent) => {
      mouse.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    window.addEventListener("pointermove", handler, { passive: true });
    return () => window.removeEventListener("pointermove", handler);
  }, [reduced]);

  useFrame((_, delta) => {
    if (reduced) return;

    const t = target.current;
    t.set(8.5, 4.8, 11.5);
    t.x += mouse.current.x * 0.6;
    t.y += -mouse.current.y * 0.3;

    camera.position.lerp(t, 2 * delta);
    camera.lookAt(0, 2.1, 0);
  });

  return null;
}