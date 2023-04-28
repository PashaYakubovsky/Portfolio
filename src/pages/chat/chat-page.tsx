import ChatContainer from "src/components/chat/chat-container";
import style from "./chat-page.module.scss";
import { useEffect } from "react";
import { useConfigStore } from "src/store/store";
import { Container } from "@mui/material";

const ChatPage = () => {
    const { changeHeaderLabel } = useConfigStore();

    useEffect(() => {
        if (changeHeaderLabel) changeHeaderLabel("Chat");
    }, [changeHeaderLabel]);

    return (
        <div className={style.containerWrapper}>
            <Container
                sx={{
                    display: "flex",
                    height: "100%",
                    flexDirection: "column",
                }}
                maxWidth="sm"
            >
                <ChatContainer />
            </Container>
        </div>
    );
};

export default ChatPage;
