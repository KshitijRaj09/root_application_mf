import { axiosInstance } from '../../../apis/axiosInstance';
import { registerApiUrl } from '../../../apis/apiconstants';
import { registerFormdataType } from '../typedeclaration';
import { EventEmitter } from '../../../util';

export const registerApi = async (input: registerFormdataType) => {
    try {
        const { data } = await axiosInstance.post(registerApiUrl, input);
        return data;
    }
    catch (error) {
        console.log(error);
        EventEmitter.dispatch("registrationfailed",error)
    }
};