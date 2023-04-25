// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import HomeV2 from "src/pages/home/home-v2";
import { ThemeContext, whiteThemeColors } from "src/contexts/theme-context";

import { NoMatch } from "src/pages/no-match/no-match";
import { useEffect, useState } from "react";
import StickyHeader from "src/components/sticky-header/sticky-header";
import ScrollWave from "src/components/scroll-wave/scroll-wave";
// import Register from "src/pages/register/register";
// import SignIn from "src/pages/sign-in/sign-up";
import SignUp from "src/pages/sign-in/sign-up";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { WsContext } from "src/contexts/ws-context";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    const [socket, changeSocket] = useState<Socket<
        DefaultEventsMap,
        DefaultEventsMap
    > | null>(null);

    useEffect(() => {
        const socket = io();

        socket.connect();

        changeSocket(socket);

        socket.on("3d-text", (msg) => {
            console.log("message: " + msg);
        });
    }, []);

    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme, ...whiteThemeColors }}
        >
            <WsContext.Provider value={{ socket }}>
                <StickyHeader />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ScrollWave>
                                <HomeV2 />
                            </ScrollWave>
                        }
                    />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
