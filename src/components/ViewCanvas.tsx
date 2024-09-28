"use client";

import dynamic from "next/dynamic";

import { View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

interface ViewCanvasProps {}

const ViewCanvas = ({}: ViewCanvasProps) => {
  return (
    <>
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
        {/* 
        <Scene /> */}
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
        {/* <Perf /> */}
      </Canvas>
      <Loader />
    </>
  );
};

export default ViewCanvas;
