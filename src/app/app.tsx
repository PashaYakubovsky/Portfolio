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
import SignUp from "src/pages/sign-up/sign-up";
// import { io } from "socket.io-client";
import { WsContext } from "src/contexts/ws-context";
import NotSupportModal from "src/components/modals/not-support-modal";
import ChatPage from "src/pages/chat/chat-page";
import { ChatContext } from "src/contexts/chat-context";
// import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { useConfigStore } from "src/store/store";
import { v4 as uuid } from "uuid";
// import configMain from "../../config.json";
import RequireAuth from "src/auth/requareAuth";
import { socket } from "src/main";
import AuthModal from "src/components/modals/auth-modal";
import { ABOUT_PAGE, CHAT_PAGE, LOGIN_PAGE, SIGN_UP_PAGE } from "./routes";
import About from "src/pages/about/about";
// import SslAttentionModal from "src/components/modals/ssl-attention-modal";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    // const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    //     null
    // );
    const timeoutRef = useRef<number | null>(null);

    const [messages, changeMessages] = useState<ChatMessage[]>([]);

    const user = useConfigStore((state) => state.user);
    const text3d = useConfigStore((state) => state["3dText"]);
    const change3dText = useConfigStore((state) => state.change3dText);
    const changeShowGlitch = useConfigStore((state) => state.changeShowGlitch);
    const changeIsSomeTypingInChat = useConfigStore(
        (state) => state.changeIsSomeTypingInChat
    );
    const isSomeTypingInChat = useConfigStore(
        (state) => state.isSomeTypingInChat
    );
    const changeSupportWebGl = useConfigStore(
        (state) => state.changeSupportWebGl
    );
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
        const init = async () => {
            if (socket.disconnected) {
                socket.open();
            }

            socket.on("changeText", (message: string) => {
                if (message !== text3d) change3dText(message);

                changeShowGlitch?.(true);

                setTimeout(() => {
                    changeShowGlitch?.(false);
                }, 1000);
            });

            socket.on(
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

            socket.on("message", (message: ChatMessage) => {
                debugger;
                if (message.user?.userId !== user?.userId) {
                    changeMessages((state) => [
                        { ...message, status: 2 },
                        ...state,
                    ]);
                }
            });

            socket.on("typing", (message: MessageTyping) => {
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
                        changeIsSomeTypingInChat?.(
                            isSomeTypingInChat.concat(user)
                        );
                    }

                    timeoutRef.current = setTimeout(() => {
                        changeIsSomeTypingInChat?.([]);
                    }, 300) as unknown as number;
                }
            });
        };

        init();

        return () => {
            socket.close();
        };
    }, [
        change3dText,
        changeIsSomeTypingInChat,
        changeShowGlitch,
        isSomeTypingInChat,
        messages,
        text3d,
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
            <WsContext.Provider value={{ socket: socket }}>
                <ChatContext.Provider
                    value={{
                        messages,
                        changeMessages,
                    }}
                >
                    <StickyHeader />
                    <NotSupportModal />
                    {/* <SslAttentionModal /> */}

                    <Routes>
                        <Route path="/" element={<HomeV2 />} />
                        <Route
                            path={CHAT_PAGE}
                            element={
                                <RequireAuth>
                                    <ChatPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path={ABOUT_PAGE}
                            element={
                                <RequireAuth>
                                    <About />
                                </RequireAuth>
                            }
                        />

                        <Route path={LOGIN_PAGE} element={<AuthModal open />} />
                        <Route path={SIGN_UP_PAGE} element={<SignUp />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </ChatContext.Provider>
            </WsContext.Provider>
        </ThemeContext.Provider>
    );
};

export default App;
