import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomeV2 from "../pages/home/home-v2";
import { ThemeContext, whiteThemeColors } from "../contexts/theme-context";
import { NoMatch } from "../pages/no-match/no-match";
import { useEffect, useRef, useState } from "react";
import StickyHeader from "../components/sticky-header/sticky-header";
import SignUp from "../pages/sign-up/sign-up";
import { WsContext } from "../contexts/ws-context";
import NotSupportModal from "../components/modals/not-support-modal";
import ChatPage from "../pages/chat/chat-page";
import { ChatContext } from "../contexts/chat-context";
import { useConfigStore } from "../store/store";
import { v4 as uuid } from "uuid";
import RequireAuth from "../auth/requareAuth";
import { socket } from "../main";
import AuthModal from "../components/modals/auth-modal";
import {
    ABOUT_PAGE,
    ANIMATIONS_PAGE,
    CHAT_PAGE,
    LOGIN_PAGE,
    SIGN_UP_PAGE,
} from "./routes";
import About from "../pages/about/about";
import AnimationPlanes from "../pages/animations-plane/animationsPlane";

const App = () => {
    const [theme, changeTheme] = useState("white");
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

    // const { visitors, setVisitors } = useVisitorStore();

    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             const response = await fetch(
    //                 configMain.devHelperApi + "/api/v1/active-socket-count"
    //             );
    //             const { count } = await response.json();

    //             setVisitors((count ?? 0) + 1);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     init();
    // }, [change3dText, setVisitors]);

    // useEffect(() => {
    //     const init = async () => {
    //         try {
    //             const response = await fetch(
    //                 configMain.devHelperApi + "/api/v1/get-3d-text"
    //             );
    //             const { message } = await response.json();

    //             change3dText(message ?? "");
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     init();
    // }, [change3dText]);

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
        <BrowserRouter>
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
                            <Route
                                path={ANIMATIONS_PAGE}
                                element={
                                    <RequireAuth>
                                        <AnimationPlanes />
                                    </RequireAuth>
                                }
                            />

                            <Route
                                path={LOGIN_PAGE}
                                element={<AuthModal open />}
                            />
                            <Route path={SIGN_UP_PAGE} element={<SignUp />} />
                            <Route path="*" element={<NoMatch />} />
                        </Routes>
                    </ChatContext.Provider>
                </WsContext.Provider>
            </ThemeContext.Provider>
        </BrowserRouter>
    );
};

export default App;
