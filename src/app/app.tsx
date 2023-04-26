// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import HomeV2 from "src/pages/home/home-v2";
import { ThemeContext, whiteThemeColors } from "src/contexts/theme-context";

import { NoMatch } from "src/pages/no-match/no-match";
import { useEffect, useRef, useState } from "react";
import StickyHeader from "src/components/sticky-header/sticky-header";
// import ScrollWave from "src/components/scroll-wave/scroll-wave";
// import Register from "src/pages/register/register";
// import SignIn from "src/pages/sign-in/sign-up";
import SignUp from "src/pages/sign-in/sign-up";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { WsContext } from "src/contexts/ws-context";
import { ConfigContext } from "src/contexts/config-context";
import NotSupportModal from "src/components/modals/not-support-modal";
import ChatPage from "src/pages/chat/chat-page";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    const [config, changeConfig] = useState({ supportWebGl: true });
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
        null
    );

    // useEffect(() => {
    //     if (socketRef.current) {
    //         socketRef.current.disconnect();
    //     }
    //     socketRef.current = io("https://localhost:3000");

    //     socketRef.current.on("changeText", (msg: string) => {
    //         console.log("message: " + msg);
    //     });
    // }, []);

    useEffect(() => {
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl");

            if (!gl) {
                console.warn(
                    "Lockdown mode is enabled in your browser. This may affect the functionality of certain features on this site."
                );
            }
            changeConfig((state) => ({ ...state, supportWebGl: Boolean(gl) }));
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme, ...whiteThemeColors }}
        >
            <WsContext.Provider value={{ socket: socketRef.current }}>
                <ConfigContext.Provider value={config}>
                    <StickyHeader />
                    <NotSupportModal />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                // <ScrollWave>
                                <HomeV2 />
                                // </ScrollWave>
                            }
                        />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </ConfigContext.Provider>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
