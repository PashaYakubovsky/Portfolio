import React, { useCallback, useRef, useState } from "react";
import styles from "./input.module.scss";
import clipSvg from "./clip.svg";
import LightTooltip from "../tooltip/light-tooltip";
import ReactDOM, { flushSync } from "react-dom";
import EmojiPicker, {
    EmojiStyle,
    SuggestionMode,
    Theme,
} from "emoji-picker-react";
import { useEffect } from "react";

interface Props {
    onSend: (text: string, file?: File | null) => void;
    value?: string;
    changeValue?: (arg: string) => void;
    handleFileChange?: (arg: File) => void;
}

const Input: React.FC<Props> = ({ onSend, changeValue, handleFileChange }) => {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const emojiWrapRef = useRef<HTMLDivElement | null>(null);
    const [showEmoji, changeShowEmoji] = useState(false);

    const handleTextChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            flushSync(() => {
                setText(e.target.value);
                changeValue?.(e.target.value);
            });
        },
        []
    );

    const onFileChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
                inputRef.current?.focus();
            }
        },
        []
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            flushSync(() => {
                if (text) {
                    onSend(text);
                }
                if (file) {
                    handleFileChange?.(file);
                }

                setText("");
                changeValue?.("");
                setFile(null);
            });
        },
        [changeValue, file, handleFileChange, onSend, text]
    );

    const insertEmoji = useCallback(
        (start: number, end: number, emoji: string) => {
            const inputElement = inputRef.current;
            if (!inputElement) {
                return;
            }
            const value = inputElement.value;
            const newValue =
                value.substring(0, start) + emoji + value.substring(end);
            setText(newValue);
            changeValue?.(newValue);
            inputElement.setSelectionRange(start + 2, start + 2);
        },
        []
    );
    const handleClick = useCallback(
        (e: MouseEvent) => {
            try {
                const node = ReactDOM.findDOMNode(emojiWrapRef.current);
                if (
                    node &&
                    e.target &&
                    showEmoji &&
                    !node.contains(e.target as Node)
                ) {
                    changeShowEmoji(false);
                }
            } catch (error) {
                return null;
            }
        },
        [showEmoji]
    );

    useEffect(() => {
        document.removeEventListener("click", handleClick);
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [handleClick, showEmoji]);

    return (
        <div className={styles.container}>
            {file ? (
                <div className={styles.previewContainer}>
                    <img
                        className={styles.previewImage}
                        alt="Uploaded file preview"
                        src={URL.createObjectURL(file)}
                    />
                </div>
            ) : null}

            <form onSubmit={handleSubmit} className={styles.containerForm}>
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Type your message..."
                    className={styles.input}
                />

                <div className={styles.actions}>
                    <div
                        ref={emojiWrapRef}
                        className={styles.emojiButton}
                        onClick={(e) => {
                            e.stopPropagation();
                            changeShowEmoji((state) => !state);
                        }}
                    >
                        <LightTooltip title="emoji">
                            <span role="img" aria-label="emoji">
                                🙂
                            </span>
                        </LightTooltip>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={styles.emojiWrap}
                        >
                            {showEmoji ? (
                                <EmojiPicker
                                    width="fit-content"
                                    lazyLoadEmojis
                                    skinTonesDisabled
                                    suggestedEmojisMode={SuggestionMode.RECENT}
                                    emojiStyle={EmojiStyle.NATIVE}
                                    theme={Theme.DARK}
                                    onEmojiClick={(e) => {
                                        insertEmoji(
                                            inputRef.current?.selectionStart ??
                                                0,
                                            inputRef.current?.selectionEnd ?? 0,
                                            e.emoji
                                        );
                                    }}
                                />
                            ) : null}
                        </div>
                    </div>
                    <LightTooltip title="*image">
                        <div>
                            <label
                                htmlFor="file-input"
                                className={styles.fileLabel}
                            >
                                <img
                                    src={clipSvg}
                                    alt="attachment"
                                    className={styles.clipIcon}
                                />
                            </label>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                className={styles.fileInput}
                            />
                        </div>
                    </LightTooltip>
                    <LightTooltip title="send message">
                        <button type="submit" className={styles.sendButton}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={styles.sendIcon}
                            >
                                <path d="M2.8,21.4h18c1,0,1.6-1.2,1-2.1L13.9,1C13.3,0.2,12.7,0,12,0s-1.3,0.2-1.9,1L1.8,19.3C1.2,20.2,1.8,21.4,2.8,21.4z" />
                            </svg>
                        </button>
                    </LightTooltip>
                </div>
            </form>
        </div>
    );
};

export default Input;
