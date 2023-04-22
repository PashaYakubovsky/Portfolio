import { createContext } from "react";

export const whiteThemeColors: Pick<IThemeContext, "bgColor" | "textColor"> = {
    bgColor: "gray",
    textColor: "#fff",
};

export interface IThemeContext {
    theme: "dark" | "white" | string;
    changeTheme: React.Dispatch<React.SetStateAction<string>>;
    textColor: string;
    bgColor: string;
}

export const ThemeContext = createContext<IThemeContext | null>(null);
