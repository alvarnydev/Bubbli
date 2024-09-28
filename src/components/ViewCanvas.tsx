"use client";

import Scene from "@/slices/Hero/Scene";
import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface ViewCanvasProps {}

const ViewCanvas = ({}: ViewCanvasProps) => {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
      camera={{ fov: 30 }}
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <mesh rotation={[0.5, 0.5, 0]} position={[1, 0, 0]}>
        <boxGeometry />
        <meshStandardMaterial color={"hotpink"} />
      </mesh>
      <Scene />
      <View.Port />
      {/* <Perf /> */}
    </Canvas>
  );
};

export default ViewCanvas;
