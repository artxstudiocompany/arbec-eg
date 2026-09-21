"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { INFRASTRUCTURE_SYSTEMS, infraCentroid } from "@/data/infrastructure";
import type { InfraSystemId } from "@/data/infrastructure";
import type { InfraSceneDriver } from "./infra-utils";
import { OPEN_CAMERA_POS, OPEN_CAMERA_TARGET, SITE_CAMERA_POS, SITE_CAMERA_TARGET, rangeStep, smoothstep } from "./infra-utils";

/**
 * Cinematic camera — the scroll reveal drives the descent from the elevated
 * site view down into a controlled sectional composition, with a restrained
 * pointer parallax and a subtle dolly toward the selected system's centroid.
 */
export function InfrastructureCameraRig({
  progressRef,
  activeId,
  reduced,
}: {
  progressRef: InfraSceneDriver;
  activeId: InfraSystemId | null;
  reduced: boolean;
}) {
  const { camera } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));
  const makeDefault = useRef(true);

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

    const progress = progressRef.current;
    const t1 = smoothstep(rangeStep(progress, 0.12, 0.52));

    const pos = SITE_CAMERA_POS.clone().lerp(OPEN_CAMERA_POS, t1);
    const target = SITE_CAMERA_TARGET.clone().lerp(OPEN_CAMERA_TARGET, t1);

    // Subtle drift toward the selected system's centroid.
    if (activeId) {
      const system = INFRASTRUCTURE_SYSTEMS.find((s) => s.id === activeId);
      if (system) {
        const c = infraCentroid(system);
        pos.x += c.x * 0.22;
        pos.y += c.y * 0.18;
        pos.z += c.z * 0.22;
        target.x += c.x * 0.3;
        target.y += c.y * 0.24;
        target.z += c.z * 0.3;
      }
    }

    // Restrained pointer parallax.
    pos.x += mouse.current.x * 0.35;
    pos.y += -mouse.current.y * 0.2;

    camera.position.lerp(pos, 1 - Math.pow(0.001, delta));
    camera.lookAt(target);

    // First frame: settle instantly so WebGL paints the site view.
    if (makeDefault.current) {
      camera.position.copy(pos);
      camera.lookAt(target);
      makeDefault.current = false;
    }
    void delta;
  });

  return null;
}