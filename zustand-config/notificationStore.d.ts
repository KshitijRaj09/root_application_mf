import { NotificationType } from '@kshitijraj09/sharedlib_mf';
interface NotificationState {
    notifications: NotificationType[];
    increaseNotifications: (notification: NotificationType) => void;
    decreaseNotifications: (notification: NotificationType[]) => void;
    fetchNotifications: () => Promise<any>;
}
declare const useNotificationStore: import("zustand").UseBoundStore<import("zustand").StoreApi<NotificationState>>;
export default useNotificationStore;
