import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { vhToPixels } from "src/components/scroll-to-buttons/scroll-to-bottom";
import * as THREE from "three";

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
    // Use useThree hook to get camera raycaster
    const { camera } = useThree();
    const raycaster = new THREE.Raycaster();

    // Define mouse coordinates
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            setMouse({
                x: (event.clientX / window.innerWidth) * 2 - 1,
                y: -(event.clientY / window.innerHeight) * 2 + 1,
            });
        };

        window.addEventListener("mousemove", onMouseMove);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    // Add event listener to check for mouse hover on object
    useFrame(() => {
        const mouseVector = new THREE.Vector2(mouse.x, mouse.y);
        raycaster.setFromCamera(mouseVector, camera);
        const intersects = raycaster.intersectObjects([mesh.current]);
        if (intersects.length > 0) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "auto";
        }
    });

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
