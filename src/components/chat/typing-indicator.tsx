import React, { useState, useEffect } from "react";

interface UserTypingIndicatorProps {
    username: string[];
}

const UserTypingIndicator: React.FC<UserTypingIndicatorProps> = ({
    username,
}) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const timerId = setInterval(() => {
            if (dots.length >= 3) {
                setDots("");
            } else {
                setDots((prev) => prev + ".");
            }
        }, 500);

        return () => clearInterval(timerId);
    }, [dots]);

    return (
        <div>
            <p>
                {username.map((_userName) => _userName.slice(0, 10)).join(", ")}{" "}
                is typing{dots}
            </p>
        </div>
    );
};

export default UserTypingIndicator;
