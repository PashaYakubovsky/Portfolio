import { Zoom, Button } from "@mui/material";
import React, { useState } from "react";

export default function ScrollToBottomButton() {
    const [showButton, setShowButton] = useState(true);

    // Show the "scroll to top" button when the user has scrolled down 300px
    const handleScroll = () => {
        if (window.pageYOffset < 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    function vhToPixels(vh: number): number {
        return Math.round(window.innerHeight / (100 / vh));
    }

    // Scroll the page to the top when the button is clicked
    const handleClick = () => {
        window.scrollTo(0, document.body.scrollHeight - vhToPixels(100) - 30);
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
            style={{
                position: "fixed",
                bottom: "3vh",
                right: "5vh",
                zIndex: 1000,
            }}
            in={showButton}
        >
            <div>
                <Button variant="outlined" color="info" onClick={handleClick}>
                    Bottom
                </Button>
            </div>
        </Zoom>
    );
}