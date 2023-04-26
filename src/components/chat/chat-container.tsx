import { Grid, Typography, Paper, TextField, Button } from "@mui/material";
import { useState } from "react";
import style from "./chat.module.scss";

interface IMessage {
    id: number;
    message: string;
}

const ChatContainer = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageInput, setMessageInput] = useState<string>("");

    const handleSendMessage = () => {
        const newMessage: IMessage = {
            id: Math.floor(Math.random() * 100),
            message: messageInput,
        };
        setMessages([...messages, newMessage]);
        setMessageInput("");
    };

    return (
        <div className={style.container}>
            <Grid container spacing={2} sx={{ width: "90vw", m: "auto" }}>
                <Grid item xs={12}>
                    <Typography variant="h4">Chat</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ height: 400, overflowY: "scroll" }}>
                        {messages.map((msg) => (
                            <div key={msg.id}>{msg.message}</div>
                        ))}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        autoFocus
                        label="Write something"
                        // variant="outlined"
                        color="primary"
                        InputProps={{
                            inputProps: { style: { color: "white" } },
                        }}
                        fullWidth
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <Button
                        sx={{ mt: 2 }}
                        color="primary"
                        variant="outlined"
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default ChatContainer;
