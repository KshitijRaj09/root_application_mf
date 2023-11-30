import { getUserDetailsAPIUrl } from "./apiconstants";
import { axiosInstance } from "./axiosInstance";

export const getUserDetailsApi = async () => {
    try {
        const { data } = await axiosInstance.get(getUserDetailsAPIUrl);
        return data;
    } catch (response ) {
        console.log(response);
    }
}