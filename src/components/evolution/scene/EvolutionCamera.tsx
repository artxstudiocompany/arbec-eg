"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { DriveRef } from "./opacityDrive";

const LOOK_AT = new THREE.Vector3(0, 2.1, 0);

/**
 * Scroll-driven camera path. A shallow Catmull–Rom keyframe track
 * (approach → rise → close pass → settle back) that follows the theater
 * progress while always looking straight at the building center — no
 * spins, no zooms, no banking.
 */
const KEYFRAMES: [number, number, number][] = [
  [13.5, 5.2, 14.0],
  [11.0, 4.6, 11.5],
  [9.8, 4.4, 10.2],
  [12.5, 6.2, 12.8],
  [9.2, 3.8, 9.8],
  [7.8, 3.2, 8.4],
  [8.6, 3.0, 9.0],
  [9.8, 3.4, 10.2],
  [11.0, 3.6, 11.0],
];

export function EvolutionCamera({ progress }: { progress: DriveRef }) {
  const { camera } = useThree();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        KEYFRAMES.map((p) => new THREE.Vector3(...p)),
        false,
        "catmullrom",
        0.5,
      ),
    [],
  );
  const point = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    curve.getPointAt(0, point);
    camera.position.copy(point);
    camera.lookAt(LOOK_AT);
  }, [curve, camera, point]);

  useFrame((_, delta) => {
    const raw = THREE.MathUtils.clamp(progress.current, 0, 1);
    const t = raw * raw * (3 - 2 * raw);
    curve.getPointAt(t, point);
    const k = 1 - Math.exp(-3 * delta);
    camera.position.lerp(point, k);
    camera.lookAt(LOOK_AT);
  });

  return null;
}