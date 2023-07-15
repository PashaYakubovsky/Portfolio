import { Canvas, useFrame } from "@react-three/fiber";
import style from "./home.module.scss";
import * as React from "react";
import ScrollToTopButton from "../../components/scroll-to-buttons/scroll-to-top";
import ScrollToBottomButton from "../../components/scroll-to-buttons/scroll-to-bottom";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CasesContext } from "src/contexts/cases-context";
import db from "../../../netlify/db.json";
import JobsCases from "../../components/job-cases/jobs-cases";
import Footer from "../../components/footer/footer";
import Letters3D from "../../components/3d/letters-3d";
import ScrollButton3d from "../../components/3d/scroll-button";
import Stars3D from "../../components/3d/strars-3d";
import Camera from "src/components/3d/camera";
import { BlendFunction, GlitchMode } from "postprocessing";
import {
    EffectComposer,
    Scanline,
    Vignette,
    Bloom,
    Glitch,
    Noise,
} from "@react-three/postprocessing";
import { useConfigStore } from "src/store/store";

// import { throttle } from "lodash";

const HomeV2 = () => {
    const { changeLoader, supportWebGl } = useConfigStore();
    const [data, changeData] = useState<JobExperience[]>([]);
    const [showCanvas, changeShowCanvas] = React.useState(true);
    const observer = React.useRef<IntersectionObserver | null>(null);
    const [showJobs, changeShowJobs] = useState(data.map(() => false));

    // This reference will give us direct access to the mesh
    const interceptor = React.useCallback((node: HTMLDivElement | null) => {
        if (observer.current) {
            observer.current.disconnect();
        }
        observer.current = new IntersectionObserver((entries) => {
            const isIntersecting = entries[0].isIntersecting;
            if (!isIntersecting) {
                changeShowCanvas(false);
            } else {
                changeShowCanvas(true);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    React.useEffect(() => {
        changeData(db?.cases ?? []);

        setTimeout(() => {
            changeLoader?.(false);
        }, 3000);
    }, [changeLoader]);

    return (
        <CasesContext.Provider
            value={{
                jobCases: data,
                changeJobsCases: changeData,
                changeShowJobs,
                showJobs,
            }}
        >
            <div className={style.container}>
                {supportWebGl ? (
                    <div ref={interceptor} className={style.home}>
                        {showCanvas ? <Scene /> : null}
                    </div>
                ) : null}

                <ScrollToBottomButton />

                <ScrollToTopButton />

                <JobsCases />

                <Footer />
            </div>
        </CasesContext.Provider>
    );
};

function Scene() {
    const { bloom, glitch } = useConfigStore((state) => state);
    const text = useConfigStore((state) => state["3dText"]);

    return (
        <Canvas
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
                stencil: false,
            }}
        >
            {bloom ? <BloomEffects /> : null}
            {glitch ? <GlitchEffects /> : null}

            <>
                <directionalLight />

                <Camera />

                <Stars3D />

                <Letters3D text={text} />

                <rectAreaLight
                    width={3}
                    height={3}
                    intensity={1}
                    position={[-2, 0, 5]}
                    lookAt={() => new THREE.Vector3(...[0, 0, 0])}
                    castShadow
                />

                <pointLight
                    position={[0, 0, 0]}
                    intensity={1}
                    color={"#ffffff"}
                />

                <ScrollButton3d position={[0, 0, 0]} />

                <OrbitControls
                    enableZoom={true}
                    maxDistance={100}
                    makeDefault
                />
            </>
        </Canvas>
    );
}

const BloomEffects = () => {
    const scene = React.useRef<THREE.Group | null>(null);
    // const { bloom, glitch } = useConfigStore();
    // useFrame(() => {
    //     if (scene.current) {
    //         scene.current.rotation.y += 0.04;
    //         scene.current.rotation.x += 0.04;
    //         scene.current.rotation.z += 0.04;
    //     }
    // });

    return (
        <group ref={scene}>
            <EffectComposer>
                {/* {bloom || glitch ? (
                    <Glitch
                        // strength={[0.01, 0.02]} // min and max glitch strength
                        mode={GlitchMode.CONSTANT_MILD} // glitch mode
                        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                        ratio={0.6} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                    />
                ) : null} */}

                <Noise opacity={0.1} />
                <Scanline
                    blendFunction={BlendFunction.ALPHA} // blend mode
                    density={0.8} // scanline density
                    opacity={0.1}
                />
                <Bloom
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                    height={200}
                    intensity={1}
                    radius={1}
                />
                <Vignette
                    offset={0.2} // vignette offset
                    darkness={0.9} // vignette darkness
                    eskil={false} // Eskil's vignette technique
                    blendFunction={BlendFunction.NORMAL} // blend mode
                />
            </EffectComposer>
        </group>
    );
};

const GlitchEffects = () => {
    const scene = React.useRef<THREE.Group | null>(null);
    // const { bloom, glitch } = useConfigStore();
    useFrame(() => {
        if (scene.current) {
            scene.current.rotation.y += 0.04;
            scene.current.rotation.x += 0.04;
            scene.current.rotation.z += 0.04;
        }
    });

    return (
        <group ref={scene}>
            <EffectComposer>
                <Glitch
                    // strength={[0.01, 0.02]} // min and max glitch strength
                    mode={GlitchMode.CONSTANT_MILD} // glitch mode
                    active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                    ratio={0.6} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
                />

                <Noise opacity={0.1} />
                <Scanline
                    blendFunction={BlendFunction.ALPHA} // blend mode
                    density={0.8} // scanline density
                    opacity={0.1}
                />
                {/* <Bloom
                    luminanceThreshold={0}
                    luminanceSmoothing={0.9}
                    height={200}
                    intensity={1}
                    radius={1}
                /> */}
                <Vignette
                    offset={0.2} // vignette offset
                    darkness={0.9} // vignette darkness
                    eskil={false} // Eskil's vignette technique
                    blendFunction={BlendFunction.NORMAL} // blend mode
                />
            </EffectComposer>
        </group>
    );
};

export default HomeV2;

// function buildLetters({
//     str,
//     xStart,
//     yStart,
//     zStart,
// }: {
//     str: string;
//     xStart: number;
//     yStart: number;
//     zStart: number;
// }) {
//     const blocks = [];
//     let x = xStart;
//     const y = yStart;
//     const z = zStart;

//     // Define a dictionary of block positions for each letter
//     const letters: Record<string, number[][][]> = {
//         a: [
//             [
//                 [0, 0, 0],
//                 [0, 2, 0],
//                 [0, 3, 0],
//                 [0, 4, 0.5],
//                 [0, 4, 1.5],
//                 [0, 1, 0],
//                 [0, 1, 2],
//                 [0, 2, 2],
//                 [0, 3, 2],
//                 [0, 0, 2],
//                 [0, 2, 1],
//             ],
//         ],
//         b: [
//             [
//                 [0, 0, 0],
//                 [0, 1, 0],
//                 [0, 2, 0],
//                 [1, 3, 0],
//                 [2, 3, 0],
//                 [3, 2, 0],
//                 [3, 1, 0],
//                 [2, 0, 0],
//                 [1, 0, 0],
//                 [1, 2, 0],
//                 [2, 2, 0],
//             ],
//         ],
//         c: [
//             [
//                 [0, 1, 0],
//                 [0, 2, 0],
//                 [0, 3, 0],
//                 [1, 0, 0],
//                 [2, 0, 0],
//                 [3, 1, 0],
//                 [3, 2, 0],
//                 [3, 3, 0],
//             ],
//         ],
//         d: [
//             [
//                 [0, 0, 0],
//                 [0, 1, 0],
//                 [0, 2, 0],
//                 [1, 3, 0],
//                 [2, 3, 0],
//                 [3, 2, 0],
//                 [3, 1, 0],
//                 [3, 0, 0],
//                 [1, 2, 0],
//                 [2, 2, 0],
//             ],
//         ],
//         e: [
//             [
//                 [0, 0, 0],
//                 [0, 1, 0],
//                 [0, 2, 0],
//                 [0, 3, 0],
//                 [1, 0, 0],
//                 [2, 0, 0],
//                 [3, 0, 0],
//                 [1, 2, 0],
//                 [2, 2, 0],
//                 [1, 3, 0],
//                 [2, 3, 0],
//             ],
//         ],
//     };

//     // Loop through each letter in the input string
//     for (let i = 0; i < str.length; i++) {
//         // Get the current letter from the input string
//         const letter = str[i].toLowerCase();

//         // Check if the letter is a valid letter in our dictionary
//         if (letter in letters) {
//             // Get the block positions for the current letter
//             const letterBlocks = letters[letter];

//             // Loop through each block position in the letter and add it to the blocks array
//             for (let j = 0; j < letterBlocks.length; j++) {
//                 const letterBlock = letterBlocks[j];
//                 for (let k = 0; k < letterBlock.length; k++) {
//                     const block = letterBlock[k];
//                     blocks.push([x + block[0], y + block[1], z + block[2]]);
//                 }
//             }

//             // Update the x position for the next letter
//             x += 5;
//         } else {
//             // If the letter is not a valid letter in our dictionary, skip it and update the x position anyway
//             x += 5;
//         }
//     }

//     // Return the blocks array
//     return blocks;
// }

// {/* Letter Р */}
// {createArray(17).map((position) => (
//     <Box3D position={[0, position, gapLetters]} />
// ))}
// {createArray(7).map((position) => (
//     <Box3D
//         position={[
//             0,
//             position + 10,
//             gapLetters + 8,
//         ]}
//     />
// ))}
// {createArray(7).map((position) => (
//     <Box3D
//         position={[
//             0,
//             position + 10,
//             gapLetters + 8,
//         ]}
//     />
// ))}
// {createArray(7).map((position) => (
//     <Box3D
//         position={[0, 17, gapLetters + position]}
//     />
// ))}
// {createArray(7).map((position) => (
//     <Box3D
//         position={[0, 11, gapLetters + position]}
//     />
// ))}

// {/* Letter И */}
// {createArray(17).map((position) => (
//     <Box3D
//         position={[0, position, gapLetters * 2 + 0]}
//     />
// ))}
// {createArray(17).map((position) => (
//     <Box3D
//         position={[
//             0,
//             position,
//             gapLetters * 2 + 10,
//         ]}
//     />
// ))}
// {createArray(17).map((position) => (
//     <Box3D
//         position={[
//             position,
//             position - 1,
//             gapLetters * 2 + position,
//         ]}
//     />
// ))}

// const createArray = (length: number) => {
//     const newArr = [];

//     for (let i = 0; i < length; i++) {
//         newArr.push(i + 1);
//     }

//     return newArr;
// };

// fetch(`${config.apiDomain}/cases`)
//     .then((response) => {
//         console.log(response);
//         return response.json();
//     })
//     .then((payload) => {
//         console.log(payload);
//         changeData(payload?.cases ?? []);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
