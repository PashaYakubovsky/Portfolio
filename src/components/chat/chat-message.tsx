import styles from "./chat.module.scss";
import { Paper, Typography } from "@mui/material";

interface Props {
    message: ChatMessage;
    user: User | null;
}

const ChatMessageBubble = ({ message, user }: Props) => {
    return (
        <Paper
            sx={{ boxShadow: "none" }}
            className={styles.bubbleContainer}
            elevation={3}
        >
            <div
                className={
                    message.messageId !== user?.userId
                        ? styles.Active
                        : styles.bubble
                }
            >
                <Typography variant="body1">{message.message}</Typography>
            </div>

            <Typography sx={{ display: "flex" }} variant="overline">
                {message.dateCreate}
            </Typography>

            <Typography variant="caption">
                [userId]: {message.user?.userId}
            </Typography>
        </Paper>
    );
};

export default ChatMessageBubble;
