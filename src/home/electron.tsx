import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Trail } from "@react-three/drei";

function Electron({ radius = 2.75, speed = 6, ...props }) {
    const ref = useRef<any>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() * speed;
        if (ref.current?.position)
            ref.current.position.set(
                Math.sin(t) * radius,
                (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25,
                0
            );
    });
    return (
        <group {...props}>
            <Trail
                local
                width={5}
                length={6}
                color={new THREE.Color(2, 1, 10)}
                attenuation={(t) => t * t}
            >
                <mesh ref={ref}>
                    <sphereGeometry args={[0.25]} />
                    <meshBasicMaterial color={[10, 1, 10]} toneMapped={false} />
                </mesh>
            </Trail>
        </group>
    );
}

export default Electron;
