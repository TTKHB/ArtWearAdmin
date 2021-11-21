import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import useCategories from "./../../hooks/useCategories";
import NumberFormatCustom from "./../../components/Format/NumberFormatCustom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import ALertMui from "./../../components/Alert/ALertMui";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import DialogAddPhoCover from "./../../components/dialog/DialogAddPhoCover";
import ListChip from "./../../components/Chip/ListChip";
import { parseImgCloudinary } from "../../Handler/handlerCloudinary";
import { InsertProductFromData } from "./../../Handler/handlerProduct";
import BackdropProgress from "../../components/Progress/BackdropProgress";
const InputFile = styled("input")({
  display: "none",
});

const InsertProductPage = () => {
  const [value, setValue] = React.useState("");
  const [name, setName] = React.useState("");
  const [FileImage, setFileImage] = React.useState("");
  const [price, setPrice] = React.useState({
    numberformat: "",
  });
  const [size, setSize] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [sizeAutoComple, setSizeAutoComple] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const { categories } = useCategories();
  const [idCategories, setIdCategories] = React.useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [openColorFailure, setOpenColorFailure] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState([]);
  const [selectColor, setSelectColor] = React.useState("");
  const [imageFile, setImageFile] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [imageFileFiltered, setImageFileFiltered] = React.useState([]);

  const handleCloseLoading = () => {
    setLoading(false);
  };
  const handleToggle = () => {
    setLoading(!loading);
  };

  React.useEffect(() => {
    const colorFiltered = imageFile.filter((image) => {
      return image.color == selectColor;
    });

    setImageFileFiltered(colorFiltered);
  }, [selectColor]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice({
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeSelectColor = (data) => {
    setSelectColor(data);
  };

  const handleChangeSize = (e) => {
    setSize(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleImageFile = (color, data) => {
    setImageFile((prestate) => [
      ...prestate,
      { color: color.hexString, images: [...data] },
    ]);

    setOpen(false);
  };

  const handleSelectedColor = (color) => {
    console.log(
      "🚀 ~ file: InsertProductPage.js ~ line 118 ~ handleSelectedColor ~ color",
      color
    );
    let isExist = true;
    colors.forEach((item) => {
      console.log(
        "🚀 ~ file: InsertProductPage.js ~ line 120 ~ handleSelectedColor ~ color",
        color
      );
      if (item.name == color.name) {
        showAlertColorFailure();
        isExist = false;
      }
    });
    if (isExist) {
      setColors((prestate) => [...prestate, color]);
    }
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const setFile = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("e", file);
    reader.onloadend = () => {
      setFileImage({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  //func xử lý khi bấm thêm
  const handbleSubmitted = async (e) => {
    e.preventDefault();
    setLoading(true);
    let mainImg;
    const linkImg = await parseImgCloudinary(FileImage.imagePreviewUrl);
    mainImg = linkImg;

    let sizes = [];
    sizeAutoComple.forEach((size) => {
      sizes.push(size.key);
    });

    //list images banner
    let dataImg = [];

    for (let item of imageFile) {
      let image = [];

      for (let data of item.images) {
        const indexItem = imageFile.indexOf(item);
        const linkImgs = await parseImgCloudinary(data);
        image.push(linkImgs);
        dataImg[indexItem] = { mau: item.color, image };
      }
    }

    console.log(
      "🚀 ~ file: InsertProductPage.js ~ line 219 ~ handbleSubmitted ~ product",
      dataImg
    );

    try {
      const res_addProduct = await InsertProductFromData({
        name,
        price,
        sizes,
        description,
        quantity,
        idCategories,
        dataImg,
        mainImg,
      });

      if (res_addProduct.status == 200) {
        setLoading(false);
        showAlertSuccess();
      } else {
        showAlertFailure();
      }
    } catch (e) {
      showAlertFailure();
    }
  };

  const handleChangeSelectIdCategory = (e) => {
    setIdCategories(e.target.value);
  };

  const showAlertSuccess = () => {
    setOpenSuccess(true);
  };

  const showAlertFailure = () => {
    setOpenFailure(true);
  };

  const showAlertColorFailure = () => {
    setOpenColorFailure(true);
  };

  //xóa color và ảnh được file ảnh
  const handleDeleteColor = (data) => {
    console.log(
      "🚀 ~ file: InsertProductPage.js ~ line 239 ~ handleDeleteColor ~ data",
      data
    );

    const colorFiltered = colors.filter((item) => {
      return item.id != data.id;
    });

    const deleteFileImage = imageFile.filter(
      (item) => item.color != data.hexString
    );
    setImageFileFiltered([]);
    setImageFile(deleteFileImage);
    setColors(colorFiltered);
  };

  const handleCloseAlertSuccess = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseAlertFailure = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFailure(false);
  };
  const handleCloseColorFailure = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenColorFailure(false);
  };

  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        onSubmit={handbleSubmitted}
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          marginTop: 10,
        }}
      >
        <Typography
          style={{ textAlign: "center", fontWeight: "bold" }}
          variant="h5"
          component="div"
          gutterBottom
        >
          Thêm sản phẩm
        </Typography>
        <TextField
          required
          id="outlined-required"
          label="Tên"
          defaultValue={name}
          onChange={handleChangeName}
          fullWidth
        />

        <TextField
          label="Giá"
          value={price.numberformat}
          onChange={handleChangePrice}
          id="outlined-start-adornment"
          name="numberformat"
          required
          id="formatted-numberformat-input"
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          fullWidth
        />

        <Autocomplete
          multiple
          id="tags-outlined"
          options={sizes}
          getOptionLabel={(option) => option.key}
          defaultValue={sizeAutoComple}
          onChange={(e, data) => {
            setSizeAutoComple(data);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              required={sizeAutoComple.length > 0 ? false : true}
              label="kích cỡ đồ"
              placeholder="kích cỡ đồ"
            />
          )}
        />
        <TextField
          required
          id="outlined-required"
          label="số lượng"
          defaultValue={quantity}
          onChange={handleChangeQuantity}
          fullWidth
          type={"number"}
        />

        <div direction="row" alignItems="center" spacing={2}>
          <label htmlFor="icon-button-file">
            <p
              style={{
                marginLeft: 9,
                marginBottom: 8,
                marginTop: 10,
                fontWeight: "bold",
              }}
            >
              Ảnh sản phẩm
            </p>
            <InputFile
              accept="image/*"
              multiple
              id="icon-button-file"
              type="file"
              onChange={setFile}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <img
                class="fit-picture"
                // src="https://static.thenounproject.com/png/187803-200.png"
                src={
                  FileImage.imagePreviewUrl
                    ? FileImage.imagePreviewUrl
                    : "https://static.thenounproject.com/png/187803-200.png"
                }
                width={200}
                height={200}
                alt="ảnh sản phẩm"
              />
            </IconButton>
          </label>
        </div>

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

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <img
            onClick={handleClickOpen}
            class="fit-picture"
            // src="https://static.thenounproject.com/png/187803-200.png"
            src={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUV9iNoLIa98yEIijTf6RdDNIKXQYAmVFF1cXTz-JXB66e-E2C7R92QUQrJLC3_RJWZRY&usqp=CAU"
            }
            width={60}
            height={60}
            alt="ảnh sản phẩm"
          />
        </IconButton>
        <ListChip
          colors={colors}
          onClick={handleChangeSelectColor}
          setColors={setColors}
          selectColor={selectColor}
          onDelete={handleDeleteColor}
        />
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {imageFileFiltered[0]
            ? imageFileFiltered[0].images.map((image, index) => (
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
              ))
            : null}
        </Swiper>
        <TextField
          id="outlined-select-currency"
          select
          label="Thể loại"
          fullWidth
          required
          value={idCategories}
          onChange={handleChangeSelectIdCategory}
          helperText="Please select your currency"
        >
          {categories.map((item) => (
            <MenuItem key={item._id} value={item._id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          rows={5}
          required
          fullWidth
          defaultValue={description}
        />
        <Button type="submit" variant="contained">
          Thêm sản phẩm
        </Button>
      </Box>

      {/* thông báo thành công */}
      <Snackbar
        open={openSuccess}
        autoHideDuration={3000}
        onClose={handleCloseAlertSuccess}
      >
        <ALertMui
          onClose={handleCloseAlertSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          thêm sản phẩm thành công
        </ALertMui>
      </Snackbar>
      <Snackbar
        open={openFailure}
        autoHideDuration={3000}
        onClose={handleCloseAlertFailure}
      >
        <ALertMui
          onClose={handleCloseAlertFailure}
          severity="error"
          sx={{ width: "100%" }}
        >
          Thêm sản phẩm thất bại
        </ALertMui>
      </Snackbar>
      <Snackbar
        open={openColorFailure}
        autoHideDuration={3000}
        onClose={handleCloseColorFailure}
      >
        <ALertMui
          onClose={handleCloseColorFailure}
          severity="error"
          sx={{ width: "100%" }}
        >
          Không được chọn màu giống nhau
        </ALertMui>
      </Snackbar>

      <DialogAddPhoCover
        handleClose={handleClose}
        open={open}
        handleSelectedColor={handleSelectedColor}
        handleImageFile={handleImageFile}
      />
      <BackdropProgress open={loading} />
    </Container>
  );
};

const sizes = [
  { key: "XS", value: "Extra Small" },
  { key: "S", value: "Small" },
  { key: "M", value: "Medium" },
  { key: "L", value: "Large" },
];

export default InsertProductPage;
