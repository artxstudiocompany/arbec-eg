"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { INFRASTRUCTURE_SYSTEMS } from "@/data/infrastructure";
import type { InfraSystemId } from "@/data/infrastructure";
import { InfrastructureStage3D } from "./InfrastructureStage3D";
import { InfrastructureNetworkLayer3D } from "./InfrastructureNetworkLayer3D";
import { InfrastructureCameraRig } from "./InfrastructureCameraRig";
import type { InfraSceneDriver } from "./infra-utils";
import { SITE_CAMERA_POS } from "./infra-utils";

/**
 * INFRASTRUCTURE SCENE (desktop).
 * Same architecture and lighting language as the Phase 3 engineering core —
 * a shared Three.js / React Three Fiber system reused, never duplicated.
 * The scroll progress and the active system reach the scene through a plain
 * mutable ref so per-frame camera/opacity work never triggers React renders.
 */
export function InfrastructureScene3D({
  activeId,
  progressRef,
  reduced,
  active,
}: {
  activeId: InfraSystemId | null;
  progressRef: InfraSceneDriver;
  reduced: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!bg-transparent"
      camera={{ position: [SITE_CAMERA_POS.x, SITE_CAMERA_POS.y, SITE_CAMERA_POS.z], fov: 35 }}
    >
      <color attach="background" args={["#060a12"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 10, 6]} intensity={1.3} />
      <directionalLight position={[-6, 6, -4]} intensity={0.5} color="#4da3ff" />
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#7cc0ff" />

      <Suspense fallback={null}>
        <InfrastructureStage3D progressRef={progressRef} reduced={reduced} />
        {INFRASTRUCTURE_SYSTEMS.map((system, i) => (
          <InfrastructureNetworkLayer3D
            key={system.id}
            system={system}
            isSelected={activeId === system.id}
            activeId={activeId}
            progressRef={progressRef}
            index={i}
          />
        ))}
        <InfrastructureCameraRig
          progressRef={progressRef}
          activeId={activeId}
          reduced={reduced}
        />
      </Suspense>
    </Canvas>
  );
}

export default InfrastructureScene3D;
