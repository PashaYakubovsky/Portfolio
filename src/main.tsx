import React from "react";
import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
import { io } from "socket.io-client";
import configMain from "../config.json";

// detect if the device is running on iOS
const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (isIos) {
    // listen to the 'focusin' event which is triggered when the virtual keyboard is opened
    document.addEventListener("focusin", function () {
        // scroll to the active element's position
        const activeElement = document.activeElement as HTMLElement;
        window.scrollTo(0, activeElement?.offsetTop);
    });
}

const App = React.lazy(() => import("./app/app"));

// "https://pashaykubovsky.tech:25055"
export const socket = io(configMain?.wsServer, {
    transports: ["websocket"],
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
if (App) ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
