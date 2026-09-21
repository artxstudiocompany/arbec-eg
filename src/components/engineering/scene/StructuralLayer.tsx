"use client";

import { useRef } from "react";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  FLOORS,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

/**
 * Civil / structure layer — columns, transfer beam and floor slabs
 * emerge through the semi-transparent shell when CIVIL is active.
 */
export function StructuralLayer({ active, baseOpacity = 0, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4, drive);

  const colColor = active ? "#b9c6d6" : "#6a7587";
  const slabColor = active ? "#d7dee8" : "#5a6474";

  return (
    <group ref={ref}>
      {/* Foundation plinth */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[BUILDING_W + 0.3, 0.12, BUILDING_D + 0.3]} />
        <meshStandardMaterial color={colColor} metalness={0.45} roughness={0.4} />
      </mesh>

      {/* Perimeter columns */}
      {[-BUILDING_W / 2, BUILDING_W / 2].map((x) =>
        [-BUILDING_D / 2, BUILDING_D / 2].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, BUILDING_H / 2, z]}>
            <boxGeometry args={[0.18, BUILDING_H, 0.18]} />
            <meshStandardMaterial color={colColor} metalness={0.45} roughness={0.4} />
          </mesh>
        )),
      )}

      {/* Core column */}
      <mesh position={[0, BUILDING_H / 2, 0]}>
        <boxGeometry args={[0.3, BUILDING_H, 0.3]} />
        <meshStandardMaterial color={colColor} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Floor slabs */}
      {FLOORS.map((yy) => (
        <mesh key={yy} position={[0, yy, 0]}>
          <boxGeometry args={[BUILDING_W - 0.06, 0.07, BUILDING_D - 0.06]} />
          <meshStandardMaterial color={slabColor} metalness={0.35} roughness={0.45} />
        </mesh>
      ))}

      {/* Transfer beam near ground */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[BUILDING_W - 0.1, 0.16, 0.2]} />
        <meshStandardMaterial color={colColor} metalness={0.45} roughness={0.4} />
      </mesh>
    </group>
  );
}