import { Grid, Paper } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
// import style from "./chat.module.scss";
import { WsContext } from "src/contexts/ws-context";
import ChatMessageBubble from "./chat-message";
import { ChatContext } from "src/contexts/chat-context";
import { useConfigStore } from "src/store/store";
import { v4 as uuid } from "uuid";
import Input from "./chat-input";

const ChatContainer = () => {
    const { messages, changeMessages } = useContext(ChatContext);
    const [messageInput, setMessageInput] = useState<string>("");
    const { socket } = useContext(WsContext);
    const { user } = useConfigStore();
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const handleSendMessage = () => {
        const newMessage: ChatMessage = {
            messageId: uuid() || "error",
            message: messageInput,
            dateCreate: new Date().toDateString(),
            user,
            status: 1,
        };
        changeMessages?.([newMessage, ...messages]);
        setMessageInput("");

        socket?.emit("message", { message: newMessage, user });
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

    return (
        <>
            <Grid flexGrow={1} height="calc(100% - 105px)" item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column-reverse",
                        height: "100%",
                        overflowY: "scroll",
                    }}
                >
                    {messages?.map((msg) => {
                        return (
                            <ChatMessageBubble
                                key={msg.messageId}
                                position={
                                    user?.userId === msg.user?.userId
                                        ? "left"
                                        : "right"
                                }
                                message={msg}
                            />
                        );
                    })}
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <Input
                    changeValue={(v) => setMessageInput(v)}
                    value={messageInput}
                    onSend={handleSendMessage}
                />
            </Grid>
        </>
    );
};

export default ChatContainer;
