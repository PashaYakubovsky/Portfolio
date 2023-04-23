import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { vhToPixels } from "src/components/scroll-to-buttons/scroll-to-bottom";

const ScrollButton3d = (props: any) => {
    const [hovered, setHover] = useState(false);
    const mesh = useRef<any>();

    useFrame(() => {
        if (mesh.current) mesh.current.rotation.y += 0.01;
    });

    return (
        <mesh
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            {...props}
            onClick={() => {
                window.scrollBy({
                    behavior: "smooth",
                    top: document.body.scrollHeight - vhToPixels(100) - 30,
                });
            }}
        >
            <sphereBufferGeometry args={[5, 30, 30]} attach="geometry" />
            <meshBasicMaterial color={0xfff1ef} attach="material" clipShadows />
        </mesh>
    );
};

export default ScrollButton3d;
