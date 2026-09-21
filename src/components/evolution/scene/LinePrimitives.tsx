"use client";

import { useMemo } from "react";
import * as THREE from "three";

function loopPoints(
  points: readonly number[],
  color: string,
): {
  geometry: THREE.BufferGeometry;
  color: string;
} {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(Float32Array.from(points), 3),
  );
  return { geometry, color };
}

/** Line segments (pairs of points) rendered as a single fadable object. */
export function Segments({
  points,
  color,
}: {
  points: readonly number[];
  color: string;
}) {
  const { geometry } = useMemo(() => loopPoints(points, color), [points, color]);
  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial color={color} transparent />
    </lineSegments>
  );
}

/** A circle loop in the XY plane (facing +Z), used for section markers. */
export function CircleLoop({
  cx,
  cy,
  cz,
  radius,
  color,
  segments = 18,
}: {
  cx: number;
  cy: number;
  cz: number;
  radius: number;
  color: string;
  segments?: number;
}) {
  const { geometry } = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < segments; i++) {
      const a0 = (i / segments) * Math.PI * 2;
      const a1 = ((i + 1) / segments) * Math.PI * 2;
      pts.push(
        cx + Math.cos(a0) * radius,
        cy + Math.sin(a0) * radius,
        cz,
        cx + Math.cos(a1) * radius,
        cy + Math.sin(a1) * radius,
        cz,
      );
    }
    return loopPoints(pts, color);
  }, [cx, cy, cz, radius, color, segments]);

  return (
    <lineSegments geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial color={color} transparent />
    </lineSegments>
  );
}

/** A small cross (+) used as reference / corner tick. */
export function CrossTick({
  x,
  y,
  z,
  size = 0.16,
  color,
}: {
  x: number;
  y: number;
  z: number;
  size?: number;
  color: string;
}) {
  return (
    <Segments
      color={color}
      points={[
        x - size, y, z, x + size, y, z,
        x, y, z - size, x, y, z + size,
      ]}
    />
  );
}