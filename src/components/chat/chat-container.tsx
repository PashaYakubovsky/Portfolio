import { Grid, Paper } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
// import style from "./chat.module.scss";
import { WsContext } from "src/contexts/ws-context";
import ChatMessageBubble from "./chat-message";
import { ChatContext } from "src/contexts/chat-context";
import { useConfigStore } from "src/store/store";
import { v4 as uuid } from "uuid";
import Input from "./chat-input";
import UserTypingIndicator from "./typing-indicator";
import ScrollToBottomButton from "../scroll-to-buttons/scroll-to-bottom";

const ChatContainer = () => {
    const { messages, changeMessages } = useContext(ChatContext);
    const [messageInput, setMessageInput] = useState<string>("");
    const { socket } = useContext(WsContext);
    const user = useConfigStore((state) => state.user);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const typing = useConfigStore((state) => state.isSomeTypingInChat);
    const paperRef = useRef<HTMLDivElement | null>(null);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    const handleSendMessage = () => {
        const newMessage: ChatMessage = {
            messageId: uuid() || "error",
            message: messageInput,
            dateCreate: new Date().toISOString(),
            user,
            status: 1,
        };
        changeMessages?.([newMessage, ...messages]);
        setMessageInput("");
        socket?.emit("message", { message: newMessage, user });
    };
    const handleFileChange = async (file: File) => {
        // create a FileReader to read the image file
        const buffer = await readFileAsArrayBuffer(file);

        // when the reader is done reading the file, emit it to the server via socket.io
        const imageData = {
            name: file?.name,
            type: file?.type,
            data: buffer,
            userId: user?.userId,
        };

        socket?.emit("image", imageData);
    };
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            inputRef.current?.focus();
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    const [scrollDirection, setScrollDirection] = useState<"up" | "down">(
        "down"
    );
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const currentPosition = e.currentTarget.scrollTop;

        if (currentPosition > prevScrollPosition) {
            setScrollDirection("down");
        } else if (currentPosition < prevScrollPosition) {
            setScrollDirection("up");
        }

        setPrevScrollPosition(currentPosition);
    };

    return (
        <>
            <Grid flexGrow={1} height="calc(100% - 105px)" item xs={12} md={6}>
                <Paper
                    ref={paperRef}
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column-reverse",
                        height: "100%",
                        overflowY: "scroll",
                        position: "relative",
                    }}
                    onScroll={handleScroll}
                >
                    <div ref={messagesEndRef} />
                    <ScrollToBottomButton
                        elem={paperRef.current}
                        show={scrollDirection === "up"}
                    />

                    {messages?.map((msg, idx, arr) => {
                        return (
                            <ChatMessageBubble
                                user={user}
                                key={msg.messageId}
                                position={
                                    user?.userId === msg.user?.userId
                                        ? "left"
                                        : "right"
                                }
                                message={msg}
                                isLastElem={idx === 0}
                            />
                        );
                    })}
                    {typing.length > 0 ? (
                        <UserTypingIndicator
                            username={typing.map((user) => user.userId ?? "")}
                        />
                    ) : null}
                </Paper>
            </Grid>

            <Input
                changeValue={(v) => {
                    setMessageInput(v);
                    socket?.emit("typing", {
                        typing: true,
                        user,
                    } as MessageTyping);
                }}
                value={messageInput}
                onSend={handleSendMessage}
                handleFileChange={handleFileChange}
            />
        </>
    );
};

export default ChatContainer;
