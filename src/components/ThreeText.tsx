import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Text } from "@react-three/drei";
import * as THREE from "three";

const ThreeText = ({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) => {
  const words = sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("()min-width: 950px", true);

  return words.map((word, index) => (
    <Text
      color={color}
      key={`${index}-${word}`}
      scale={isDesktop ? 1 : 0.5}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"} // Rotate around center rather than top-left
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?" // Preloads the characters we need
    >
      {word}
    </Text>
  ));
};

export default ThreeText;
