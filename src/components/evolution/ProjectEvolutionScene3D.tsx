"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { EvolutionBuilding } from "./scene/EvolutionBuilding";
import { EvolutionCamera } from "./scene/EvolutionCamera";
import { EvolutionGrid } from "./scene/EvolutionGrid";
import { computeStageDrives } from "./scene/stageDrivers";
import type { DriveRef } from "./scene/opacityDrive";

const CAM0: [number, number, number] = [13.5, 5.2, 14];

/**
 * WebGL theater for the evolution sequence. The background, lights and
 * building layers all target the selected stage's drive profile — the
 * click controls the 3D state. Document scroll only moves the camera
 * along the reveal path.
 */
export function ProjectEvolutionScene3D({
  active = true,
  progress,
  stageIndex,
  reduced = false,
}: {
  active?: boolean;
  progress: DriveRef;
  stageIndex: number;
  reduced?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: CAM0, fov: 35 }}
    >
      <PerspectiveCamera makeDefault position={CAM0} fov={35} />
      <Atmosphere stageIndex={stageIndex} />
      <Suspense fallback={null}>
        <EvolutionGrid stageIndex={stageIndex} />
        <EvolutionBuilding stageIndex={stageIndex} reduced={reduced} />
        {active && !reduced && <EvolutionCamera progress={progress} />}
      </Suspense>
    </Canvas>
  );
}

function Atmosphere({ stageIndex }: { stageIndex: number }) {
  const bg = useRef<THREE.Color>(null);
  const ambient = useRef<THREE.AmbientLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.DirectionalLight>(null);
  const point = useRef<THREE.PointLight>(null);
  const warm = useRef<THREE.PointLight>(null);

  const base = useMemo(() => new THREE.Color("#070b13"), []);
  const lifted = useMemo(() => new THREE.Color("#0e1d2e"), []);
  const cool = useMemo(() => new THREE.Color("#4da3ff"), []);
  const warmCol = useMemo(() => new THREE.Color("#ffd9a0"), []);

  useFrame((_, delta) => {
    const d = computeStageDrives(stageIndex);
    if (bg.current) bg.current.lerpColors(base, lifted, d.light);
    if (ambient.current)
      ambient.current.intensity = THREE.MathUtils.damp(
        ambient.current.intensity,
        0.45 + d.light * 0.25,
        3,
        delta,
      );
    if (key.current)
      key.current.intensity = THREE.MathUtils.damp(
        key.current.intensity,
        1.2 + d.light * 0.7,
        3,
        delta,
      );
    if (rim.current)
      rim.current.intensity = THREE.MathUtils.damp(
        rim.current.intensity,
        0.5 + d.light * 0.4,
        3,
        delta,
      );
    if (point.current) {
      point.current.intensity = THREE.MathUtils.damp(
        point.current.intensity,
        0.4 + d.light * 0.55,
        3,
        delta,
      );
      point.current.color.lerpColors(cool, warmCol, d.finish);
    }
    if (warm.current)
      warm.current.intensity = THREE.MathUtils.damp(
        warm.current.intensity,
        d.finish * 1.15,
        3,
        delta,
      );
  });

  return (
    <>
      <color ref={bg} attach="background" args={["#070b13"]} />
      <ambientLight ref={ambient} intensity={0.45} />
      <directionalLight ref={key} position={[8, 10, 6]} intensity={1.2} />
      <directionalLight
        ref={rim}
        position={[-6, 6, -4]}
        intensity={0.5}
        color="#4da3ff"
      />
      <pointLight ref={point} position={[0, 4, 0]} intensity={0.4} color="#4da3ff" />
      <pointLight
        ref={warm}
        position={[0, 2, 0]}
        intensity={0}
        distance={6}
        color="#ffd9a0"
      />
    </>
  );
}

export default ProjectEvolutionScene3D;
