import {createRoot} from "react-dom/client";
import React from "react";
import "./index.css";
import { Main } from "./components/Main";

// Clear the existing HTML content
//document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
console.log('root loaded');
const root = createRoot(document.getElementById("app"));
root.render(<Main />);
