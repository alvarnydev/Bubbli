"use client";

import FloatingCan from "@/components/FloatingCan";
import ThreeText from "@/components/ThreeText";
import { useGSAP } from "@gsap/react";
import { Content } from "@prismicio/client";
import { Cloud, Clouds, Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import * as THREE from "three";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface SkyDiveSceneProps {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
}

const SkyDiveScene = ({ sentence, flavor }: SkyDiveSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudGroupRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const ANGLE = 75 * (Math.PI / 180); // 1 Radiant Degree
  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);
  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !cloudGroupRef.current ||
      !canRef.current ||
      !wordsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    // Set initial positions
    gsap.set(cloudGroupRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, {
      ...getXYPositions(-4),
    });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPositions(7), z: 2 },
    );

    // Spinning can
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    // Infinite cloud movement
    const DISTANCE = 15;
    const DURATION = 6;

    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 2)}`,
      x: `+=${getXPosition(DISTANCE * -2)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    // Scroll animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl
      // Body background color
      .to("body", {
        backgroundColor: "#C0F0F5",
        overwrite: "auto",
        duration: 0.1,
      })
      // Clouds come in
      .to(cloudGroupRef.current.position, { z: 0, duration: 0.3 }, 0)
      // Can comes in
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      // Words come in and out
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPositions(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0,
      )
      // Can fades out
      .to(canRef.current.position, {
        ...getXYPositions(4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      // Clouds fade out
      .to(cloudGroupRef.current.position, { z: 7, duration: 0.5 });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntenstiy={3}
          floatSpeed={3}
        >
          <pointLight intensity={30} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>

      <Clouds ref={cloudGroupRef}>
        <Cloud bounds={[10, 10, 2]} ref={cloud1Ref} />
        <Cloud bounds={[10, 10, 2]} ref={cloud2Ref} />
      </Clouds>

      {/* Text */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color="#F97315" />}
      </group>

      {/* <OrbitControls /> */}

      {/* Lights */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
};

export default SkyDiveScene;
