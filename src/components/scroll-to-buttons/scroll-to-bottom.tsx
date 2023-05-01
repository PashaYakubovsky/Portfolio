import { Zoom, Button } from "@mui/material";
import React, { useState } from "react";
import style from "./scroll-to.module.scss";

export function vhToPixels(vh: number): number {
    return Math.round(window.innerHeight / (100 / vh));
}

export default function ScrollToBottomButton({
    elem,
    show = true,
    className,
}: {
    elem?: HTMLElement | null;
    show?: boolean;
    className?: string;
}) {
    const [showButton, setShowButton] = useState(true);

    // Show the "scroll to top" button when the user has scrolled down 300px
    const handleScroll = () => {
        if (window.pageYOffset < 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Scroll the page to the top when the button is clicked
    const handleClick = () => {
        (elem ?? window).scrollBy({
            behavior: "smooth",
            top: elem
                ? elem.scrollHeight
                : document.body.scrollHeight - vhToPixels(100) - 30,
        });
    };

    // Attach the scroll event listener to the window
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Zoom
            in={showButton}
            className={[style.botButtonContainer, className].join(" ")}
        >
            <div>
                {show ? (
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={handleClick}
                    >
                        Bottom
                    </Button>
                ) : null}
            </div>
        </Zoom>
    );
}
