type UserInfoType = {
    username: string;
    name: string;
    avatar: string;
    userid: string;
};
export declare const getAccessToken: () => string;
export declare const setAccessToken: (token: string) => void;
export declare const clearAccessToken: () => void;
export declare const setUserInfoInStorage: (userInfo: UserInfoType) => void;
export declare const getUserInfoFromStorage: () => string;
export declare const clearUserInfoFromStorage: () => void;
export declare const appendLeadingZero: (input: number) => string;
export declare const dateFormatter: (inputDate: Date, isTimeStampRequired: boolean) => string;
export declare const EventEmitter: {
    events: {};
    dispatch: (event: any, data: any) => void;
    subscribe: (event: any, callback: any) => void;
};
export declare const sendNotification: (message: string, userInfo: {
    avatar: string;
    username: string;
}) => void;
export declare const checkNotificationStatus: (message: string, userInfo: {
    avatar: string;
    username: string;
}) => void;
export {};
