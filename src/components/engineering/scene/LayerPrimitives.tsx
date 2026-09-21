"use client";

import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

export type LayerProps = {
  active: boolean;
  baseOpacity?: number;
  /** External per-frame opacity target (0..1). When provided it wins over `target`. */
  drive?: { current: number } | null;
};

/**
 * Assign the whole subtree's materials a target opacity and let it fade
 * smoothly toward it each frame. Each layer component owns one <group>
 * and forwards that ref here so transitions stay cinematic (600–1200ms).
 */
export function useGroupFade(
  groupRef: React.RefObject<Group | null>,
  target: number,
  speed = 5,
  drive?: { current: number } | null,
) {
  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const desired =
      drive && typeof drive.current === "number"
        ? THREE.MathUtils.clamp(drive.current, 0, 1)
        : target;

    let maxOpacity = 0;
    group.traverse((child) => {
      const mesh = child as MeshLike;
      if (!isFadable(mesh)) return;
      const mats = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
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

type MeshLike = THREE.Object3D & {
  isMesh?: boolean;
  material?: THREE.Material | THREE.Material[];
};

function isFadable(obj: THREE.Object3D): obj is MeshLike {
  const mesh = obj as MeshLike;
  return (
    mesh.isMesh === true && mesh.material !== undefined && mesh.material !== null
  );
}

/* ─── Shared geometry bits ─────────────────────────────────────── */

export const SHELL_COLOR = "#7cc0ff";
export const DIM_COLOR = "#2b5278";

export const BUILDING_W = 3.2;
export const BUILDING_D = 2.4;
export const BUILDING_H = 4.2;

export const FLOORS = [0.35, 1.05, 1.75, 2.45, 3.15, 3.85];