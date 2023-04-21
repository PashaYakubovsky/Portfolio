/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import style from "./home.module.scss";
import { Canvas } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Atom from "./atom";

const Home = () => {
    // useEffect(() => {}, []);

    return (
        <main className={style.container} id="main">
            <Canvas>
                <color attach="background" args={["#000"]} />
                <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                    <Atom />
                </Float>
                <Stars saturation={0} count={800} speed={1} />
                <EffectComposer>
                    <Bloom mipmapBlur luminanceThreshold={1} radius={0.2} />
                </EffectComposer>
            </Canvas>

            <div></div>
        </main>
    );
};

export default Home;
