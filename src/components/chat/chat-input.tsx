import React, { useState } from "react";
import styles from "./input.module.scss";
import clipSvg from "./clip.svg";
import LightTooltip from "../tooltip/light-tooltip";

interface Props {
    onSend: (text: string, file?: File | null) => void;
    value?: string;
    changeValue?: (arg: string) => void;
}

const Input: React.FC<Props> = ({ onSend, value, changeValue }) => {
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
        changeValue?.(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (text || file) onSend(text, file);

        setText("");
        changeValue?.("");
        setFile(null);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Type your message..."
                className={styles.input}
            />

            <div className={styles.actions}>
                <LightTooltip title="file">
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
                            onChange={handleFileChange}
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
    );
};

export default Input;
