import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";

const Camera = () => {
    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(0, 5, -5);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
};

export default Camera;
