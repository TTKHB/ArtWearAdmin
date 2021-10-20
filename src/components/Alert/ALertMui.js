import React from "react";
import MuiAlert from "@mui/material/Alert";

const ALertMui = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default ALertMui;
