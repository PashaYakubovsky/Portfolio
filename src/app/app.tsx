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
import { v4 as uuid } from "uuid";
import configMain from "../../config.json";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
        null
    );
    const timeoutRef = useRef<number | null>(null);

    const [messages, changeMessages] = useState<ChatMessage[]>([]);
    const socket = io("https://mhp.inboost.ai:25055");

    const config = useConfigStore();
    const {
        user,
        change3dText,
        changeShowGlitch,
        changeIsSomeTypingInChat,
        isSomeTypingInChat,
        changeSupportWebGl,
    } = config;
    // const socket = io("https://mhp.inboost.ai:25055");

    // useEffect(() => {
    //     // Make a POST request to the Spotify Accounts Service to retrieve an access token
    //     fetch("https://accounts.spotify.com/api/token", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/x-www-form-urlencoded",
    //             Authorization:
    //                 "Basic " +
    //                 btoa(spotifyClientId + ":" + spotifyClientSecret),
    //         },
    //         body: "grant_type=client_credentials",
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             const accessToken = data.access_token;
    //             changeSpotifyToken?.(accessToken);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        if (socketRef.current) {
            socketRef.current.close();
        }

        socketRef.current = socket;

        socketRef.current.on("changeText", (message: string) => {
            if (message !== config["3dText"]) change3dText(message);

            changeShowGlitch?.(true);

            setTimeout(() => {
                changeShowGlitch?.(false);
            }, 1000);
        });

        socketRef.current.on(
            "image",
            (message: {
                name?: string;
                type: string;
                data?: string | ArrayBuffer | null;
                userId: string;
            }) => {
                const buffer = message?.data ?? "";
                const blob = new Blob([buffer], { type: message.type });
                const url = URL.createObjectURL(blob);

                const newMessage: ChatMessage = {
                    dateCreate: new Date().toISOString(),
                    messageId: uuid(),
                    message: url,
                    status: 2,
                    user: { name: "", userId: message?.userId },
                    isFromBlob: true,
                };

                changeMessages((state) => [newMessage, ...state]);
            }
        );

        socketRef.current.on("message", (message: ChatMessage) => {
            if (message.user?.userId !== user?.userId) {
                changeMessages((state) => [
                    { ...message, status: 2 },
                    ...state,
                ]);
            }
        });

        socketRef.current.on("typing", (message: MessageTyping) => {
            if (message.user?.userId !== user?.userId) {
                if (timeoutRef.current) {
                    clearTimeout(
                        timeoutRef.current as unknown as number | undefined
                    );
                }

                if (
                    isSomeTypingInChat.every(
                        (_user) => _user?.userId !== user?.userId
                    ) &&
                    user
                ) {
                    changeIsSomeTypingInChat?.(isSomeTypingInChat.concat(user));
                }

                timeoutRef.current = setTimeout(() => {
                    changeIsSomeTypingInChat?.([]);
                }, 300) as unknown as number;
            }
        });
    }, [
        change3dText,
        changeIsSomeTypingInChat,
        changeShowGlitch,
        config,
        isSomeTypingInChat,
        messages,
        socket,
        user,
        user?.userId,
    ]);

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
