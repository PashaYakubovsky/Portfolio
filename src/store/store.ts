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
}

export const useConfigStore = create<IConfigStore>((set) => ({
    supportWebGl: false,
    changeSupportWebGl: (arg: boolean) =>
        set((state) => ({ ...state, supportWebGl: arg })),
    glitch: false,
    loader: false,
    bloom: false,
    user: {
        userId: uuidv4(),
        name: "",
    },
    changeShowBloom: (arg: boolean) =>
        set((state) => ({ ...state, bloom: arg })),
    changeLoader: (arg: boolean) => set((state) => ({ ...state, loader: arg })),
    changeShowGlitch: (arg: boolean) =>
        set((state) => ({ ...state, glitch: arg })),
    uniqueId: uniqueId,
    "3dText": "Happy to see yoy :)",
    change3dText: (arg: string) =>
        set((state) => ({ ...state, "3dText": arg })),
}));
