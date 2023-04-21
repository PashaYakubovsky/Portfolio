import * as React from "react";
import { useScroll, animated, useSpring } from "@react-spring/web";
import styles from "./scroll-wave.module.scss";
import gif from "../../public/61092-YzljOWQ3ZWQ2YQ.gif";

const X_LINES = 0;

const PAGE_COUNT = 2;

const INITIAL_WIDTH = 30;

export default function ScrollWave({ children }: { children: JSX.Element }) {
    const containerRef = React.useRef<HTMLDivElement>(null!);
    const barContainerRef = React.useRef<HTMLDivElement>(null!);

    const [textStyles, textApi] = useSpring(() => ({
        y: "100%",
    }));

    const { scrollYProgress } = useScroll({
        container: containerRef,
        onChange: ({ value: { scrollYProgress } }) => {
            if (scrollYProgress > 0.7) {
                textApi.start({ y: "0" });
            } else {
                textApi.start({ y: "100%" });
            }
        },
        default: {
            immediate: true,
        },
    });

    return (
        <>
            {children}

            <div ref={containerRef} className={styles.body}>
                <div className={styles.animated__layers}>
                    <animated.div
                        ref={barContainerRef}
                        className={styles.bar__container}
                    >
                        {Array.from({ length: X_LINES }).map((_, i) => (
                            <animated.div
                                key={i}
                                className={styles.bar}
                                style={{
                                    width: scrollYProgress.to((scrollP) => {
                                        const percentilePosition =
                                            (i + 1) / X_LINES;

                                        return (
                                            INITIAL_WIDTH / 4 +
                                            40 *
                                                Math.cos(
                                                    ((percentilePosition -
                                                        scrollP) *
                                                        Math.PI) /
                                                        1.5
                                                ) **
                                                    32
                                        );
                                    }),
                                }}
                            />
                        ))}
                    </animated.div>
                    <animated.div className={styles.bar__container__inverted}>
                        {Array.from({ length: X_LINES }).map((_, i) => (
                            <animated.div
                                key={i}
                                className={styles.bar}
                                style={{
                                    width: scrollYProgress.to((scrollP) => {
                                        const percentilePosition =
                                            1 - (i + 1) / X_LINES;

                                        return (
                                            INITIAL_WIDTH / 4 +
                                            40 *
                                                Math.cos(
                                                    ((percentilePosition -
                                                        scrollP) *
                                                        Math.PI) /
                                                        1.5
                                                ) **
                                                    32
                                        );
                                    }),
                                }}
                            />
                        ))}
                    </animated.div>
                    <animated.div
                        className={styles.dot}
                        style={{
                            clipPath: scrollYProgress.to(
                                (val) => `circle(${val * 100}%)`
                            ),
                        }}
                    >
                        <div className={styles.container}>
                            <div className={styles.monitor}>
                                <div className={styles.monitorscreen}>
                                    <animated.img
                                        className={styles.gif}
                                        src={gif}
                                        alt="gif John Travolta"
                                    />
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div>
                {new Array(PAGE_COUNT).fill(null).map((_, index) => (
                    <div className={styles.full__page} key={index} />
                ))}
            </div>
        </>
    );
}
