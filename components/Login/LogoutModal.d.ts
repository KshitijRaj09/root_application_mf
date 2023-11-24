import React from "react";
import { SvgIconProps } from "@mui/material";
type LogoutModalPropstype = {
    text: String;
    icon: React.ReactElement<SvgIconProps>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
declare const LogoutModal: ({ text, icon, setIsAuthenticated, }: LogoutModalPropstype) => React.JSX.Element;
export default LogoutModal;
