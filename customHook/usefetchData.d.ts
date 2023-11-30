import React from 'react';
type apiMethodType = (value: string) => Promise<any>;
type Data = {
    status: number;
};
export declare const useFetchData: <Type>(apiMethod: apiMethodType, value: string, initialState: Type) => {
    data: Type & Data;
    isLoading: boolean;
    isError: boolean;
    setData: React.Dispatch<React.SetStateAction<Type & Data>>;
};
export {};
