import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from 'react';
import { Root } from './Root';
import Loader from "./Loaders";
import  WindowEventService  from "Sharedlib/eventservice";
export const Main = () => {
   const [theme, setTheme] = useState(null);
   
   
   useEffect(() => {
      import('Sharedlib/theme').then((sharedTheme) => {
         setTheme(sharedTheme.default);
         console.log('here theme',sharedTheme.default, WindowEventService);
         
      }).catch((error) => {
         console.log('Error loading shared theme', error);
      })
   }, []);
   
   if (!theme) {
      return (
        <Loader />
      );
    }

   return (
      <ThemeProvider theme={theme}>
         <Root />
      </ThemeProvider>
      )
}