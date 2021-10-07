import React from "react";
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

const UpdateProduct = () => {
  const [value, setValue] = React.useState("");

  console.log("value", value.imagePreviewUrl);
  const setFile = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log("e", file);
    reader.onloadend = () => {
      setValue({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
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
          label="ID"
          defaultValue="Hello World"
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          label="Tên"
          defaultValue="Hello World"
          fullWidth
        />
        <TextField
          label="Giá"
          type={"number"}
          id="outlined-start-adornment"
          sx={{ m: 1, width: "25ch" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">đ</InputAdornment>,
          }}
          fullWidth
        />
        <TextField
          required
          id="outlined-required"
          label="Kích thước"
          defaultValue="Hello World"
          fullWidth
        />

        <TextField
          required
          id="outlined-required"
          label="số lượng"
          defaultValue="Hello World"
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
        <img src={value.imagePreviewUrl} width={100} height={130} />

        <TextField
          id="outlined-multiline-static"
          label="Mô tả"
          multiline
          rows={5}
          fullWidth
          defaultValue="Default Value"
        />
      </Box>
    </Container>
  );
};

export default UpdateProduct;
