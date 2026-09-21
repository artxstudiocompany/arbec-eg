"use client";

import { useFrame } from "@react-three/fiber";
import type { RefObject } from "react";
import * as THREE from "three";

export type DriveRef = { current: number };

type FadableObject = THREE.Object3D & {
  isMesh?: boolean;
  isLine?: boolean;
  material?: THREE.Material | THREE.Material[];
};

function isFadable(obj: THREE.Object3D): obj is FadableObject {
  const o = obj as FadableObject;
  return o.material !== undefined && o.material !== null;
}

/**
 * Fades every material (mesh + line) in a stage group toward
 * `drive.current` each frame — the shared opacity engine for the
 * evolution stage overlays.
 */
export function useDrivenOpacity(
  groupRef: RefObject<THREE.Group | null>,
  drive: DriveRef,
  speed = 4.5,
) {
  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const desired = THREE.MathUtils.clamp(drive.current, 0, 1);
    let maxOpacity = 0;
    group.traverse((child) => {
      if (!isFadable(child)) return;
      const mats = Array.isArray(child.material)
        ? child.material
        : [child.material];
      for (const material of mats) {
        const m = material as THREE.Material & { opacity: number };
        m.transparent = true;
        const next = THREE.MathUtils.damp(m.opacity, desired, speed, delta);
        m.opacity = next;
        if (m.opacity > maxOpacity) maxOpacity = m.opacity;
      }
    });
    if (maxOpacity < 0.01) group.visible = false;
    else if (maxOpacity > 0.02) group.visible = true;
  });
}