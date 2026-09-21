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
 * Fire fighting layer — a central red riser with horizontal mains and
 * a fire pump block near the entrance; a slow red pulse travels upward
 * while active. Purely visual representation, not engineering data.
 */
export function FireFightingLayer({ active, baseOpacity = 0, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4, drive);

  const pipe = active ? "#f87171" : "#5a2c2c";
  const main = active ? "#fca5a5" : "#6b3a3a";

  return (
    <group ref={ref}>
      {/* Sprinkler riser */}
      <mesh position={[0, BUILDING_H / 2, -BUILDING_D / 2 + 0.16]}>
        <cylinderGeometry args={[0.11, 0.11, BUILDING_H, 10]} />
        <meshStandardMaterial color={pipe} metalness={0.45} roughness={0.35} />
      </mesh>

      {/* Horizontal mains per floor + branch arms */}
      {FLOORS.map((yy) => (
        <group key={yy}>
          <mesh position={[0, yy, -BUILDING_D / 2 + 0.34]}>
            <boxGeometry args={[BUILDING_W - 0.3, 0.05, 0.05]} />
            <meshStandardMaterial color={main} metalness={0.45} roughness={0.3} />
          </mesh>
          <mesh position={[0, yy, BUILDING_D / 2 - 0.45]}>
            <boxGeometry args={[0.05, 0.05, BUILDING_D - 0.6]} />
            <meshStandardMaterial color={pipe} metalness={0.45} roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Fire pump block near ground */}
      <group position={[0, 0.3, BUILDING_D / 2 + 0.18]}>
        <mesh>
          <boxGeometry args={[0.55, 0.5, 0.35]} />
          <meshStandardMaterial color={pipe} metalness={0.5} roughness={0.3} />
        </mesh>
        <mesh position={[0.35, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 10]} />
          <meshStandardMaterial color="#2f2f2f" metalness={0.3} roughness={0.4} />
        </mesh>
      </group>

      <FirePulse active={active} color="#fca5a5" />
    </group>
  );
}

function FirePulse({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (!active || !pulse.current) {
      if (pulse.current) pulse.current.visible = active;
      return;
    }
    offset.current = (offset.current + delta * 0.28) % 1;
    const y = 0.4 + offset.current * (BUILDING_H - 0.7);
    pulse.current.position.set(0, y, -BUILDING_D / 2 + 0.16);
    pulse.current.visible = true;
  });

  return (
    <mesh ref={pulse} visible={false}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}