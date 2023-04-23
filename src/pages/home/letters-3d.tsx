import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import amatic from "../../fonts/AmaticSC-Bold.ttf";
import { Text } from "@react-three/drei";
import { useTargetState } from "./home-v2";
import { useRef } from "react";

extend({ TextGeometry });

const Letters3D = ({ text = "test" }: { text: string }) => {
    const setTarget = useTargetState((state) => state.setTarget);
    const mesh = useRef();
    return (
        <Text
            ref={mesh}
            color="#fff"
            fontSize={5}
            font={amatic}
            position={[0, 0, 0]}
            rotation={[0, Math.PI, 0]}
            onClick={() => setTarget(mesh)}
            textAlign="center"
        >
            {text}
        </Text>
    );
};

export default Letters3D;
