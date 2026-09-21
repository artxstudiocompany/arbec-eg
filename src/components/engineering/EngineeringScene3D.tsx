"use client";

import { Canvas } from "@react-three/fiber";
import { Grid, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { EngineeringBuilding } from "./EngineeringBuilding";
import { CameraRig } from "./scene/CameraRig";
import type { EngineeringLayerId } from "@/data/engineering-core";
import { isReducedMotion } from "@/lib/motion";

export function EngineeringScene3D({
  active = true,
  activeLayer,
  reduced = false,
  pointerInteract = true,
}: {
  active?: boolean;
  activeLayer: EngineeringLayerId;
  reduced?: boolean;
  pointerInteract?: boolean;
}) {
  const motion = reduced || isReducedMotion();

  return (
    <Canvas
      frameloop={active ? "always" : "demand"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!bg-transparent"
      camera={{ position: [8.5, 4.8, 11.5], fov: 35 }}
    >
      <PerspectiveCamera makeDefault position={[8.5, 4.8, 11.5]} fov={35} />
      <color attach="background" args={["#060a12"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[8, 10, 6]} intensity={1.4} />
      <directionalLight position={[-6, 6, -4]} intensity={0.5} color="#4da3ff" />
      <pointLight position={[0, 4, 0]} intensity={0.4} color="#7cc0ff" />

      <Suspense fallback={null}>
        <group position={[0, 0, 0]}>
          <EngineeringBuilding activeLayer={activeLayer} />
        </group>

        {/* Site ground with engineering grid */}
        <Grid
          position={[0, -0.02, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.6}
          cellColor="#123a3a"
          sectionSize={2.5}
          sectionThickness={1}
          sectionColor="#1c4a4a"
          fadeDistance={18}
          fadeStrength={1.4}
          infiniteGrid={false}
        />
        {active && !motion && pointerInteract && <CameraRig reduced={motion} />}
      </Suspense>
    </Canvas>
  );
}

export default EngineeringScene3D;
