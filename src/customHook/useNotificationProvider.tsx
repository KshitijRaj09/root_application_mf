import { WindowEvents } from "@kshitijraj09/sharedlib_mf";
import WindowEventService from "Sharedlib/eventservice";
import { useEffect, useState } from "react";

const useNotificationProvider = <Type,>(eventName: WindowEvents) => {

   const [detail, setDetail] = useState<Type>();
   const [loading, setLoading] = useState(true);
   const [outputStack, setOutputStack] = useState<Type[]>([]);

   useEffect(() => {
      import("Sharedlib/eventservice").
         then((event) => {
            event.default.subscribe(eventName, updateHandler)
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      return () => {
         WindowEventService.unsubscribe(eventName, updateHandler)
      }
   }, []);

   const updateHandler = (event: Event) => {
      const { detail } = event as CustomEvent;
      setDetail(detail);
      setOutputStack((prev) => ([detail, ...prev]));
      setLoading(false);
   }

   return {detail, loading, outputStack}
}

export default useNotificationProvider;