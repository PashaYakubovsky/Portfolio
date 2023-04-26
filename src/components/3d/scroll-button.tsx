import { Sphere } from "@react-three/drei";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { isMobile } from "react-device-detect";
import { vhToPixels } from "src/components/scroll-to-buttons/scroll-to-bottom";
import { useConfigStore } from "src/store/store";
import { BufferGeometry, Material, Mesh } from "three";

// import * as THREE from "three";
// import { PerspectiveCamera, Vector3 } from "three";

const ScrollButton3d = (props: MeshProps) => {
    const mesh = useRef<Mesh<BufferGeometry, Material | Material[]> | null>(
        null
    );
    const { changeShowGlitch } = useConfigStore();
    // Use useThree hook to get camera raycaster
    const { camera } = useThree();
    // const raycaster = new THREE.Raycaster();
    // const cameraRef = useRef<PerspectiveCamera>(null);

    // Define mouse coordinates
    // const [mouse, setMouse] = useState({ x: 0, y: 0 });

    // useEffect(() => {
    //     const onMouseMove = (event: MouseEvent) => {
    //         setMouse({
    //             x: (event.clientX / window.innerWidth) * 2 - 1,
    //             y: -(event.clientY / window.innerHeight) * 2 + 1,
    //         });
    //     };

    //     window.addEventListener("mousemove", onMouseMove);

    //     return () => {
    //         window.removeEventListener("mousemove", onMouseMove);
    //     };
    // }, []);

    // useFrame(() => {
    //     try {
    //         const currentPosition = cameraRef.current?.position.clone();
    //         if (currentPosition && mesh.current) {
    //             const targetDirection = camera.position
    //                 ?.clone()
    //                 .sub(currentPosition);
    //             const targetDistance = targetDirection.length();
    //             targetDirection.normalize();

    //             const dampingFactor = 0.1;

    //             const distance = mesh.current.scale.distanceTo(currentPosition);
    //             if (distance > 0.01 && currentPosition) {
    //                 let speed = targetDistance * dampingFactor;
    //                 if (speed > distance) {
    //                     speed = distance;
    //                 }

    //                 const movement = targetDirection.multiplyScalar(speed);
    //                 currentPosition.add(movement);
    //                 cameraRef.current?.position.set(
    //                     currentPosition.x,
    //                     currentPosition.y,
    //                     currentPosition.z
    //                 );
    //             }
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // });

    // Use the useFrame hook to update the camera position on every frame of the render loop
    useFrame(() => {
        if (mesh.current) {
            const { y } = mesh.current.position;
            // Increase camera altitude as stairs are climbed
            camera.position.setY(y + 10);
            camera.lookAt(0, y, 0); // Look at the next step in front of the camera
        }
    });

    // useFrame(({ clock }) => {
    //     if (mesh.current) {
    //         const a = clock.getElapsedTime();
    //         mesh.current.rotation.x = a;
    //     }
    // });

    useFrame(({ clock }) => {
        if (mesh.current) {
            mesh.current.rotation.x = clock.getElapsedTime();
            mesh.current.rotation.y = clock.getElapsedTime();
        }
    });

    useFrame(() => {
        if (mesh.current) mesh.current.rotation.y += 0.01;
    });

    // Add event listener to check for mouse hover on object
    // useFrame(() => {
    //     const mouseVector = new THREE.Vector2(mouse.x, mouse.y);
    //     raycaster.setFromCamera(mouseVector, camera);

    //     const intersects = raycaster.intersectObjects([mesh.current]);

    //     if (intersects.length > 0) {
    //         document.body.style.cursor = "pointer";
    //     } else {
    //         document.body.style.cursor = "auto";
    //     }
    // });

    return (
        <group>
            <mesh
                ref={(node) => {
                    mesh.current = node;
                }}
                receiveShadow
                castShadow
                {...props}
                onPointerOver={() => {
                    if (!isMobile) changeShowGlitch?.(true);
                    document.body.style.cursor = "pointer";
                }}
                onPointerOut={() => {
                    if (!isMobile) changeShowGlitch?.(false);
                    document.body.style.cursor = "default";
                }}
                onClick={() => {
                    window.scrollBy({
                        behavior: "smooth",
                        top: document.body.scrollHeight - vhToPixels(100) - 30,
                    });
                }}
            >
                <Sphere args={[5, 30, 30]}>
                    <meshBasicMaterial
                        color={"lightgrey"}
                        attach="material"
                        clipShadows
                    />
                </Sphere>
            </mesh>
        </group>
    );
};

export default ScrollButton3d;
