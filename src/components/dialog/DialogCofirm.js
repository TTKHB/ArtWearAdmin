import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const DialogCofirm = ({ open, setOpen, yes }) => {
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xóa sản phẩm"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa sản phẩm này không
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "#21ba45", color: "white" }}
            variant="contained"
            onClick={yes}
          >
            Yes
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={handleClose}
            autoFocus
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogCofirm;
