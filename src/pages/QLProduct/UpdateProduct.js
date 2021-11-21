import React, { useRef } from "react";
import { Input } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Autocomplete from "@mui/material/Autocomplete";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import baseURL from "./../../assets/common/baseUrl";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import useCategories from "./../../hooks/useCategories";
import useProduct from "./../../hooks/useProduct";
import NumberFormatCustom from "./../../components/Format/NumberFormatCustom";
import ALertMui from "./../../components/Alert/ALertMui";
import DialogAddPhoCover from "./../../components/dialog/DialogAddPhoCover";
import BackdropProgress from "./../../components/Progress/BackdropProgress";
import IconButton from "@mui/material/IconButton";
import ListChip from "./../../components/Chip/ListChip";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from "@mui/material/styles";
import { colors as ListColors } from "./../../assets/data/colors";
import { UpdateProuctFromData } from "../../Handler/handlerProduct";
import { parseImgCloudinary } from "./../../Handler/handlerCloudinary";

const InputFile = styled("input")({
  display: "none",
});

const UpdateProduct = () => {
  const [price, setPrice] = React.useState({
    numberformat: "",
  });
  const { products } = useProduct();
  const { categories } = useCategories();
  const [id, setId] = React.useState("");
  const [FileImage, setFileImage] = React.useState("");
  const [name, setName] = React.useState({ value: null });
  const [description, setDescription] = React.useState("");
  const [idCategories, setIdCategories] = React.useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [sizeAutoComple, setSizeAutoComple] = React.useState([]);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [quantity, setQuantity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [imageFile, setImageFile] = React.useState([]);
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 48 ~ UpdateProduct ~ imageFile",
    imageFile
  );
  const [colors, setColors] = React.useState([]);
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 57 ~ UpdateProduct ~ colors",
    colors
  );
  const [openColorFailure, setOpenColorFailure] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectColor, setSelectColor] = React.useState("");
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 61 ~ UpdateProduct ~ selectColor",
    selectColor
  );
  const [imageFileFiltered, setImageFileFiltered] = React.useState([]);

  const textFieldRefNumber = useRef();

  const location = useLocation();
  const history = useHistory();

  // handle pass item from product page
  React.useEffect(() => {
    const colorFiltered = imageFile.filter((image) => {
      const foundColor = ListColors.find((itemcolor) => {
        return (
          itemcolor.name.toLowerCase().includes(selectColor) ||
          itemcolor.hexString.toLowerCase().includes(selectColor)
        );
      });
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 81 ~ foundColor ~ foundColor",
        foundColor
      );
      return (
        image.color == selectColor ||
        image.color == foundColor.name.toLowerCase()
      );
    });

    setImageFileFiltered(colorFiltered);
  }, [selectColor]);

  //fill data when clicked editing
  React.useEffect(() => {
    if (typeof location.state !== "undefined") {
      const item = location.state.item;
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 56 ~ React.useEffect ~ item",
        item
      );
      let fetchColors = [];
      let fetchImages = [];
      if (item.product) {
        for (const color of item.product) {
          const index = item.product.indexOf(color);
          if (color.mau) {
            const foundColor = ListColors.find((itemcolor) => {
              return (
                itemcolor.name.toLowerCase().includes(color.mau) ||
                itemcolor.hexString.toLowerCase().includes(color.mau)
              );
            });
            fetchColors.push(foundColor);
          }
          fetchImages.push({ color: color.mau, images: color.image });
        }
      }
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 100 ~ React.useEffect ~ fetchImages",
        fetchImages
      );

      setId(item.id);
      setName({ value: "sadsss" });
      setPrice({ numberformat: item.gia });
      setQuantity(item.soluong);
      setDescription(item.mota);
      setColors(fetchColors);
      setImageFile(fetchImages);
      setFileImage({ imagePreviewUrl: item.ThumbImg });
      textFieldRefNumber.current.value = item.soluong;
      let sizes = [];
      for (let i = 0; i < item.kichthuoc.length; i++) {
        const itemOfSize = item.kichthuoc[i];

        sizes.push({ key: itemOfSize });
      }
      setSizeAutoComple(sizes);
      if (item.categories_id != null) {
        setIdCategories(item.categories_id._id);
      }
      // console.log("typeof item.categories_id._id", typeof item.categories_id);
      // if (typeof item.categories_id._id != null) {
      //   setIdCategories(item.categories_id._id);
      // }

      console.log("test update");
    }
  }, [location]);

  const handleChangePrice = (event) => {
    setPrice({
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeQuantity = (event) => {
    let input = event.target.value.replace(/^0+/, "");
    setQuantity(input);
  };

  const handleChangeName = (event) => {
    setName({ value: event.target.value });
  };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleChangeSelectColor = (data) => {
    setSelectColor(data);
  };

  const handleChangeSelectId = (event) => {
    setId(event.target.value);
  };
  const handleChangeSelectIdCategory = (event) => {
    setIdCategories(event.target.value);
  };
  const showAlertSuccess = () => {
    setOpenSuccess(true);
  };

  const showAlertFailure = () => {
    setOpenFailure(true);
  };

  const handleCloseAlertSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseAlertFailure = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenFailure(false);
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

  const handleCloseColorFailure = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenColorFailure(false);
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
    setImageFile(deleteFileImage);
    setColors(colorFiltered);
  };

  const showAlertColorFailure = () => {
    setOpenColorFailure(true);
  };

  //func xử lý khi bấm cập nhật
  const handbleSubmitted = async (event) => {
    event.preventDefault();
    setLoading(true);
    let mainImg;
    const linkImage = await parseImgCloudinary(FileImage.imagePreviewUrl);
    console.log(
      "🚀 ~ file: UpdateProduct.js ~ line 255 ~ handbleSubmitted ~ linkImage",
      linkImage
    );

    mainImg = linkImage;

    //send data image to cloudinary and  fetch link push to list data
    let dataImg = [];
    for (let item of imageFile) {
      let image = [];
      const indexItem = imageFile.indexOf(item);
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 267 ~ handbleSubmitted ~ indexItem",
        indexItem
      );
      for (let data of item.images) {
        const linkImages = await parseImgCloudinary(data);
        image.push(linkImages);
        dataImg[indexItem] = { mau: item.color, image };
      }
    }
    console.log(
      "🚀 ~ file: UpdateProduct.js ~ line 260 ~ handbleSubmitted ~ dataImg",
      dataImg
    );

    let sizes = [];
    sizeAutoComple.forEach((size) => {
      sizes.push(size.key);
    });

    try {
      const res = await UpdateProuctFromData({
        id,
        name,
        price,
        sizes,
        description,
        quantity,
        idCategories,
        mainImg,
        dataImg,
      });

      if (res.status == 200) {
        setLoading(false);
        showAlertSuccess();
      } else {
        showAlertFailure();
      }
    } catch (e) {
      // showAlertFailure();
    }
  };

  const handleSelectedColor = (color) => {
    let isExist = true;
    colors.forEach((item) => {
      if (item.name == color.name) {
        showAlertColorFailure();
        isExist = false;
      }
    });
    if (isExist) {
      setColors((prestate) => [...prestate, color]);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
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

  return (
    <Container style={{ alignItems: "center" }}>
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
        onSubmit={handbleSubmitted}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 30,
          marginTop: 10,
        }}
      >
        <Typography
          style={{ textAlign: "center", fontWeight: "bold" }}
          variant="h5"
          component="div"
          gutterBottom
        >
          Cập nhật sản phẩm
        </Typography>
        {/* <TextField
            required
            id="outlined-required"
            label="ID"
            defaultValue="Hello World"
            fullWidth
          /> */}
        <TextField
          id="outlined-select-currency"
          select
          label="ID"
          fullWidth
          required
          value={id}
          onChange={handleChangeSelectId}
          helperText="Please select your currency"
        >
          {products.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.ten}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Tên"
          value={name.value}
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
          value={sizeAutoComple}
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
          inputRef={textFieldRefNumber}
          required
          id="outlined-required"
          label="số lượng"
          value={quantity}
          onChange={handleChangeQuantity}
          fullWidth
          inputProps={{ min: null, max: 10000 }}
          type={"number"}
          InputLabelProps={{ shrink: true }}
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
        {/* <Input
          accept="image/*"
          onChange={setFile}
          type="file"
          multiple
          required
          style={{ marginLeft: 9, marginBottom: 8, width: "30%" }}
        />
        <img
          src={FileImage.imagePreviewUrl}
          style={!FileImage.imagePreviewUrl ? { display: "none" } : {}}
          width={100}
          height={130}
        /> */}
        <TextField
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          rows={5}
          fullWidth
          required
          defaultValue={description}
          onChange={handleChangeDescription}
        />

        <Button type="submit" variant="contained">
          Cập nhật
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
          Cập nhật sản phẩm thành công
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
  { key: "XL", value: "Extra Large" },
];

export default UpdateProduct;
