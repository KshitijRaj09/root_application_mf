import React from "react";
import CircularLoader from "@mui/material/CircularProgress";

const Loader = () => (
   <div style={{display: "flex", justifyContent: "center"}}>
      <CircularLoader color='secondary' />
   </div>
);

export default Loader;
