import ReactLinkify from "react-linkify";
import styles from "./chat.module.scss";
import ReactPlayer from "react-player";
import { validateYouTubeUrl, validateFacebookVideoUrl } from "../utils/valid";
import { Spotify } from "react-spotify-embed";
import { useRef } from "react";
// import { ChatContext } from "src/contexts/chat-context";
import config from "../../../config.json";

const createLinkPreview = async (url: string) => {
    try {
        // const requestUrl = `https://cors-anywhere.herokuapp.com/${url}`;
        const requestUrl = `${config?.devHelperApi}/api/v1/getSitePreview`;
        const response = await fetch(requestUrl, {
            method: "POST",
            body: JSON.stringify({ url }),
        });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const title = doc
            .querySelector('meta[property="og:title"]')
            ?.getAttribute("content");
        const description = doc
            .querySelector('meta[property="og:description"]')
            ?.getAttribute("content");
        const image = doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute("content");
        const linkPreview = {
            title: title,
            description: description,
            image: image,
        };
        console.log(linkPreview);
        return linkPreview;
    } catch (err) {
        console.log(err);
    }
};

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
    user?: User | null;
    isLastElem: boolean;
}

const ChatMessageComponent: React.FC<ChatMessageProps> = ({
    message,
    position,
    // user,
    // isLastElem,
}) => {
    // const changeMessages = useContext(ChatContext)?.changeMessages;
    // const observer = useRef<IntersectionObserver | null>(null);
    const getStatusIcon = (status: 1 | 2 | 3) => {
        return {
            1: <span>&#10003;</span>,
            2: <span>&#10003;&#10003;</span>,
            3: <span>&#10003;&#10003;&#10003;</span>,
        }[status];
    };
    const messageRef = useRef<HTMLDivElement | null>(null);

    // const observerCallback = useCallback(
    //     (node: HTMLDivElement) => {
    //         if (observer.current) {
    //             observer.current.disconnect();
    //         }
    //         observer.current = new IntersectionObserver((entries) => {
    //             if (
    //                 entries[0].isIntersecting &&
    //                 message.status < 2 &&
    //                 message.user?.userId !== user?.userId
    //             ) {
    //                 changeMessages?.((state) =>
    //                     state.map((msg) =>
    //                         msg.messageId === message.messageId
    //                             ? { ...msg, status: 2 }
    //                             : msg
    //                     )
    //                 );
    //             }
    //         });
    //         observer.current.observe(node);
    //     },
    //     [
    //         changeMessages,
    //         message.messageId,
    //         message.status,
    //         message.user?.userId,
    //         user?.userId,
    //     ]
    // );

    return (
        <div
            ref={(node) => {
                if (node) {
                    // observerCallback(node);
                    messageRef.current = node;
                }
            }}
            className={[styles.messageContainer, styles[position]].join(" ")}
        >
            <div className={styles.message}>
                <ReactLinkify
                    componentDecorator={(decoratedHref, decoratedText, key) => {
                        if (message?.isFromBlob) {
                            return (
                                <img
                                    className={styles.blobImage}
                                    src={message?.message}
                                    alt="Uploaded"
                                />
                            );
                        }
                        if (
                            validateYouTubeUrl(decoratedHref) ||
                            validateFacebookVideoUrl(decoratedHref)
                        ) {
                            return (
                                <ReactPlayer
                                    stopOnUnmount
                                    url={decoratedHref}
                                    controls
                                    width="100%"
                                    height="100%"
                                />
                            );
                        }
                        if (decoratedHref.includes("open.spotify")) {
                            return <Spotify link={decoratedHref} />;
                        }

                        createLinkPreview(decoratedHref).then((info) => {
                            const element = document.querySelector(
                                "#message-" + key
                            );

                            const imgElem = element?.querySelector(
                                "#messageImage-" + key
                            ) as HTMLSpanElement;
                            if (imgElem && info?.image) {
                                imgElem.style.backgroundImage = `url(${
                                    info?.image ?? ""
                                })`;
                            }
                            const pElem = element?.querySelector("p");
                            if (pElem && info?.title) {
                                pElem.textContent =
                                    info?.title +
                                    "\n" +
                                    (info?.description ?? "");
                            }
                        });

                        return (
                            <a
                                target="blank"
                                id={"message-" + key}
                                href={decoratedHref}
                                key={key}
                            >
                                <span
                                    className={styles.decoratorMessageContainer}
                                >
                                    <span
                                        id={"messageImage-" + key}
                                        className={styles.messageImage}
                                    />
                                    <p
                                        className={
                                            styles.messageSiteDescription
                                        }
                                    />
                                </span>
                                {decoratedText}
                            </a>
                        );
                    }}
                >
                    <div className={styles.messageText}>
                        {message.message?.replaceAll("blob:", "")}
                    </div>
                </ReactLinkify>
            </div>

            <div className={styles.messageInfo}>
                <div className={styles.messageUser}>
                    {message.user ? message.user?.name ?? "_" : "Unknown user"}
                </div>

                <div className={styles.messageDate}>
                    {new Date(message.dateCreate).toLocaleString()}{" "}
                    {getStatusIcon(message.status)}
                </div>
            </div>
        </div>
    );
};

export default ChatMessageComponent;
