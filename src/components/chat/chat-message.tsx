import styles from "./chat.module.scss";
// import { Paper, Typography } from "@mui/material";

// interface Props {
//     message: ChatMessage;
//     user: User | null;
// }

// const ChatMessageBubble = ({ message, user }: Props) => {
//     return (
//         <Paper
//             sx={{ boxShadow: "none" }}
//             className={styles.bubbleContainer}
//             elevation={3}
//         >
//             <div
//                 className={
//                     message.messageId !== user?.userId
//                         ? styles.Active
//                         : styles.bubble
//                 }
//             >
//                 <Typography variant="body1">{message.message}</Typography>
//             </div>

//             <Typography sx={{ display: "flex" }} variant="overline">
//                 {message.dateCreate}
//             </Typography>

//             <Typography variant="caption">
//                 [userId]: {message.user?.userId}
//             </Typography>
//         </Paper>
//     );
// };

// export default ChatMessageBubble;

interface ChatMessageProps {
    message: ChatMessage;
    position: "left" | "right";
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
    message,
    position,
}) => {
    const getStatusIcon = (status: 1 | 2 | 3) => {
        switch (status) {
            case 1:
                return <span>&#10003;</span>;
            case 2:
                return <span>&#10003;&#10003;</span>;
            case 3:
                return <span>&#10003;&#10003;&#10003;</span>;
            default:
                return null;
        }
    };

    return (
        <div className={[styles.messageContainer, styles[position]].join(" ")}>
            <div className={styles.message}>
                <div className={styles.messageText}>{message.message}</div>

                <div className={styles.messageStatus}>
                    {getStatusIcon(message.status)}
                </div>
            </div>

            <div className={styles.messageInfo}>
                <div className={styles.messageUser}>
                    {message.user ? message.user?.name ?? "_" : "Unknown user"}
                </div>

                <div className={styles.messageDate}>{message.dateCreate}</div>
            </div>
        </div>
    );
};

export default ChatMessageComponent;
