import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Snowflake = ({ color, size }: { color: THREE.Color; size: number }) => {
    const ref = useRef<THREE.Points<
        THREE.BufferGeometry,
        THREE.Material | THREE.Material[]
    > | null>(null);
    const texture = useRef(null);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.x = clock.getElapsedTime() * 0.2;
            ref.current.rotation.y = clock.getElapsedTime() * 0.3;
            ref.current.rotation.z = clock.getElapsedTime() * 0.4;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    // attachObject={["attributes", "position"]}
                    count={10000}
                    array={
                        new Float32Array(
                            Array.from(
                                { length: 30000 },
                                () => Math.random() * 2000 - 1000
                            )
                        )
                    }
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                attach="material"
                color={color}
                size={size}
                transparent={true}
                depthTest={false}
                blending={THREE.AdditiveBlending}
            >
                <texture attach="map" ref={texture} />
            </pointsMaterial>
        </points>
    );
};

const Snowfall = () => {
    const materialParams = [
        {
            color: new THREE.Color(0xffffff),
            texturePath: "../assets/snow.png",
            size: 500,
        },
    ];

    return (
        <>
            {materialParams.map(({ color, texturePath, size }) => (
                <Snowflake key={texturePath} color={color} size={size} />
            ))}
        </>
    );
};

export default Snowfall;
