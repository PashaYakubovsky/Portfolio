import { uniqueId } from "lodash";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface IConfigStore {
    supportWebGl: boolean;
    changeSupportWebGl: (arg: boolean) => void;
    user: User | null;
    uniqueId?: (prefix?: string) => string;
    loader: boolean;
    changeLoader?: (arg: boolean) => void;
    glitch: boolean;
    bloom: boolean;
    changeShowGlitch?: (arg: boolean) => void;
    "3dText": string;
    change3dText: (arg: string) => void;
    changeShowBloom?: (arg: boolean) => void;
    headerLabel: string;
    changeHeaderLabel?: (arg: string) => void;
    spotifyToken: string;
    changeSpotifyToken?: (arg: string) => void;
    isSomeTypingInChat: User[];
    changeIsSomeTypingInChat?: (arg: User[]) => void;
    objects3d: _Object3d[];
    changeObjects3d: (arg: _Object3d[]) => void;
    objects3dRanges: number;
    changeUser: (arg: User) => void;
}

type _Object3d = {
    random: number;
    position: number[];
    rotation: number[];
};

const randomVector = (r: number) => [
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
    r / 2 - Math.random() * r,
];
const randomEuler = () => [
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
];

export const generate3dObjs = ({ length, r }: { length: number; r?: number }) =>
    Array.from({ length }, () => ({
        random: Math.random(),
        position: randomVector(r as number),
        rotation: randomEuler(),
    }));

const objects3dRanges = 500;

export const useConfigStore = create<IConfigStore>((set) => ({
    objects3dRanges,
    supportWebGl: false,
    changeSupportWebGl: (arg: boolean) =>
        set((state) => ({ ...state, supportWebGl: arg })),
    glitch: false,
    loader: false,
    bloom: false,
    headerLabel: "Projects",
    "3dText": "Happy to see yoy :)",
    user: {
        userId: uuidv4(),
        name: "",
    },
    spotifyToken: "",
    isSomeTypingInChat: [],
    objects3d: generate3dObjs({ length: objects3dRanges, r: 10 }),
    changeShowBloom: (arg: boolean) =>
        set((state) => ({ ...state, bloom: arg })),
    changeLoader: (arg: boolean) => set((state) => ({ ...state, loader: arg })),
    changeShowGlitch: (arg: boolean) =>
        set((state) => ({ ...state, glitch: arg })),
    uniqueId: uniqueId,
    change3dText: (arg: string) =>
        set((state) => ({ ...state, "3dText": arg })),
    changeHeaderLabel: (arg: string) =>
        set((state) => ({ ...state, headerLabel: arg })),
    changeSpotifyToken: (arg: string) =>
        set((state) => ({ ...state, spotifyToken: arg })),
    changeIsSomeTypingInChat: (arg: User[]) =>
        set((state) => ({ ...state, isSomeTypingInChat: arg })),
    changeObjects3d: (arg: _Object3d[]) =>
        set((state) => ({ ...state, objects3d: arg })),
    changeUser: (arg: User) => set((state) => ({ ...state, user: arg })),
}));
