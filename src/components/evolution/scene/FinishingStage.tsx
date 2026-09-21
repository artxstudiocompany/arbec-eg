"use client";

import { useRef } from "react";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  FLOORS,
} from "../../engineering/scene/LayerPrimitives";
import { useDrivenOpacity, type DriveRef } from "./opacityDrive";

const W = BUILDING_W;
const D = BUILDING_D;

/**
 * Finishing stage — floor plates, ceiling planes, warm cove light strips
 * and accent wall panels turn the engineered shell into architecture.
 */
export function FinishingStage({ drive }: { drive: DriveRef }) {
  const ref = useRef<THREE.Group>(null);
  useDrivenOpacity(ref, drive, 5);

  return (
    <group ref={ref}>
      {FLOORS.map((yy, i) => (
        <group key={i}>
          {/* Finished floor plate */}
          <mesh position={[0, yy + 0.02, 0]}>
            <boxGeometry args={[W - 0.5, 0.04, D - 0.5]} />
            <meshStandardMaterial color="#d9b98b" metalness={0.1} roughness={0.6} />
          </mesh>
          {/* Ceiling plane */}
          <mesh position={[0, yy + 0.055, 0]}>
            <boxGeometry args={[W - 0.5, 0.03, D - 0.5]} />
            <meshStandardMaterial color="#ccd5e0" metalness={0.05} roughness={0.7} />
          </mesh>
          {/* Warm cove light strip */}
          <mesh position={[0, yy + 0.07, -D / 2 + 0.34]}>
            <boxGeometry args={[W - 0.6, 0.015, 0.05]} />
            <meshStandardMaterial
              color="#fff3d6"
              emissive="#ffd9a0"
              emissiveIntensity={2.2}
            />
          </mesh>
          {/* Accent wall panel */}
          <mesh position={[0, yy + 0.55, -D / 2 + 0.05]}>
            <boxGeometry args={[W - 0.95, 0.32, 0.02]} />
            <meshStandardMaterial color="#c2a06e" metalness={0.1} roughness={0.55} />
          </mesh>
        </group>
      ))}
      {/* Polished entry podium */}
      <mesh position={[0, 0.03, 0]}>
        <boxGeometry args={[W + 0.1, 0.08, D + 0.1]} />
        <meshStandardMaterial color="#a08a6a" metalness={0.1} roughness={0.6} />
      </mesh>
    </group>
  );
}