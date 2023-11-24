import React from "react";
import Alert from "@mui/material/Alert";

export const AlertComponent = ({errorMessage}: any) => {
   return <Alert severity='error'>{errorMessage}</Alert>;
};
