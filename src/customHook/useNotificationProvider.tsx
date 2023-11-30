import { WindowEvents, WindowEventService } from "@kshitijraj09/sharedlib_mf";
import { useEffect, useRef, useState } from "react";
import useNotificationStore from "../zustand-config/notificationStore";

const useNotificationProvider = <Type,>(eventName: WindowEvents) => {
   const { notifications, decreaseNotifications } = useNotificationStore();
   const eventRef = useRef<typeof WindowEventService>();

   useEffect(() => {
      import("Sharedlib/eventservice").
         then((event) => {
            eventRef.current = event.default;
            event.default.subscribe(eventName, updateHandler)
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      return () => {
         eventRef.current.unsubscribe(eventName, updateHandler)
      }
   }, []);

   const updateHandler = (event: Event) => {
      const { detail } = event as CustomEvent;
      if (eventName === 'updateNotification') {
         decreaseNotifications(detail);   
      }
   }
   return { notifications }
}

export default useNotificationProvider;