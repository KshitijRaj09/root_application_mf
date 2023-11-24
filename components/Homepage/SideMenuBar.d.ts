import React from "react";
type SideMenuBarPropsType = {
    children: JSX.Element;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
export declare const SideMenuBar: ({ children, setIsAuthenticated, }: SideMenuBarPropsType) => React.JSX.Element;
export {};
