"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { computeStageDrives } from "./stageDrivers";
import { Segments } from "./LinePrimitives";
import { useDrivenOpacity } from "./opacityDrive";

const MIN = -10;
const MAX = 10;
const CELL = 0.5;
const SECTION = 2.5;

/**
 * Engineering site grid that fades as the building completes — strongest
 * against the blueprint, nearly invisible at delivery.
 */
export function EvolutionGrid({ stageIndex }: { stageIndex: number }) {
  const ref = useRef<THREE.Group>(null);
  const drive = useRef(0);
  useFrame(() => {
    drive.current = computeStageDrives(stageIndex).grid;
  });
  useDrivenOpacity(ref, drive, 3);

  const cellPts = useMemo(() => {
    const pts: number[] = [];
    const n = Math.round((MAX - MIN) / CELL);
    for (let i = 0; i <= n; i++) {
      const v = MIN + i * CELL;
      pts.push(MIN, 0, v, MAX, 0, v);
      pts.push(v, 0, MIN, v, 0, MAX);
    }
    return pts;
  }, []);

  const sectionPts = useMemo(() => {
    const pts: number[] = [];
    const n = Math.round((MAX - MIN) / SECTION);
    for (let i = 0; i <= n; i++) {
      const v = MIN + i * SECTION;
      pts.push(MIN, 0, v, MAX, 0, v);
      pts.push(v, 0, MIN, v, 0, MAX);
    }
    return pts;
  }, []);

  const axisX = useMemo(() => [MIN, 0, 0, MAX, 0, 0] as const, []);
  const axisZ = useMemo(() => [0, 0, MIN, 0, 0, MAX] as const, []);

  return (
    <group ref={ref} position={[0, -0.02, 0]}>
      <Segments points={cellPts} color="#123a3a" />
      <Segments points={sectionPts} color="#1c4a4a" />
      <Segments points={axisX} color="#2e6f9e" />
      <Segments points={axisZ} color="#2e6f9e" />
    </group>
  );
}