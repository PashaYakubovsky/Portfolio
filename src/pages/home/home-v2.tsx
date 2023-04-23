import { Canvas } from "@react-three/fiber";
import style from "./home.module.scss";
import * as React from "react";
import ScrollToTopButton from "../../components/scroll-to-buttons/scroll-to-top";
import ScrollToBottomButton from "../../components/scroll-to-buttons/scroll-to-bottom";
import { useState } from "react";
import { OrbitControls, TransformControls, Stars } from "@react-three/drei";
import { useControls } from "leva";
import { create } from "zustand";
import { Object3D } from "three";
import { CasesContext } from "src/contexts/cases-context";
import db from "../../../netlify/db.json";
import JobsCases from "./jobs-cases";
import Footer from "./footer";
import Box3D from "./box-3d";

export const useTargetState = create<TargetState>()((set) => ({
    target: null,
    setTarget: (target) => set({ target: target as Object3D<Event> }),
}));

export default function HomeV2() {
    const { target, setTarget } = useTargetState();
    const { mode } = useControls({
        mode: { value: "translate", options: ["translate", "rotate", "scale"] },
    });
    const [data, changeData] = useState<JobExperience[]>([]);
    const [showCanvas, changeShowCanvas] = React.useState(true);
    const observer = React.useRef<IntersectionObserver | null>(null);

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

        changeData(db?.cases ?? []);
    }, []);

    const createArray = (length: number) => {
        const newArr = [];

        for (let i = 0; i < length; i++) {
            newArr.push(i + 1);
        }

        return newArr;
    };

    return (
        <CasesContext.Provider
            value={{ jobCases: data, changeJobsCases: changeData }}
        >
            <div>
                <div className={style.home}>
                    {showCanvas ? (
                        <Canvas
                            dpr={[1, 2]}
                            onPointerMissed={() => setTarget(null)}
                            frameloop="demand"
                            camera={{ position: [0, 0, 20] }}
                        >
                            <color attach="background" args={["black"]} />
                            <Stars
                                radius={0.0001}
                                count={1000}
                                factor={1}
                                saturation={0}
                                fade
                                speed={2}
                            />
                            {/* Letter П */}
                            {createArray(17).map((position) => (
                                <Box3D position={[10, position, 0]} />
                            ))}
                            {createArray(17).map((position) => (
                                <Box3D position={[10, position, 10]} />
                            ))}
                            {createArray(10).map((position) => (
                                <Box3D position={[10, 17, position]} />
                            ))}

                            {target ? (
                                <TransformControls
                                    object={target}
                                    mode={mode}
                                />
                            ) : null}
                            <OrbitControls makeDefault />
                        </Canvas>
                    ) : null}
                </div>

                <ScrollToBottomButton />

                <ScrollToTopButton />

                <JobsCases ref={interceptor} />

                <Footer />
            </div>
        </CasesContext.Provider>
    );
}

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
