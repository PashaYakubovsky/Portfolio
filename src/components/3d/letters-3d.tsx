import { extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import amatic from "../../fonts/AmaticSC-Bold.ttf";
import { Text } from "@react-three/drei";
import { useTargetState } from "../../pages/home/home-v2";
import { useRef } from "react";

extend({ TextGeometry });

const Letters3D = ({ text = "test", ...args }: { text: string }) => {
    const setTarget = useTargetState((state) => state.setTarget);
    const mesh = useRef();
    return (
        <Text
            {...args}
            ref={mesh}
            color="#fff"
            fontSize={5}
            font={amatic}
            position={[0, 0, 29]}
            rotation={[0, Math.PI, 0]}
            onClick={() => setTarget(mesh)}
            textAlign="center"
        >
            {text}
        </Text>
    );
};

export default Letters3D;
