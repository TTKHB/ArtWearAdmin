import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const BackdropProgress = ({ open, onClick }) => {
  console.log(
    "🚀 ~ file: BackdropProgress.js ~ line 6 ~ BackdropProgress ~ open",
    open
  );
  return (
    <Backdrop
      sx={{ color: "#8D6E63", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={onClick}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropProgress;
