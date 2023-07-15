import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { generate3dObjs, useConfigStore } from "../../store/store";

const ChatBackground = () => {
    const { range } = useControls({
        range: { value: 0, min: 0, max: 300, step: 10 },
    });
    const changeObjects3d = useConfigStore((state) => state.changeObjects3d);

    const objects3dRanges = useConfigStore((state) => state.objects3dRanges);
    const target = useRef(new THREE.Vector3());

    useEffect(() => {
        changeObjects3d(generate3dObjs({ length: objects3dRanges, r: range }));
    }, [changeObjects3d, objects3dRanges, range]);
    return (
        <Canvas
            style={{
                position: "absolute",
                left: 0,
                top: 0,
                zIndex: 0,
                display: range === 0 ? "none" : "block",
            }}
            camera={{ position: [0, 0, 5], fov: 50 }}
            performance={{ min: 0.1 }}
            onMouseMove={(e) =>
                target.current.set(
                    (e.clientX / window.innerWidth ?? 1) * 2 - 1,
                    -(e.clientY / window.innerHeight ?? 1) * 2 + 1,
                    0
                )
            }
        >
            <ChatBackgroundInner range={range} target={target.current} />
        </Canvas>
    );
};

const ChatBackgroundInner = ({
    target,
}: {
    target: THREE.Vector3;
    range: number;
}) => {
    const data3dObjs = useConfigStore((state) => state.objects3d);
    return (
        <>
            <ambientLight intensity={0.5} />

            <directionalLight intensity={0.3} position={[5, 25, 20]} />

            {/* <ModelAnimations /> */}

            {data3dObjs.map((model) => (
                <PaperAirplane
                    key={model.random}
                    props={
                        {
                            position: model.position,
                            rotation: model.rotation,
                        } as unknown
                    }
                    target={target}
                />
            ))}

            {/* <Model /> */}
            {/* <Airplanes data={data3dObjs} range={range} /> */}

            {/* <Environment preset="city" /> */}

            <OrbitControls autoRotate autoRotateSpeed={1} />
        </>
    );
};

const PaperAirplane = ({
    target,
    props,
}: {
    props: MeshProps;
    target: THREE.Vector3;
}) => {
    const meshRef = useRef<THREE.Mesh>(null);

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame(() => {
        if (meshRef.current && hovered) {
            // Calculate the direction vector between the mesh and the target
            const direction = new THREE.Vector3().subVectors(
                target,
                meshRef.current.position
            );

            // Normalize the direction vector to a length of 1
            direction.normalize();

            // Set the new position of the mesh based on the direction vector
            meshRef.current.position.add(direction.multiplyScalar(0.09));

            // Rotate the mesh slightly on every frame
            meshRef.current.rotation.x += 0.05;
            meshRef.current.rotation.y += 0.1;
        }
    });

    return (
        <mesh
            ref={meshRef}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
            onClick={() => setActive(!active)}
            scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
            position={[0, 0, 0]}
            {...props}
        >
            <coneGeometry attach="geometry" args={[1, 0.5, 5]} />
            <meshStandardMaterial
                attach="material"
                color={hovered ? "#FFDAB9" : "#F5DEB3"}
            />
        </mesh>
    );
};

export default ChatBackground;
