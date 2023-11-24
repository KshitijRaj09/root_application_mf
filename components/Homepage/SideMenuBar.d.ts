import React from "react";
import { PageEnum } from "../../typesdeclarations/type";
type SideMenuBarPropsType = {
    children: JSX.Element;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedPage: React.Dispatch<React.SetStateAction<PageEnum>>;
};
export declare const SideMenuBar: ({ children, setIsAuthenticated, setSelectedPage }: SideMenuBarPropsType) => React.JSX.Element;
export {};
