import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";

import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { Link as LinkRouter } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import baseURL from "./../../assets/common/baseUrl";
import axios from "axios";

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
  const [products, setProducts] = React.useState([]);
  const [numPage, setNumPage] = React.useState(1);
  console.log("product", products);
  const productPerPage = 5;
  const indexOfLastProduct = numPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location = useLocation();
  console.log(location.pathname);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let history = useHistory();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const HandleNavigateDetails = (id) => {
    // history.push({"/qlsanpham/sanpham/" + id});
    history.push({
      pathname: "/qlsanpham/sanpham/" + id,
      state: { id: id },
    });
  };

  React.useEffect(() => {}, [numPage]);

  // Fetch product
  React.useEffect(() => {
    axios
      .get(`${baseURL}/products`)
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    return () => {
      setProducts([]);
    };
    // baseURL
  }, []);

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
                  <IconButton aria-label="settings" onClick={handleClick}>
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
                <MenuItem onClick={handleClose} disableRipple>
                  <EditIcon />
                  Edit
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <FileCopyIcon />
                  Duplicate
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                  <ArchiveIcon />
                  Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                  <MoreHorizIcon />
                  More
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
