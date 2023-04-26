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
import { WsContext } from "src/contexts/ws-context";
import NotSupportModal from "src/components/modals/not-support-modal";
import ChatPage from "src/pages/chat/chat-page";
import { ChatContext } from "src/contexts/chat-context";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useConfigStore } from "src/store/store";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    const { changeSupportWebGl } = useConfigStore((state) => state);

    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
        null
    );
    const { user, change3dText } = useConfigStore();
    const [messages, changeMessages] = useState<ChatMessage[]>([]);
    const socket = io("http://localhost:3000");

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.close();
        }
        socketRef.current = socket;
        socketRef.current.on("changeText", (msg: string) => {
            change3dText(msg);
        });
        socketRef.current.on("message", (message: ChatMessage) => {
            console.log(message);
            if (message.user?.userId !== user?.userId) {
                changeMessages((state) => [message, ...state]);
            }
        });
    }, [change3dText, messages, socket, user?.userId]);

    useEffect(() => {
        try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl");

            if (!gl) {
                console.warn(
                    "Lockdown mode is enabled in your browser. This may affect the functionality of certain features on this site."
                );
            }
            changeSupportWebGl(Boolean(gl));
        } catch (e) {
            console.error(e);
        }
    }, [changeSupportWebGl]);

    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme, ...whiteThemeColors }}
        >
            <WsContext.Provider value={{ socket }}>
                <ChatContext.Provider
                    value={{
                        messages,
                        changeMessages,
                    }}
                >
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
                </ChatContext.Provider>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
