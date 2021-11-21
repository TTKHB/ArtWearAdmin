import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { colors } from "./../../assets/data/colors";
import BootstrapDialog from "./BootstrapDialog";
import BootstrapDialogTitle from "./BootstrapDialogTitle";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

const InputFile = styled("input")({
  display: "none",
});

const InputFileMultiple = styled("input")();

const DialogAddPhoCover = ({
  handleClose,
  open,
  handleSelectedColor,
  handleImageFile,
}) => {
  const [images, setImages] = React.useState([]);
  const [color, setColor] = React.useState({});

  const submitAddPhoCover = () => {
    handleImageFile(color, images);
    handleSelectedColor(color);
    setImages([]);
    setColor([]);
  };

  const setFileMultiple = async (e) => {
    e.preventDefault();
    setImages([]);
    //Get the files
    let file = [...e.target.files] || [];

    file.forEach((item, index) => {
      let reader = new FileReader();

      reader.onloadend = () => {
        setImages((prestate) => [...prestate, reader.result]);
      };

      reader.readAsDataURL(file[index]);
    });
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        Thêm ảnh bìa
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div style={{ width: 550, height: 500 }}>
          <Autocomplete
            id="free-solo-2-demo"
            disableClearable
            autoHighlight
            onChange={(e, data) => {
              setColor(data);
            }}
            fullWidth={true}
            options={colors}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
                key={option.id.toString()}
              >
                <p>{option.name}</p>
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Chọn màu"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <div direction="row" alignItems="center" spacing={2}>
            <p
              style={{
                marginLeft: 9,
                marginBottom: 8,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Thêm ảnh bìa
            </p>
            <InputFileMultiple
              onChange={setFileMultiple}
              accept="image/*"
              type="file"
              multiple
              style={{ marginLeft: 9, marginBottom: 8 }}
            />
          </div>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  class="fit-picture"
                  // src="https://static.thenounproject.com/png/187803-200.png"
                  src={
                    image
                      ? image
                      : "https://static.thenounproject.com/png/187803-200.png"
                  }
                  width={200}
                  height={200}
                  alt="ảnh sản phẩm"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={submitAddPhoCover}>
          Thêm ảnh
        </Button>
        <Button
          autoFocus
          onClick={() => {
            {
              setImages([]);
              handleClose();
            }
          }}
        >
          Hủy
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DialogAddPhoCover;
