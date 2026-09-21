"use client";

import { useRef } from "react";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

/**
 * Architectural shell — translucent facade mass + window grille lines.
 * Dominant when ARCHITECTURE is selected; otherwise fades to a ghost
 * so deeper layers remain readable through it.
 */
export function BuildingShell({ active, baseOpacity = 0.14, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 5, drive);

  const y = BUILDING_H / 2;

  return (
    <group ref={ref}>
      {/* Main facade mass */}
      <mesh>
        <boxGeometry args={[BUILDING_W, BUILDING_H, BUILDING_D]} />
        <meshStandardMaterial
          color={active ? "#7cc0ff" : "#5f7fa0"}
          metalness={0.55}
          roughness={0.18}
        />
      </mesh>

      {/* Window grilles — thin highlighted bands on the long faces */}
      {Array.from({ length: 5 }, (_, i) => i * 0.7 + 0.25).map((yy) => (
        <mesh key={yy} position={[0, yy, 0]}>
          <boxGeometry args={[BUILDING_W + 0.04, 0.04, BUILDING_D + 0.04]} />
          <meshStandardMaterial
            color={active ? "#a5d3ff" : "#3f5f85"}
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Vertical mullions on the two wide faces */}
      {[-1.4, -0.7, 0, 0.7, 1.4].map((x) => (
        <mesh key={x} position={[x, y, -BUILDING_D / 2 - 0.015]}>
          <boxGeometry args={[0.02, BUILDING_H, 0.02]} />
          <meshStandardMaterial
            color={active ? "#a5d3ff" : "#3f5f85"}
            metalness={0.4}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Roof slab */}
      <mesh position={[0, BUILDING_H + 0.06, 0]}>
        <boxGeometry args={[BUILDING_W + 0.16, 0.12, BUILDING_D + 0.16]} />
        <meshStandardMaterial
          color={active ? "#5f7fa0" : "#3f4a5f"}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>

      {/* Ground-level entrance mark */}
      <mesh position={[0, 0.35, BUILDING_D / 2 + 0.02]}>
        <boxGeometry args={[0.6, 0.7, 0.02]} />
        <meshStandardMaterial
          color={active ? "#dbeafe" : "#54709a"}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}