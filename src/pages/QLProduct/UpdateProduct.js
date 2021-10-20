import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Input } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import { IMaskInput } from "react-imask";
import NumberFormat from "react-number-format";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import baseURL from "./../../assets/common/baseUrl";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import useCategories from "./../../hooks/useCategories";
import useProduct from "./../../hooks/useProduct";
import NumberFormatCustom from "./../../components/Format/NumberFormatCustom";
import ALertMui from "./../../components/Alert/ALertMui";

const UpdateProduct = () => {
  const [price, setPrice] = React.useState({
    numberformat: "",
  });
  const [id, setId] = React.useState("");
  const { products } = useProduct();
  const [FileImage, setFileImage] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { categories } = useCategories();
  const [idCategories, setIdCategories] = React.useState([]);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [sizeAutoComple, setSizeAutoComple] = React.useState([]);
  const [openFailure, setOpenFailure] = React.useState(false);
  const [quantity, setQuantity] = React.useState("");
  const textFieldRefNumber = useRef();
  console.log(
    "🚀 ~ file: UpdateProduct.js ~ line 77 ~ UpdateProduct ~ sizeAutoComple",
    sizeAutoComple
  );
  // console.log(
  //   "textFieldRef.current.value",
  //   (textFieldRefNumber.current.value = 2)
  // );
  const location = useLocation();
  const history = useHistory();
  // handle pass item from product page
  React.useEffect(() => {
    if (typeof location.state !== "undefined") {
      const item = location.state.item;
      console.log(
        "🚀 ~ file: UpdateProduct.js ~ line 56 ~ React.useEffect ~ item",
        item
      );
      setId(item.id);
      setName(item.ten);
      setPrice({ numberformat: item.gia });
      textFieldRefNumber.current.value = item.soluong;
      // setSizeAutoComple(item.kichthuoc);
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

  console.log("categories", categories);

  const handleChangePrice = (event) => {
    setPrice({
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
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

    setOpenSuccess(false);
  };

  //func xử lý khi bấm cập nhật
  const handbleSubmitted = (event) => {
    event.preventDefault();
    let sizes = [];
    sizeAutoComple.forEach((size) => {
      sizes.push(size.key);
    });

    axios
      .put(`${baseURL}/products/` + id, {
        ten: name,
        gia: price.numberformat,
        kichthuoc: sizes,
        mota: description,
        ThumbImg: "this is images",
        soluong: quantity,
        categories_id: idCategories,
      })
      .then(function (response) {
        console.log("result post ", response);
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
          inputRef={textFieldRefNumber}
          required
          id="outlined-required"
          label="số lượng"
          defaultValue={quantity}
          onChange={handleChangeQuantity}
          fullWidth
          inputProps={{ min: 0, max: 10000 }}
          type={"number"}
          InputLabelProps={{ shrink: true }}
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
        <Input
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
        />
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
    </Container>
  );
};
const sizes = [
  { key: "XS", value: "Extra Small" },
  { key: "S", value: "Small" },
  { key: "M", value: "Medium" },
  { key: "L", value: "Large" },
];

export default UpdateProduct;
