import React from "react";
import { Socket } from "socket.io-client";
declare global {
    interface Window {
        socket: Socket;
    }
}
export declare const MemosizedSocketInit: React.MemoExoticComponent<() => React.JSX.Element>;
