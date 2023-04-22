import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useState } from "react";
import { useTargetState } from "./home-v2";

const Box3D = (props: Record<string, unknown>) => {
    const myMesh = React.useRef<any>();
    const setTarget = useTargetState((state) => state.setTarget);
    const [hovered, setHovered] = useState(false);

    useCursor(hovered);

    useFrame(({ clock }) => {
        if (myMesh.current) {
            if (props?.direction) {
                Math.round(
                    (myMesh.current.rotation.x = clock.getElapsedTime() / 4)
                );
            }
        }
    });
    return (
        <mesh
            {...props}
            ref={myMesh}
            onClick={(e) => {
                setTarget(e.object);
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry />
            {/* <meshNormalMaterial /> */}
            <meshBasicMaterial color={0xfff1ef} attach="material" clipShadows />
        </mesh>
    );
};

export default Box3D;
