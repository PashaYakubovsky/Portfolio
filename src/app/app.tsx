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
import { ConfigContext } from "src/contexts/config-context";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    const [config, changeConfig] = useState({ supportWebGl: false });
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

        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl");
            if (!gl) {
                const message = document.createElement("div");
                message.innerText =
                    "Lockdown mode is enabled in your browser. This may affect the functionality of certain features on this site.";
                document.body.appendChild(message);
            } else {
                changeConfig((state) => ({ ...state, supportWebGl: true }));
            }
            // Use WebGL context here
        } catch (e) {
            console.error(e);
            // Hide canvas elements or display alternative content
        }
    }, []);

    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme, ...whiteThemeColors }}
        >
            <WsContext.Provider value={{ socket }}>
                <ConfigContext.Provider value={config}>
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
                </ConfigContext.Provider>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
