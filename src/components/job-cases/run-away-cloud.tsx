import { CSSProperties, useState } from "react";
import { url } from "./jobs-cases";
import { animated, useSprings } from "react-spring";
// import styleClouds from "./run-away-cloud.scss";

const RunAwayCloud = ({ style }: { style: CSSProperties }) => {
    const [isHovered, setIsHovered] = useState(false);

    // const { xy } = useSpring({
    //     xy: isHovered ? [0, -100] : [0, 0],
    //     config: { ...config.gentle, mass: 5, tension: 350, friction: 40 },
    // });

    const rainCount = 150; // Number of raindrops
    const raindrops = new Array(rainCount).fill(null).map(() => ({
        from: { opacity: 1, y: -100 },
        to: { opacity: 0, y: 650 },
        delay: Math.floor(Math.random() * 5000), // Random delay up to 5 seconds
        config: { mass: 5, tension: 500, friction: 40 },
        loop: true,
    }));

    const springs = useSprings(
        rainCount,
        raindrops.map((drop) => ({
            from: drop.from,
            to: drop.to,
            delay: drop.delay,
            config: drop.config,
            loop: true,
        }))
    );

    return (
        <div
            style={{
                position: "absolute",
                width: "100%",
                zIndex: -1,
                ...style,
            }}
        >
            <animated.img
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                src={url("cloud")}
                alt="cloud"
                style={{
                    width: "100%",
                }}
            />

            {springs.map(
                (spring, index) =>
                    isHovered && (
                        <animated.div
                            key={index}
                            style={{
                                top: "calc(100% + 40px)",
                                position: "absolute",
                                // top: 0,
                                left: `${Math.floor(
                                    (index / rainCount) * 100
                                )}%`,
                                transform: spring.y.to(
                                    (y) => `translateY(${y + 40}px)`
                                ),
                                opacity: spring.opacity,
                                width: "4px",
                                height: "20px",
                                backgroundColor: "#fff",
                            }}
                        />
                    )
            )}
        </div>
    );
};

export default RunAwayCloud;
