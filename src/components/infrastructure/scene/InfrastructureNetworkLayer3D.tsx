"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type {
  InfrastructureSystem,
  InfraNodeKind,
  InfraPoint,
  InfraSystemId,
} from "@/data/infrastructure";
import type { InfraSceneDriver } from "./infra-utils";
import { rangeStep, smoothstep } from "./infra-utils";

/**
 * One infrastructure discipline as a 3D underground network — polyline
 * routes riding just under the surface, a clarified node set, and (when it
 * is the active selection) a controlled pulse travelling its paths.
 * Every unit damps its own opacity from the shared scroll progress, so
 * fading in, dimming and activation never trigger React re-renders.
 */

function toScene(points: InfraPoint[]): { x: number; y: number; z: number }[] {
  return points.map((p) => ({ x: p.x, y: p.depth, z: p.z }));
}

function useLayerTarget(
  isLead: boolean,
  activeId: InfraSystemId | null,
  progressRef: InfraSceneDriver,
  stagger: number,
) {
  const target = useRef(0);
  useFrame((_, delta) => {
    const revealed = rangeStep(progressRef.current - stagger * 0.045, 0.34, 0.64);
    const base = smoothstep(revealed) * 0.55;
    const desired =
      activeId === null
        ? base
        : isLead
          ? Math.max(0.95, base)
          : base * 0.24;
    target.current = THREE.MathUtils.damp(target.current, desired, 4, delta);
  });
  return target;
}

export function InfrastructureNetworkLayer3D({
  system,
  isSelected,
  activeId,
  progressRef,
  index,
}: {
  system: InfrastructureSystem;
  isSelected: boolean;
  activeId: InfraSystemId | null;
  progressRef: InfraSceneDriver;
  index: number;
}) {
  const routes = useMemo(
    () => system.routes.map((route) => toScene(route.points)),
    [system],
  );

  return (
    <group>
      {routes.map((points, r) => (
        <Route3D
          key={`${system.id}-r${r}`}
          points={points}
          accent={system.accent}
          isSelected={isSelected}
          activeId={activeId}
          progressRef={progressRef}
          stagger={index + r * 0.12}
        />
      ))}
      {system.nodes.map((node, ni) => (
        <Node3D
          key={`${system.id}-n${ni}`}
          kind={node.kind}
          pos={node.pos}
          accent={system.accent}
          isSelected={isSelected}
          activeId={activeId}
          progressRef={progressRef}
          stagger={index}
        />
      ))}
    </group>
  );
}

function Route3D({
  points,
  accent,
  isSelected,
  activeId,
  progressRef,
  stagger,
}: {
  points: { x: number; y: number; z: number }[];
  accent: string;
  isSelected: boolean;
  activeId: InfraSystemId | null;
  progressRef: InfraSceneDriver;
  stagger: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const pulseOffset = useRef(0);
  const isLead = activeId !== null && isSelected;
  const target = useLayerTarget(isLead, activeId, progressRef, stagger);

  const { geometry, lens, total } = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, p.y, p.z)),
    );
    const lens = [0];
    let acc = 0;
    for (let i = 1; i < points.length; i += 1) {
      acc += Math.hypot(
        points[i].x - points[i - 1].x,
        points[i].y - points[i - 1].y,
        points[i].z - points[i - 1].z,
      );
      lens.push(acc);
    }
    return { geometry: geo, lens, total: acc };
  }, [points]);

  const material = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0,
      }),
    [accent],
  );
  const line = useMemo(
    () => new THREE.Line(geometry, material),
    [geometry, material],
  );
  const matRef = useRef(material);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    const op = target.current;
    matRef.current.opacity = THREE.MathUtils.damp(
      matRef.current.opacity,
      op,
      4,
      delta,
    );

    const pulse = pulseRef.current;
    if (!pulse || !total || total <= 0) return;
    if (!isLead || op < 0.18) {
      pulse.visible = false;
      return;
    }
    pulseOffset.current = (pulseOffset.current + delta * 0.32) % 1;
    const dist = pulseOffset.current * total;
    let seg = 0;
    while (seg < lens.length - 2 && lens[seg + 1] < dist) seg += 1;
    const t = lens[seg + 1] === lens[seg] ? 0 : (dist - lens[seg]) / (lens[seg + 1] - lens[seg]);
    const a = points[seg];
    const b = points[seg + 1];
    pulse.position.set(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * t + 0.05,
      a.z + (b.z - a.z) * t,
    );
    pulse.visible = true;
  });

  return (
    <group>
      <primitive object={line} />
      <mesh ref={pulseRef} visible={false}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshBasicMaterial color={accent} transparent opacity={0.95} />
      </mesh>
    </group>
  );
}

function Node3D({
  kind,
  pos,
  accent,
  isSelected,
  activeId,
  progressRef,
  stagger,
}: {
  kind: InfraNodeKind;
  pos: InfraPoint;
  accent: string;
  isSelected: boolean;
  activeId: InfraSystemId | null;
  progressRef: InfraSceneDriver;
  stagger: number;
}) {
  const isLead = activeId !== null && isSelected;
  const target = useLayerTarget(isLead, activeId, progressRef, stagger);

  const { geometry, yOffset } = useMemo(() => {
    switch (kind) {
      case "transformer":
        return { geometry: new THREE.BoxGeometry(0.52, 0.34, 0.44), yOffset: -0.18 };
      case "rmu":
        return { geometry: new THREE.BoxGeometry(0.36, 0.3, 0.3), yOffset: -0.18 };
      case "panel":
        return { geometry: new THREE.BoxGeometry(0.16, 0.42, 0.3), yOffset: -0.24 };
      case "manhole":
        return { geometry: new THREE.CylinderGeometry(0.3, 0.34, 0.12, 12), yOffset: -0.06 };
      case "inspection":
        return { geometry: new THREE.CylinderGeometry(0.36, 0.4, 0.16, 12), yOffset: -0.08 };
      case "junction":
      default:
        return { geometry: new THREE.SphereGeometry(0.1, 10, 10), yOffset: 0 };
    }
  }, [kind]);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        metalness: 0.55,
        roughness: 0.4,
        transparent: true,
        opacity: 0,
      }),
    [accent],
  );
  const matRef = useRef(material);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    matRef.current.opacity = THREE.MathUtils.damp(
      matRef.current.opacity,
      target.current,
      4,
      delta,
    );
    void isSelected;
  });

  return (
    <mesh
      geometry={geometry}
      material={material}
      position={[pos.x, pos.depth + yOffset, pos.z]}
    />
  );
}
