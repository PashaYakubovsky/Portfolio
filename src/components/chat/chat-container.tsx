import {
    Grid,
    Typography,
    Paper,
    Button,
    TextareaAutosize,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import style from "./chat.module.scss";
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
        <div className={style.container}>
            <Grid
                container
                spacing={2}
                sx={{ width: "90vw", m: "auto", height: "100%" }}
            >
                <Grid item xs={12}>
                    <Typography variant="h4">Chat</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper
                        style={{ height: "70vh", overflowY: "scroll" }}
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column-reverse",
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
                    {/* <TextareaAutosize
                        ref={inputRef}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.shiftKey) {
                                return;
                            }
                            if (
                                e.code === "Enter" ||
                                e.code === "NumpadEnter"
                            ) {
                                handleSendMessage();
                            }
                        }}
                        // variant="outlined"
                        color="primary"
                        className={style.textareaWrap}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    /> */}
                    {/* <Button
                        sx={{ mt: 2 }}
                        color="primary"
                        variant="outlined"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button> */}
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatContainer;
