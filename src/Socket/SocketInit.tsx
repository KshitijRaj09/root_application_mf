import React, { memo, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { getUserInfoFromStorage } from "../util";
import { WindowEvents } from "Sharedlib/eventservice";

declare global {
   interface Window {
      socket: Socket;
   }
}

const SOCKETIOENDPOINT = process.env.APIBASEURL;
let socket: Socket = io(SOCKETIOENDPOINT, {
   autoConnect: false
});
const eventName = 'messageNotification' as typeof WindowEvents.messageNotification;
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
      socket.on('message-notification', (notification) => {
         console.log('hello notification', notification)
         import("Sharedlib/eventservice").
         then((event) => {
            setTimeout(() => event.default.fire(eventName, { detail: notification }), 100);     
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      })
      return () => {
         socket.disconnect();
      }
   }, [])

   return (<></>)
}

export const MemoizedSocketInit = memo(SocketInit);