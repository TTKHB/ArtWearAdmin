import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { useLocation, useHistory } from "react-router-dom";
import baseURL from "./../../assets/common/baseUrl";
import axios from "axios";
import useProduct from "./../../hooks/useProduct";
import DialogCofirm from "./../../components/dialog/DialogCofirm";
import Snackbar from "@mui/material/Snackbar";
import ALertMui from "./../../components/Alert/ALertMui";
import CircularProgress from "@mui/material/CircularProgress";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function RecipeReviewCard(props) {
  // const [products, setProducts] = React.useState([]);
  const [numPage, setNumPage] = React.useState(1);
  const { products, getAllProducts, deleteProductsById } = useProduct();
  console.log("product", products);
  const productPerPage = 6;
  const indexOfLastProduct = numPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const [expanded, setExpanded] = React.useState(false);
  const [openDeleteFailed, setOpenDeleteFailed] = React.useState(false);
  const [openDeleteSuccess, setOpenDeleteSuccess] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemOfProduct, setItemOfProduct] = React.useState(null);
  const location = useLocation();
  const [openDialogCofirm, setOpenDialogCofirm] = React.useState(false);

  let history = useHistory();
  console.log(location.pathname);
  const open = Boolean(anchorEl);
  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItemOfProduct(item);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickedItem = (index) => {
    console.log("item a", index);
    history.push({
      pathname: "/MainDrawer/qlsanpham/updatesanpham",
      state: { item: itemOfProduct },
    });
    setAnchorEl(null);
  };

  const handleDeleteProduct = async () => {
    const id = itemOfProduct.id;
    const status = await deleteProductsById(id);
    if (status) {
      setOpenDialogCofirm(false);
      getAllProducts();

      console.log("thanh cong");
    } else {
      console.log("that bai");
    }
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCloseDeleteFailed = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteFailed(false);
  };

  const handleCloseDeleteSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenDeleteSuccess(false);
  };

  const HandleNavigateDetails = (id) => {
    // history.push({"/qlsanpham/sanpham/" + id});
    history.push({
      pathname: "/MainDrawer/qlsanpham/sanpham/" + id,
      state: { id: id },
    });
  };

  const formatDate = (date) => {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "long",
    };

    return date.toLocaleDateString("vi", options);
  };
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          ArtWear
        </Link>
        <Typography color="text.primary">Quản lý sản phẩm</Typography>
        <Link underline="hover" color="inherit" href="/qlsanpham/sanpham">
          Sản phẩm
        </Link>
      </Breadcrumbs>
      <br></br>
      {/* end breadcrumbs */}
      {products.length > 0 ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {currentProduct.map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <Card sx={{ maxWidth: 320 }}>
                <CardHeader
                  action={
                    <IconButton
                      aria-label="settings"
                      onClick={(e) => handleClick(e, item)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={item.ten}
                  subheader={formatDate(new Date(item.ngaytao))}
                />

                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClickedItem} disableRipple>
                    <EditIcon />
                    chỉnh sửa sản phẩm
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setOpenDialogCofirm(true);
                    }}
                    disableRipple
                  >
                    <DeleteIcon />
                    xóa sản phẩm
                  </MenuItem>
                </StyledMenu>
                <CardMedia
                  component="img"
                  height="250"
                  image={item.ThumbImg}
                  alt="Paella dish"
                  onClick={() => HandleNavigateDetails(item.id)}
                />
                <CardContent>
                  <Typography
                    style={{ fontWeight: "bold" }}
                    variant="h6"
                    color="text.secondary"
                  >
                    đ {item.gia}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: "80vh",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <CircularProgress size={60} color="inherit" />
        </div>
      )}

      <DialogCofirm
        open={openDialogCofirm}
        setOpen={setOpenDialogCofirm}
        yes={handleDeleteProduct}
      />
      <Snackbar
        open={openDeleteFailed}
        autoHideDuration={3000}
        onClose={handleCloseDeleteFailed}
      >
        <ALertMui
          onClose={handleCloseDeleteFailed}
          severity="error"
          sx={{ width: "100%" }}
        >
          Xóa thất bại
        </ALertMui>
      </Snackbar>
      <Snackbar
        open={openDeleteSuccess}
        autoHideDuration={3000}
        onClose={handleCloseDeleteSuccess}
      >
        <ALertMui
          onClose={handleCloseDeleteSuccess}
          severity="success"
          sx={{ width: "100%" }}
        >
          Xóa thành công
        </ALertMui>
      </Snackbar>
      {/* box pagination */}
      <Stack spacing={4} style={{ marginTop: 40 }}>
        <Pagination
          page={numPage}
          onChange={(event, page) => {
            setNumPage(page);
          }}
          count={Math.ceil(products.length / 5)}
          showFirstButton
          showLastButton
        />
      </Stack>
    </Container>
  );
}
