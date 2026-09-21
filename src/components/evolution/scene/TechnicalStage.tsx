"use client";

import { useRef } from "react";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  FLOORS,
} from "../../engineering/scene/LayerPrimitives";
import { CircleLoop, CrossTick, Segments } from "./LinePrimitives";
import { useDrivenOpacity, type DriveRef } from "./opacityDrive";

const W = BUILDING_W;
const D = BUILDING_D;
const H = BUILDING_H;

/**
 * Technical office stage — dimension lines, floor level ticks, section
 * markers and a coordinate tripod read as tender-stage drawings around
 * the building. Pure CAD annotation, no fake measurements.
 */
export function TechnicalStage({ drive }: { drive: DriveRef }) {
  const ref = useRef<THREE.Group>(null);
  useDrivenOpacity(ref, drive, 4);

  // Height dimension (right side).
  const hx = W / 2 + 0.85;
  const heightDim = [hx, 0, 0, hx, H, 0];
  const heightTicks = [
    hx - 0.1, 0.05, 0, hx + 0.1, -0.05, 0,
    hx - 0.1, H - 0.05, 0, hx + 0.1, H + 0.05, 0,
  ];
  const floorNodes = FLOORS.flatMap((yy) => [
    hx - 0.06, yy, 0, hx + 0.06, yy, 0,
    hx, yy - 0.05, 0, hx, yy + 0.05, 0,
  ]);

  // Width dimension (front, below ground datum).
  const zw = -D / 2 - 0.95;
  const gy = -0.4;
  const widthDim = [-W / 2, gy, zw, W / 2, gy, zw];
  const widthTicks = [
    -W / 2 + 0.1, gy + 0.05, zw, -W / 2 - 0.1, gy - 0.05, zw,
    W / 2 - 0.1, gy + 0.05, zw, W / 2 + 0.1, gy - 0.05, zw,
    0, gy - 0.08, zw, 0, gy + 0.08, zw,
  ];

  // Datum line along the front face.
  const datum = [-W / 2 - 0.25, 0.03, D / 2 + 0.02, W / 2 + 0.25, 0.03, D / 2 + 0.02];

  // Section marker circles on the front face.
  const sec1Cx = -W / 2 + 0.85;
  const sec1Cy = H * 0.6;
  const sec1Z = D / 2 + 0.5;
  const secLeader = [
    sec1Cx, sec1Cy, sec1Z - 0.25,
    -W / 2 + 0.05, H * 0.6 - 0.15, D / 2 + 0.02,
  ];

  const sec2Cx = W / 2 - 1.15;
  const sec2Cy = H * 0.32;

  // Corner reference tick ring (plan corners exaggerated).
  const refTicks = [
    -W / 2, 0, -D / 2, W / 2, 0, -D / 2,
    W / 2, 0, -D / 2, W / 2, 0, D / 2,
  ];

  // Coordinate tripod on the front-right corner.
  const bsX = W / 2 + 0.75;
  const bsY = 0.25;
  const bsZ = D / 2 + 1.05;
  const tripod = [
    bsX, bsY, bsZ, bsX + 0.5, bsY, bsZ,
    bsX, bsY, bsZ, bsX, bsY + 0.5, bsZ,
    bsX, bsY, bsZ, bsX, bsY, bsZ + 0.5,
  ];

  return (
    <group ref={ref}>
      <Segments points={heightDim} color="#9fb4d8" />
      <Segments points={heightTicks} color="#7d93b5" />
      <Segments points={floorNodes} color="#7d93b5" />
      <Segments points={widthDim} color="#9fb4d8" />
      <Segments points={widthTicks} color="#7d93b5" />
      <Segments points={datum} color="#7d93b5" />

      <CircleLoop cx={sec1Cx} cy={sec1Cy} cz={sec1Z} radius={0.22} color="#9fb4d8" />
      <CircleLoop cx={sec2Cx} cy={sec2Cy} cz={sec1Z} radius={0.2} color="#9fb4d8" />
      <Segments points={secLeader} color="#7d93b5" />
      <Segments points={refTicks} color="#7d93b5" />

      <CrossTick x={sec2Cx} y={sec2Cy} z={sec1Z} size={0.1} color="#7d93b5" />

      <Segments points={tripod.slice(0, 6)} color="#4da3ff" />
      <Segments points={tripod.slice(6, 12)} color="#e2e8f0" />
      <Segments points={tripod.slice(12)} color="#e6c07a" />
    </group>
  );
}