import { useThree } from "@react-three/fiber";
import React from "react";

const Camera = () => {
    const { camera } = useThree();

    React.useEffect(() => {
        camera.position.set(0, 5, -30);
    }, [camera.position]);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
};

export default Camera;
