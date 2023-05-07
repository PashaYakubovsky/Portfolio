import { AppBar, Link, Toolbar, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { useConfigStore } from "src/store/store";
import styles from "./sticky-header.module.scss";

export default function StickyHeader() {
    const [showHeader, setShowHeader] = useState(
        window.location.pathname === "/chat"
    );
    const { headerLabel } = useConfigStore();
    const ref = useRef<HTMLDivElement | null>(null);

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
        if (window.location.pathname !== "/chat") {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <AppBar
            sx={{
                backgroundColor: "#fff",
                zIndex: 100,
                boxShadow: "0 5px 20px #011",
            }}
            ref={(node) => {
                if (node) {
                    ref.current = node;
                }
            }}
            elevation={0}
            position="fixed"
            style={{ transform: showHeader ? "none" : "translateY(-100%)" }}
        >
            <Toolbar>
                <Typography sx={{ color: "#000" }} variant="h6">
                    {headerLabel}
                </Typography>

                <div className={styles.headerLinks}>
                    {window.location.pathname !== "/" ? (
                        <Link href="/">Main</Link>
                    ) : null}
                    {window.location.pathname !== "/chat" ? (
                        <Link href="/chat">Chat</Link>
                    ) : null}
                </div>
            </Toolbar>
        </AppBar>
    );
}
