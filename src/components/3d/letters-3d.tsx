import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import amatic from "../../fonts/AmaticSC-Bold.ttf";
import { Text } from "@react-three/drei";
import { useRef } from "react";

extend({ TextGeometry });

const Letters3D = ({ text = "test", ...args }: { text: string }) => {
    const mesh = useRef();
    return (
        <Text
            position={[0, 10, 29]}
            {...args}
            receiveShadow
            castShadow
            ref={mesh}
            color="#fff"
            fontSize={5}
            font={amatic}
            rotation={[0, Math.PI, 0]}
            textAlign="center"
        >
            {text}
        </Text>
    );
};

export default Letters3D;
