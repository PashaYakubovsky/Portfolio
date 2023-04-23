import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { vhToPixels } from "src/components/scroll-to-buttons/scroll-to-bottom";

const ScrollButton3d = (props: any) => {
    const mesh = useRef<any>();

    useFrame(() => {
        if (mesh.current) mesh.current.rotation.y += 0.01;
    });

    // function zoom(constant: number) {
    //     mesh.current.camera.position.x =
    //         mesh.current.camera.position.x * constant;
    //     mesh.current.camera.position.y =
    //         mesh.current.camera.position.y * constant;
    //     mesh.current.camera.position.z =
    //         mesh.current.camera.position.z * constant;
    // }

    return (
        <mesh
            ref={mesh}
            receiveShadow
            castShadow
            {...props}
            onClick={() => {
                window.scrollBy({
                    behavior: "smooth",
                    top: document.body.scrollHeight - vhToPixels(100) - 30,
                });
            }}
        >
            <sphereGeometry args={[5, 30, 30]} attach="geometry" />
            <meshBasicMaterial
                color={0xfff1ef}
                attach="material"
                clipShadows
                shadowSide={2}
            />
        </mesh>
    );
};

export default ScrollButton3d;
