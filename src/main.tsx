import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/app";
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

export const socket = io(configMain?.devHelperApi);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
