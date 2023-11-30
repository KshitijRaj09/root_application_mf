import { loginApiUrl } from "../../../apis/apiconstants";
import { loginFormdataType } from "../typedeclaration";
import { EventEmitter } from "../../../util";
import { axiosInstance } from "../../../apis/axiosInstance";

export const loginApi = async (input: loginFormdataType) => {
    try {

        const { data } = await axiosInstance.post(loginApiUrl, input);
        return data
    }
    catch (error) {
        console.log("error Login api", error);
        EventEmitter.dispatch('loginfailed', error);
    }
}