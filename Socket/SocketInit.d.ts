import { Socket } from "socket.io-client";
declare global {
    interface Window {
        socket: Socket;
    }
}
declare const useSocketInit: () => {};
export default useSocketInit;
