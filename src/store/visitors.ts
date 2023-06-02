import { create } from "zustand";

type VisitorStore = {
    visitors: number;
    increment: () => void;
    decrement: () => void;
    setVisitors: (arg: { visitors: number }) => void;
};

export const useVisitorStore = create<VisitorStore>((set) => ({
    visitors: 0,
    increment: () => set((state) => ({ visitors: state.visitors + 1 })),
    decrement: () => set((state) => ({ visitors: state.visitors - 1 })),
    setVisitors: ({ visitors }) => set((state) => ({ ...state, visitors })),
}));
