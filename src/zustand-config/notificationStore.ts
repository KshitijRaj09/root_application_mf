import { NotificationType } from '@kshitijraj09/sharedlib_mf';
import { create } from 'zustand';
import { getNotificationsAPI } from '../apis/getNotifications';

interface NotificationState {
   notifications: NotificationType[]
   increaseNotifications: (notification: NotificationType) => void;
   decreaseNotifications: (notification: NotificationType[]) => void;
   fetchNotifications: () => Promise<any>;
}

const useNotificationStore = create<NotificationState>((set) => ({
   notifications: [],
   fetchNotifications: async () => {
      const response = await getNotificationsAPI();
      set(() => ({ notifications: [...response] }))
   },
   increaseNotifications: (newNotification: NotificationType) =>
      set((state) => ({
         notifications: [...state.notifications, newNotification],
      })),

   decreaseNotifications: (notification: NotificationType[]) => {
         set((state) => ({
            notifications: [...notification]
         }));
   },
}));

export default useNotificationStore;