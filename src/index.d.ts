interface JobExperience {
    name: string;
    screenshots: string[];
    description: string;
    link?: string;
    index?: number;
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

type User = any;
