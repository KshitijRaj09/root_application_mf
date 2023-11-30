import { notificationApiRoute } from "./apiconstants";
import { axiosInstance } from "./axiosInstance";

export const getNotificationsAPI = async () => {
    try {
        const { data } = await axiosInstance.get(notificationApiRoute);       
        return data;
    } catch (response ) {
        console.log(response);
    }
}