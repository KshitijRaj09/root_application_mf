import { WindowEvents, WindowEventService } from "@kshitijraj09/sharedlib_mf";
import { useEffect, useState } from "react";
import useNotificationStore from "../zustand-config/notificationStore";

const useNotificationProvider = <Type,>(eventName: WindowEvents) => {
   const { notifications, decreaseNotifications } = useNotificationStore();
   const [eventType, setEventType] = useState<typeof WindowEventService>();

   useEffect(() => {
      import("Sharedlib/eventservice").
         then((event) => {
            setEventType(event.default);
            event.default.subscribe(eventName, updateHandler)
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      return () => {
         eventType.unsubscribe(eventName, updateHandler)
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