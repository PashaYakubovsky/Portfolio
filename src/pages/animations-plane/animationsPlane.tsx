import { useEffect, useState } from "react";
import styles from "./animationsPlane.module.scss";
import { animated, config, useSpring } from "react-spring";
interface LineStyle {
    strokeDashoffset?: number;
    strokeDasharray?: string;
    config?: {
        duration?: number;
        easing?: string;
    };
}
const AnimationPlanes = () => {
    // useEffect(() => {
    //     // Get the path element and calculate its total length
    //     const path = document.getElementById("motionPath");
    //     const pathLength = path?.getTotalLength();

    //     // Set the starting point of the plane at the beginning of the path
    //     const plane = document.getElementById("plane");
    //     plane.style.transformOrigin = "center";
    //     plane.style.transformBox = "fill-box";
    //     plane.style.transform = "translate(" + -20 + "px, " + -20 + "px)";

    //     // Create the animation
    //     const animation = plane.animate(
    //         [
    //             {
    //                 transform:
    //                     "translate(" +
    //                     path?.getPointAtLength(0)?.x +
    //                     "px, " +
    //                     path?.getPointAtLength(0)?.y +
    //                     "px)",
    //             },
    //             {
    //                 transform:
    //                     "translate(" +
    //                     path?.getPointAtLength(pathLength)?.x +
    //                     "px, " +
    //                     path?.getPointAtLength(pathLength)?.y +
    //                     "px)",
    //             },
    //         ],
    //         {
    //             duration: 4000, // Adjust the duration as needed
    //             easing: "linear", // Adjust the easing as needed
    //             iterations: 1,
    //         }
    //     );

    //     // Set the motion path for the animation
    //     animation.currentTime = 0;
    //     animation.effect.updateTiming({
    //         delay: 0,
    //         duration: 1000,
    //         iterations: 1,
    //     });

    //     animation.setKeyframes([
    //         {
    //             offset: 0,
    //             transform:
    //                 "translate(" +
    //                 path.getPointAtLength(0)?.x +
    //                 "px, " +
    //                 path.getPointAtLength(0)?.y +
    //                 "px)",
    //         },
    //         {
    //             offset: 1,
    //             transform:
    //                 "translate(" +
    //                 path.getPointAtLength(pathLength).x +
    //                 "px, " +
    //                 path.getPointAtLength(pathLength).y +
    //                 "px)",
    //         },
    //     ]);

    //     // Create the line animation
    //     const lineAnimation = path.animate(
    //         [
    //             {
    //                 strokeDashoffset: 0,
    //                 strokeDasharray: pathLength + " " + pathLength,
    //             },
    //         ],
    //         {
    //             duration: 4000, // Adjust the duration to match the plane animation
    //             easing: "linear", // Adjust the easing as needed
    //             iterations: 1,
    //         }
    //     );

    //     // Set the line animation to start at the same time as the plane animation
    //     lineAnimation.currentTime = 0;
    // }, []);
    const [toggle, setToggle] = useState(false);

    // Animation config
    const pathConfig = {
        from: { strokeDashoffset: "10", strokeDasharray: "0 1000" },
        to: { strokeDashoffset: "0", strokeDasharray: "1000 0" },
        config: { duration: 3000, ...config.gentle },
    };

    const planeConfig = {
        from: { x: 0, y: 0 },
        to: async (next) => {
            await next({ x: 308, y: 16 });
            setToggle(true);
        },
        config: { duration: 3000, ...config.gentle },
    };

    const pathSpring = useSpring(pathConfig);

    const planeSpring = useSpring(planeConfig);

    return (
        <div className={styles.candidateWrap}>
            <div className="candidate-wrap">
                <svg
                    width="309"
                    height="102"
                    viewBox="0 0 309 102"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <animated.path
                        d="M0 96.9999C6.5 96.9999 38 114.992 78 70.1924C85.1667 63.6924 101.5 38.1924 93.5 16.1924C88 6.19244 70.4 -9.00756 44 10.1924C28.8333 25.1924 19.1 59.5924 101.5 77.1924C157 87.1924 276.1 88.9925 308.5 16.1924"
                        stroke="#2C7DFA"
                        strokeDasharray={pathSpring.strokeDasharray}
                        strokeDashoffset={pathSpring.strokeDashoffset}
                    />
                    {toggle && (
                        <animated.g
                            style={{
                                transform: `translate(${planeSpring.x}px, ${planeSpring.y}px)`,
                            }}
                        >
                            <path
                                d="M8.25288 15.3944C8.31645 15.6257 8.46857 15.8226 8.6763 15.9425C8.86478 16.0434 9.0851 16.0672 9.29074 16.0086C10.0941 15.7734 10.8371 15.3671 11.4685 14.8175C15.2947 11.9983 18.5261 11.2094 37.77 1.10653C37.0623 0.980826 36.3382 0.977872 35.6294 1.0978C3.01123 4.56202 4.71659 4.39759 4.45792 4.57391C3.63364 5.08924 4.40612 6.024 4.72937 6.57761C5.46552 7.9593 5.67822 9.87206 8.25288 15.3944Z"
                                fill="#2C7DFA"
                            />
                            <path
                                d="M35.6172 4.02514C25.2423 12.6439 14.8742 21.3123 4.49956 29.9331C3.36569 23.2468 2.81576 22.7481 3.01356 21.5265C3.26966 19.752 7.21074 18.7196 8.6026 17.9841C31.5177 6.42117 33.3161 4.23192 35.6172 4.02514Z"
                                fill="#2C7DFA"
                            />
                            <path
                                d="M14.9736 29.0119C15.0774 29.0483 15.2308 29.078 15.3344 29.1124C15.4814 29.0979 15.6167 29.0258 15.7109 28.912C19.4496 25.6708 21.8513 21.3654 24.9752 17.608C26.0959 16.1181 27.1316 14.5662 28.0772 12.9595C28.1971 12.7414 28.3585 12.4733 28.2757 12.2343C25.3299 14.3267 22.6659 16.726 19.876 18.8962C16.907 20.9418 14.0685 23.1706 11.3769 25.5696C11.9227 26.2908 12.6991 26.8819 13.2927 27.5987C13.7806 28.1497 14.347 28.6258 14.9736 29.0119Z"
                                fill="#2C7DFA"
                            />
                        </animated.g>
                    )}
                </svg>
            </div>
        </div>
    );
};

export default AnimationPlanes;
