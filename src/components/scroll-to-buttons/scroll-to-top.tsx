import { Zoom, Button } from "@mui/material";
import React, { useState } from "react";

export default function ScrollToTopButton() {
    const [showButton, setShowButton] = useState(false);

    // Show the "scroll to top" button when the user has scrolled down 300px
    const handleScroll = () => {
        if (window.pageYOffset > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    // Scroll the page to the top when the button is clicked
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                bottom: "9vh",
                right: "5vh",
                zIndex: 11,
            }}
            in={showButton}
        >
            <div>
                <Button variant="outlined" color="info" onClick={handleClick}>
                    Top
                </Button>
            </div>
        </Zoom>
    );
}
