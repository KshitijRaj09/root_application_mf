import React, { memo, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { getUserInfoFromStorage } from "../../util";

declare global {
   interface Window {
      socket: Socket;
   }
}

const SOCKETIOENDPOINT = process.env.APIBASEURL;
let socket: Socket = io(SOCKETIOENDPOINT, {
   autoConnect: false
});

const SocketInit = () => {
   const handleSocketConnection = () => {
      console.log('socket init called');
      if (!socket.connected) {
         const userInfo = JSON.parse(getUserInfoFromStorage());
         socket.connect();
         socket.on('connect', () => {
            window.socket = socket;
            socket.emit("addOnlineUser", {
               userId: userInfo.userid,
               socketId: socket.id
            });
         });
      }
   }

   useEffect(() => {
      handleSocketConnection();
      return () => {
         socket.disconnect();
      }
   }, [])

   return (<></>)
}

export const MemosizedSocketInit = memo(SocketInit);