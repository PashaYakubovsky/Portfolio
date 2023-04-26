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
    changeShowGlitch?: (arg: boolean) => void;
    "3dText": string;
    change3dText: (arg: string) => void;
}

export const useConfigStore = create<IConfigStore>((set) => ({
    supportWebGl: false,
    changeSupportWebGl: (arg: boolean) =>
        set((state) => ({ ...state, supportWebGl: arg })),
    glitch: false,
    loader: false,
    user: {
        userId: uuidv4(),
    },
    changeLoader: (arg: boolean) => set((state) => ({ ...state, loader: arg })),
    changeShowGlitch: (arg: boolean) =>
        set((state) => ({ ...state, glitch: arg })),
    uniqueId: uniqueId,
    "3dText": "Happy to see yoy :)",
    change3dText: (arg: string) =>
        set((state) => ({ ...state, "3dText": arg })),
}));
