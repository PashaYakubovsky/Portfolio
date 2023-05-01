interface JobExperience {
    name: string;
    screenshots: string[];
    description: string;
    link?: string;
    index?: number;
    tooltipsText?: string;
    techStack: string[];
}

interface ILinkData {
    url: string;
    mediaType: string;
    contentType: string;
    favicons: string[];
    description: string;
    images: string[];
    siteName: string;
}

interface TargetState {
    target: null | Object3D<Event>;
    setTarget: (by: null | Object3D) => void;
}

interface User {
    userId: string | undefined;
    name: string;
}

interface ChatMessage {
    dateCreate: string;
    message: string;
    user: User | null;
    messageId: string;
    status: 1 | 2 | 3;
    isFromBlob?: boolean;
}

interface MessageTyping {
    typing: boolean;
    user: User;
}

interface Window {
    MSStream?: any;
}
