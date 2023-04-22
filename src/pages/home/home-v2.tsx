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
// import config from "../../../config.json";
import db from "../../../netlify/db.json";
import Box3D from "./box-3d";
import JobsCases from "./jobs-cases";
import Footer from "./footer";

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
                            camera={{ position: [1.0, 1.0, 1.0] }}
                        >
                            <color attach="background" args={["black"]} />
                            <Stars saturation={0} count={300} speed={1} />
                            <Box3D position={[2, 2, 0]} />
                            <Box3D />

                            {target && (
                                <TransformControls
                                    object={target}
                                    mode={mode}
                                />
                            )}
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
