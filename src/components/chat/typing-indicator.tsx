import React, { useState, useEffect } from "react";

interface UserTypingIndicatorProps {
    users: User[];
}

const UserTypingIndicator: React.FC<UserTypingIndicatorProps> = ({ users }) => {
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

    console.log(users);

    return (
        <div>
            <p>
                {users
                    .map((user) =>
                        (user?.name ?? user?.userId ?? "").slice(0, 10)
                    )
                    .join(", ")}{" "}
                is typing
                {dots}
            </p>
        </div>
    );
};

export default UserTypingIndicator;
