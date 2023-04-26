import { Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { Mesh, BufferGeometry, Material } from "three";

const Stars3D = () => {
    const starsRef = React.useRef<Mesh<
        BufferGeometry,
        Material | Material[]
    > | null>(null);

    useFrame(() => {
        if (starsRef.current) starsRef.current.rotation.y += 0.002;
    });

    // camera.lookAt(220, 22220, 2);

    // const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

    return (
        <Stars
            ref={(node) => {
                starsRef.current = node as Mesh<
                    BufferGeometry,
                    Material | Material[]
                > | null;
            }}
            radius={0.0001}
            count={500}
            factor={4}
            saturation={0}
            fade
            speed={2}
        />
    );
};

export default Stars3D;
