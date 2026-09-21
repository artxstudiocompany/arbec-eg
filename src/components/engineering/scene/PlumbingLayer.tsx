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
 * Plumbing layer — supply riser + drainage riser with per-floor laterals;
 * a water pulse travels up the supply riser while active.
 */
export function PlumbingLayer({ active, baseOpacity = 0, drive }: LayerProps) {
  const ref = useRef<React.ElementRef<"group">>(null);
  useGroupFade(ref, active ? 1 : baseOpacity, active ? 5 : 4, drive);

  const supply = active ? "#60a5fa" : "#2a4a80";
  const drain = active ? "#3a7bd5" : "#2f3f66";

  return (
    <group ref={ref}>
      {/* Supply riser */}
      <mesh position={[-BUILDING_W / 2 + 0.32, BUILDING_H / 2, BUILDING_D / 2 - 0.2]}>
        <cylinderGeometry args={[0.07, 0.07, BUILDING_H, 10]} />
        <meshStandardMaterial color={supply} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Drain riser */}
      <mesh position={[-BUILDING_W / 2 + 0.45, BUILDING_H / 2, BUILDING_D / 2 - 0.2]}>
        <cylinderGeometry args={[0.09, 0.09, BUILDING_H, 10]} />
        <meshStandardMaterial color={drain} metalness={0.45} roughness={0.35} />
      </mesh>

      {/* Per-floor laterals */}
      {FLOORS.map((yy) => (
        <mesh key={yy} position={[-BUILDING_W / 2 + 0.2, yy, BUILDING_D / 2 - 0.3]}>
          <boxGeometry args={[0.6, 0.05, 0.05]} />
          <meshStandardMaterial color={supply} metalness={0.5} roughness={0.3} />
        </mesh>
      ))}

      <WaterPulse active={active} color="#93c5fd" />
    </group>
  );
}

function WaterPulse({ active, color }: { active: boolean; color: string }) {
  const pulse = useRef<THREE.Mesh>(null);
  const offset = useRef(0);

  useFrame((_, delta) => {
    if (!active || !pulse.current) {
      if (pulse.current) pulse.current.visible = active;
      return;
    }
    offset.current = (offset.current + delta * 0.42) % 1;
    const y = 0.3 + offset.current * (BUILDING_H - 0.5);
    pulse.current.position.set(-BUILDING_W / 2 + 0.32, y, BUILDING_D / 2 - 0.2);
    pulse.current.visible = true;
  });

  return (
    <mesh ref={pulse} visible={false}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}