import ChatContainer from "src/components/chat/chat-container";
import style from "./chat-page.module.scss";
import { useContext, useEffect } from "react";
import { useConfigStore } from "src/store/store";
import { Container } from "@mui/material";
import ChatBackground from "src/components/3d/chat-background";
import config from "../../../config.json";
import { ChatContext } from "src/contexts/chat-context";
import { useCookies } from "react-cookie";

const ChatPage = () => {
    const { changeHeaderLabel } = useConfigStore();
    const { changeMessages } = useContext(ChatContext);
    const [cookie] = useCookies(["token_dev"]);
    useEffect(() => {
        if (changeHeaderLabel) changeHeaderLabel("Chat");
    }, [changeHeaderLabel]);

    useEffect(() => {
        const init = async () => {
            try {
                const endpoint = config?.devHelperApi + "/api/v1/chat/messages";
                const response = await fetch(endpoint, {
                    headers: {
                        Authorization: `Bearer ${cookie?.token_dev}`,
                    },
                });

                const json: ChatMessage[] = await response.json();

                if (json.length > 0) changeMessages?.(json);
            } catch (err) {
                console.log(err);
            }
        };

        init();
    }, [changeMessages, cookie?.token_dev]);

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
                <ChatBackground />
            </Container>
        </div>
    );
};

export default ChatPage;
