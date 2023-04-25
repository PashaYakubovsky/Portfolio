import { createContext } from "react";

export const ConfigContext = createContext<{
    supportWebGl: boolean;
}>({ supportWebGl: false });
