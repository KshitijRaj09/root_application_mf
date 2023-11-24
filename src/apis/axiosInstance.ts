import axios from "axios";
import { getAccessToken } from "../util";

export const axiosInstance = axios.create({
    baseURL: process.env.APIBASEURL,
    headers: {
        ['Content-Type']: 'application/json'
    }
});

axiosInstance.interceptors.request.use((config): any => {
    config.headers.Authorization = `bearer ${getAccessToken()}`;
    return config;
});