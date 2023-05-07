import { CSSProperties, useState } from "react";
import { url } from "./jobs-cases";
import { useSpring, animated, config, useSprings } from "react-spring";

const RunAwayCloud = ({ style }: { style: CSSProperties }) => {
    const [isHovered, setIsHovered] = useState(false);

    const { xy } = useSpring({
        xy: isHovered ? [0, -100] : [0, 0],
        config: { ...config.gentle, mass: 5, tension: 350, friction: 40 },
    });

    const rainCount = 50; // Number of raindrops
    const raindrops = new Array(rainCount).fill(null).map(() => ({
        from: { opacity: 0, y: -100 },
        to: { opacity: 1, y: 650 },
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
        <>
            <animated.img
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    position: "absolute",
                    top: xy.to((x, y) => y),
                    left: xy.to((x, y) => x),
                    ...style,
                }}
                src={url("cloud")}
                alt="cloud"
            />

            {springs.map(
                (spring, index) =>
                    isHovered && (
                        <animated.div
                            key={index}
                            style={{
                                position: "absolute",
                                top: 0,
                                left: `${Math.floor(
                                    (index / rainCount) * 100
                                )}%`,
                                transform: spring.y.to(
                                    (y) => `translateY(${y}px)`
                                ),
                                opacity: spring.opacity,
                                width: "1px",
                                height: "50px",
                                backgroundColor: "#fff",
                            }}
                        />
                    )
            )}
        </>
    );
};

export default RunAwayCloud;
