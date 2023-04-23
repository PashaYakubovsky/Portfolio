import { useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import { useTargetState } from "./home-v2";
import { BufferGeometry, Material, Mesh } from "three";

function* toggleColorAnimation() {
    let toggle = true;

    while (true) {
        toggle = !toggle;
        yield toggle;
        console.log(toggle);
    }
}

const Box3D = (props: Record<string, unknown>) => {
    const myMesh = React.useRef<Mesh<BufferGeometry, Material>>(null!);
    const setTarget = useTargetState((state) => state.setTarget);
    const [hovered, setHovered] = useState(false);

    useCursor(hovered);

    useFrame(({ clock }) => {
        // if (animationGenerator.next()) {
        // Calculate a new color based on the elapsed time
        const t = clock.getElapsedTime();
        const r = Math.sin(t) * 0.2 + 0.2;
        const g = Math.cos(t) * 0.2 + 0.2;
        const b = Math.sin(t + Math.PI / 2) * 2.2;

        // Update the material's color property
        const material = myMesh.current.material;
        (
            material as unknown as {
                color: { setRGB: (r: number, g: number, b: number) => void };
            }
        ).color.setRGB(r, g, b);
        // }
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
