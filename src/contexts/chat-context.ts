import { createContext } from "react";

export const ChatContext = createContext<{
    messages: ChatMessage[];
    changeMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>> | null;
}>({ messages: [], changeMessages: null });
