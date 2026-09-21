"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  FLOORS,
} from "../../engineering/scene/LayerPrimitives";
import { CrossTick, Segments } from "./LinePrimitives";
import { useDrivenOpacity, type DriveRef } from "./opacityDrive";

const W = BUILDING_W;
const D = BUILDING_D;
const H = BUILDING_H;

function ringAt(y: number): number[] {
  const x = W / 2;
  const z = D / 2;
  return [
    -x, y, -z, x, y, -z,
    x, y, -z, x, y, z,
    x, y, z, -x, y, z,
    -x, y, z, -x, y, -z,
  ];
}

/**
 * Blueprint stage — the project "drawn on the grid". Wireframe mass,
 * floor rings, a coordinate tripod and a title block all fade in while
 * a vertical draw reveal pulls the lines up from the ground plane.
 */
export function BlueprintStage({
  drive,
  reduced = false,
}: {
  drive: DriveRef;
  reduced?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useDrivenOpacity(ref, drive, 4.5);

  // Scale the whole drawing from the ground upward as it is "rendered".
  useFrame((_, delta) => {
    const group = ref.current;
    if (!group || reduced) return;
    const target = Math.max(0.01, smoothstep(drive.current, 0, 0.42));
    group.scale.y = THREE.MathUtils.damp(group.scale.y, target, 7, delta);
  });

  const edges = useMemo(() => {
    const box = new THREE.BoxGeometry(W, H, D);
    return new THREE.EdgesGeometry(box);
  }, []);

  const cornerVs = [
    [-W / 2, -D / 2],
    [W / 2, -D / 2],
    [-W / 2, D / 2],
    [W / 2, D / 2],
  ].flatMap(([x, z]) => [x, 0, z, x, H, z]);

  const centerAxis = [0, 0, 0, 0, H, 0];

  // Front-face target circle + crosshair (project datum).
  const circ: number[] = [];
  for (let i = 0; i < 18; i++) {
    const a0 = (i / 18) * Math.PI * 2;
    const a1 = ((i + 1) / 18) * Math.PI * 2;
    circ.push(
      0 + Math.cos(a0) * 0.45,
      H * 0.5 + Math.sin(a0) * 0.45,
      D / 2 + 0.01,
      0 + Math.cos(a1) * 0.45,
      H * 0.5 + Math.sin(a1) * 0.45,
      D / 2 + 0.01,
    );
  }
  const crosshair = [
    -0.45, H * 0.5, D / 2 + 0.01, 0.45, H * 0.5, D / 2 + 0.01,
    0, H * 0.5 - 0.45, D / 2 + 0.01, 0, H * 0.5 + 0.45, D / 2 + 0.01,
  ];

  // Coordinate tripod from the plan corner.
  const tripod = [
    -W / 2 - 1.15, 0.02, -D / 2 - 1.05, -W / 2 - 0.5, 0.02, -D / 2 - 1.05,
    -W / 2 - 1.15, 0.02, -D / 2 - 1.05, -W / 2 - 1.15, 0.65, -D / 2 - 1.05,
    -W / 2 - 1.15, 0.02, -D / 2 - 1.05, -W / 2 - 1.15, 0.02, -D / 2 - 0.4,
  ];

  // Title block — small engineering title frame next to the drawing.
  const bx = W / 2 + 0.25;
  const by = 0.32;
  const bw = 0.7;
  const bh = 0.6;
  const bz = -D / 2 - 0.62;
  const titleBlock = [
    bx, by, bz, bx + bw, by, bz,
    bx + bw, by, bz, bx + bw, by + bh, bz,
    bx + bw, by + bh, bz, bx, by + bh, bz,
    bx, by + bh, bz, bx, by, bz,
    bx + bw * 0.5, by, bz, bx + bw * 0.5, by + bh, bz,
    bx, by + bh * 0.5, bz, bx + bw, by + bh * 0.5, bz,
  ];

  return (
    <group ref={ref}>
      <lineSegments geometry={edges} frustumCulled={false}>
        <lineBasicMaterial color="#6ab8ff" transparent />
      </lineSegments>

      {FLOORS.map((yy, i) => (
        <Segments key={i} points={ringAt(yy)} color="#5fb4ff" />
      ))}

      <Segments points={cornerVs} color="#7cc0ff" />
      <Segments points={centerAxis} color="#7cc0ff" />
      <Segments points={circ} color="#5ea8e8" />
      <Segments points={crosshair} color="#5ea8e8" />

      {[-W / 2, W / 2].flatMap((x) =>
        [-D / 2, D / 2].map((z) => (
          <CrossTick
            key={`${x}-${z}`}
            x={x}
            y={0}
            z={z}
            size={0.16}
            color="#7cc0ff"
          />
        )),
      )}

      <Segments points={tripod} color="#4da3ff" />
      <Segments points={tripod.slice(6, 12)} color="#e2e8f0" />
      <Segments points={tripod.slice(12)} color="#e6c07a" />
      <Segments points={titleBlock} color="#8fb8ff" />
    </group>
  );
}

function smoothstep(x: number, a: number, b: number): number {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}