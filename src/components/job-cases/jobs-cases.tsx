import { Container, Grid } from "@mui/material";
import ImgMediaCard from "./card";
import { LegacyRef, forwardRef, useContext, useRef } from "react";
import { CasesContext } from "src/contexts/cases-context";
// import { throttle } from "lodash";
import style from "./job-cases.module.scss";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import RunAwayCloud from "./run-away-cloud";

export const url = (name: string, wrap = false) =>
    `${
        wrap ? "url(" : ""
    }https://awv3node-homepage.surge.sh/build/assets/${name}.svg${
        wrap ? ")" : ""
    }`;

// eslint-disable-next-line no-empty-pattern
const JobsCases = forwardRef(({}, ref: LegacyRef<HTMLElement>) => {
    const { jobCases, showJobs, changeShowJobs } = useContext(CasesContext);
    const refs = useRef<HTMLDivElement[]>([]);
    // const containerRef = useRef(null);
    const parallax = useRef<IParallax>(null);

    // const [containerRef, percentage] = useScrollPercentage({
    //     /* Optional options */
    //     threshold: 0,
    // });

    // useEffect(() => {
    //     changeShowRules((state) =>
    //         state?.map(
    //             (item, idx, arr) => ((idx + 1) / arr.length) * 100 <= percentage
    //         )
    //     );
    // }, [percentage]);

    return (
        <main
            // onScroll={throttle((e: React.UIEvent<HTMLDivElement>) => {
            //     console.log(e.currentTarget.scrollTop);
            // }, 300)}
            className={style.main}
        >
            <Parallax
                ref={parallax}
                pages={2}
                className={style.mainInner}
                // ref={containerRef}
            >
                <ParallaxLayer
                    offset={0}
                    speed={0}
                    factor={2}
                    style={{
                        backgroundImage: url("stars", true),
                        backgroundSize: "cover",
                        zIndex: -1,
                    }}
                />

                <ParallaxLayer
                    offset={0.3}
                    speed={-0.1}
                    style={{ opacity: 1, zIndex: -1 }}
                >
                    <RunAwayCloud
                        style={{
                            right: 0,
                            width: 500,
                        }}
                    />
                    <RunAwayCloud
                        style={{
                            left: 50,
                            width: 200,
                        }}
                    />
                    <RunAwayCloud
                        style={{
                            right: 0,
                            top: -190,
                            width: 300,
                        }}
                    />
                </ParallaxLayer>

                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid
                        container
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "2vw",
                        }}
                        spacing={2}
                    >
                        {jobCases?.map((jobCase, index) => (
                            <ImgMediaCard
                                key={jobCase.name}
                                ref={refs}
                                index={index}
                                show={showJobs[index]}
                                changeShow={() =>
                                    changeShowJobs((state) =>
                                        state.map((job, idx) =>
                                            idx === index ? !state[index] : job
                                        )
                                    )
                                }
                                {...jobCase}
                            />
                        ))}
                    </Grid>
                </Container>

                <ParallaxLayer
                    offset={1}
                    speed={0.4}
                    style={{ opacity: 1, zIndex: -1 }}
                >
                    <RunAwayCloud
                        style={{
                            right: 0,
                            width: 600,
                        }}
                    />
                    <RunAwayCloud
                        style={{
                            left: 50,
                            width: 300,
                        }}
                    />
                </ParallaxLayer>
            </Parallax>
        </main>
    );
});

export default JobsCases;
