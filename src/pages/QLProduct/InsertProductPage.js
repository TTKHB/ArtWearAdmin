import React from "react";
import { Input } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import useCategories from "./../../hooks/useCategories";
import NumberFormatCustom from "./../../components/Format/NumberFormatCustom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import axios from "axios";
import baseURL from "./../../assets/common/baseUrl";
import MenuItem from "@mui/material/MenuItem";
import ALertMui from "./../../components/Alert/ALertMui";
import Snackbar from "@mui/material/Snackbar";

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

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePrice = (event) => {
    setPrice({
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  // const handleChangeImages = (event) => {
  //   setImages(event.target.value);
  // };

  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  console.log("value", value.imagePreviewUrl);

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
  const handbleSubmitted = (event) => {
    event.preventDefault();

    let sizes = [];
    sizeAutoComple.forEach((size) => {
      sizes.push(size.key);
    });

    axios
      .post(`${baseURL}/products`, {
        ten: name,
        gia: price.numberformat,
        kichthuoc: sizes,
        mota: description,
        ThumbImg: "this is images",
        soluong: quantity,
        categories_id: idCategories,
      })
      .then(function (response) {
        if (response.status === 200) {
          showAlertSuccess();
        } else {
          showAlertFailure();
        }
      })
      .catch(function (error) {
        showAlertFailure();

        console.log(error);
      });
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

    setOpenSuccess(false);
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
        {/* <TextField
          label="Giá"
          type={"number"}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
          fullWidth
          defaultValue={price}
          onChange={handleChangePrice}
        /> */}
        <TextField
          label="Giá"
          value={price.numberformat}
          onChange={handleChangePrice}
          id="outlined-start-adornment"
          name="numberformat"
          required
          // sx={{ m: 1, width: "25ch" }}
          // InputProps={{
          //   startAdornment: (
          //     <InputAdornment position="start">đ</InputAdornment>
          //   ),
          // }}
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
        <Input
          accept="image/*"
          onChange={setFile}
          type="file"
          multiple
          style={{ marginLeft: 9, marginBottom: 8 }}
        />
        <img
          src={FileImage.imagePreviewUrl}
          style={!FileImage.imagePreviewUrl ? { display: "none" } : {}}
          width={100}
          height={130}
        />
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
