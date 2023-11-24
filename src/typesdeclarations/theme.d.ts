import { Theme } from "@mui/material";

declare module '@mui/material/styles' {
   interface BreakpointOverrides {
      xs: false; // removes the `xs` breakpoint
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true; // adds the `mobile` breakpoint
      tablet: true;
      laptop: true;
      largeScreen: true;
   }
   // allow configuration using `createTheme`
   interface ThemeOptions {
      status?: {
          danger?: string;
      };
      applicationBackgroundColor: string,
      createPostBackgroundColor: string,
   
   }
    export type themeType = Theme & ThemeOptions & BreakpointOverrides;
}