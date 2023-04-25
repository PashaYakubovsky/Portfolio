import { createContext } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export const WsContext = createContext<{
    socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
}>({ socket: null });
