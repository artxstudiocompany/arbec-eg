"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  BUILDING_W,
  BUILDING_D,
  BUILDING_H,
  FLOORS,
  useGroupFade,
  type LayerProps,
} from "./LayerPrimitives";

/**
 * Electrical layer — vertical cable bus + per-floor tray runs with
 * light points; an amber energy pulse climbs the bus while active.
 */
export function ElectricalLayer({ active, baseOpacity = 0, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4, drive);

  const tray = active ? "#f0b24a" : "#4a3d1f";
  const point = active ? "#ffd48a" : "#6b5a2e";

  return (
    <group ref={ref}>
      {/* Vertical cable bus */}
      <mesh position={[BUILDING_W / 2 - 0.16, BUILDING_H / 2, -BUILDING_D / 2 + 0.16]}>
        <boxGeometry args={[0.09, BUILDING_H, 0.09]} />
        <meshStandardMaterial color={tray} metalness={0.5} roughness={0.35} />
      </mesh>

      {/* Per-floor trays */}
      {FLOORS.map((yy) => (
        <mesh key={yy} position={[BUILDING_W / 2 - 0.16, yy + 0.05, 0]}>
          <boxGeometry args={[0.5, 0.05, BUILDING_D - 0.5]} />
          <meshStandardMaterial color={tray} metalness={0.5} roughness={0.3} />
        </mesh>
      ))}

      {/* Lighting points on the far face */}
      {[1.05, 1.75, 2.45, 3.15, 3.85].map((yy) => (
        <mesh key={yy} position={[0, yy, BUILDING_D / 2 + 0.03]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial
            color={point}
            emissive={point}
            emissiveIntensity={active ? 1.4 : 0.1}
            metalness={0.2}
            roughness={0.3}
          />
        </mesh>
      ))}

      <BusPulse active={active} color="#ffd48a" />
    </group>
  );
}

function BusPulse({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (!active || !pulse.current) {
      if (pulse.current) pulse.current.visible = active;
      return;
    }
    offset.current = (offset.current + delta * 0.3) % 1;
    const y = 0.3 + offset.current * (BUILDING_H - 0.5);
    pulse.current.position.set(BUILDING_W / 2 - 0.16, y, 0);
    pulse.current.visible = true;
  });

  return (
    <mesh ref={pulse} visible={false}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}