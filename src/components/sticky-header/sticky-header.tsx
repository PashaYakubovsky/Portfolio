import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";

export default function StickyHeader() {
    const [showHeader, setShowHeader] = useState(false);

    // Show the header when the user has scrolled down 100px
    const handleScroll = () => {
        if (window.pageYOffset > 100) {
            setShowHeader(true);
        } else {
            setShowHeader(false);
        }
    };

    // Attach the scroll event listener to the window
    React.useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AppBar
            sx={{
                backgroundColor: "#fff",
                zIndex: 100,
            }}
            elevation={0}
            position="fixed"
            style={{ transform: showHeader ? "none" : "translateY(-100%)" }}
        >
            <Toolbar>
                <Typography sx={{ color: "#000" }} variant="h6">
                    Projects
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
