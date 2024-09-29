"use client";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Group } from "three";
import ArrowButton from "./ArrowButton";
import { WavyCircles } from "./WavyCircles";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime" },
  {
    flavor: "strawberryLemonade",
    color: "#690B3D",
    name: "Strawberry Lemonade",
  },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);

  const changeFlavor = (index: number) => {
    if (!sodaCanRef.current) return;

    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const timeline = gsap.timeline();
    timeline
      // Spin can
      .to(
        sodaCanRef.current.rotation,
        {
          y:
            index > currentFlavorIndex
              ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
              : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      // Change background and fill color to new can
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      // Fade text out
      .to(
        ".text-wrapper",
        {
          duration: 0.2,
          y: -10,
          opacity: 0,
        },
        0,
      )
      // Change can on the midpoint of animation (0.5)
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      // Fade text back in
      .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />
      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* Left */}
        <ArrowButton
          label="Previous Flavor"
          direction="left"
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
        />
        {/* Can */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntenstiy={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>

          <Environment
            files="/hdr/lobby.hdr"
            backgroundIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
        </View>
        <ArrowButton
          label="Next Flavor"
          direction="right"
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
        />
        <directionalLight intensity={6} position={[0, 1, 1]} />
        {/* Right */}
      </div>
      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
