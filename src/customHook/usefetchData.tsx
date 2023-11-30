import React, { useEffect, useState } from 'react';

type apiMethodType = (value: string) => Promise<any>;
type Data = {
   status: number;
}

export const useFetchData = <Type,>(apiMethod: apiMethodType, value: string, initialState: Type) => {
   const initialValue: Type & Data = { ...initialState, status: null };
   const [data, setData] = useState<Type & Data>(initialValue);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isError, setIsError] = useState<boolean>(false);

   const apiMethodHandler = async () => {
      const { data: response, status } = await apiMethod(value);
      console.log(response);
      if (status !==200) {
         setData(response);
      }
      else {
         setIsError(true);
      }
      setIsLoading(false);
   }
   useEffect(() => {
      setIsLoading(true);
      apiMethodHandler();
   }, [value]);

   return { data, isLoading, isError, setData };
}