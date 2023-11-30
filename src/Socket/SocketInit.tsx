import React, { memo, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { getUserInfoFromStorage } from "../util";
import { WindowEvents } from "@kshitijraj09/sharedlib_mf";
import useNotificationStore from "../zustand-config/notificationStore";

declare global {
   interface Window {
      socket: Socket;
   }
}

const SOCKETIOENDPOINT = process.env.APIBASEURL;
let socket: Socket = io(SOCKETIOENDPOINT, {
   autoConnect: false
});
const eventName: WindowEvents = 'messageNotification';
const useSocketInit = () => {
   const { increaseNotifications , fetchNotifications } = useNotificationStore();
   const handleSocketConnection = () => {
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
      fetchNotifications();
      socket.on('message-notification', (notification) => {
         increaseNotifications(notification);
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

   return {}
}

export default useSocketInit;