import { Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

const Stars3D = () => {
    const starsRef = React.useRef<any>(null!);
    const { camera } = useThree();

    useFrame(() => {
        if (starsRef.current) starsRef.current.rotation.y += 0.002;
    });

    // Use the useFrame hook to update the camera position on every frame of the render loop
    useFrame(() => {
        if (starsRef.current) {
            const { y } = starsRef.current.position;
            // Increase camera altitude as stairs are climbed
            camera.position.setY(y + 5);
            camera.lookAt(0, y, 0); // Look at the next step in front of the camera
        }
    });

    useEffect(() => {
        camera.position.set(0, 5, -200);
    }, [camera.position]);

    camera.lookAt(0, 0, 0);

    // const deg2rad = (degrees: number) => degrees * (Math.PI / 180);

    return (
        <Stars
            ref={starsRef}
            radius={0.0001}
            count={1000}
            factor={1}
            saturation={0}
            fade
            speed={2}
        />
    );
};

export default Stars3D;
