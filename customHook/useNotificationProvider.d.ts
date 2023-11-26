import { WindowEvents } from "@kshitijraj09/sharedlib_mf";
declare const useNotificationProvider: <Type>(eventName: WindowEvents) => {
    detail: Type;
    loading: boolean;
    outputStack: Type[];
};
export default useNotificationProvider;
