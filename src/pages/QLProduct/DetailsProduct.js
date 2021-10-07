import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CircleIcon from "@mui/icons-material/Circle";
import Divider from "@mui/material/Divider";
import { useLocation, useHistory } from "react-router-dom";
import baseURL from "./../../assets/common/baseUrl";
import axios from "axios";

const DetailsProduct = (props) => {
  const [products, setProducts] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [selectColor, setSelectColor] = React.useState("");
  const [ImgSrc, setImgSrc] = React.useState([]);

  const location = useLocation();

  const id = location.state.id ? location.state.id : "";

  // const images = [9, 8, 7, 6, 5, 12, 21, 32, 34, 15, 65].map((number) => ({
  //   src: `https://placedog.net/${number}00/${number}00?id=${number}`,
  // }));

  // Fetch details product
  React.useEffect(() => {
    axios
      .get(`${baseURL}/products/` + id)
      .then(function (response) {
        setProducts(response.data);
        console.log("details", response.data);
        setImages(response.data.product);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    // return () => {
    //   setProducts([]);
    // };
    // baseURL
  }, []);

  //handle and fetch color
  React.useEffect(() => {
    let color = [];
    images.forEach((item) => {
      color.push(item.mau);
    });
    setColors([...color]);
    console.log("hello", colors);
    return () => {
      setColors([]);
    };
  }, [images]);

  React.useEffect(() => {
    const indexOfColor = images.findIndex((item) => {
      return item.mau == selectColor;
    });
    let imgsrc = [];
    if (indexOfColor != -1) {
      const data = images[indexOfColor].image.forEach((image) => {
        imgsrc.push({ src: image });
      });
      setImgSrc([...imgsrc]);
    }
    // setImages(img);
  }, [images, selectColor]);

  return (
    <Container style={{ backgroundColor: "rgb(248 248 252)" }}>
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        <Grid item xs={8} style={{}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              ArtWear
            </Link>
            <Typography color="text.primary">Quản lý sản phẩm</Typography>
            <Link underline="hover" color="inherit" href="/qlsanpham/sanpham">
              Sản phẩm
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href={"/qlsanpham/sanpham/" + id}
            >
              {id}
            </Link>
          </Breadcrumbs>
        </Grid>
        <Grid
          style={{
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
          }}
          item
          container
        >
          <Typography style={{}} variant="h5">
            Ten san pham
          </Typography>
          <Rating
            name="half-rating-read"
            defaultValue={2.5}
            precision={0.5}
            readOnly
            style={{ marginLeft: 20 }}
          />
          <Typography style={{ marginLeft: 10 }}>30 đánh giá</Typography>
          <Typography style={{ marginLeft: 10 }}>300 lượt xem</Typography>
          <Typography style={{ marginLeft: 10 }}>còn 30 sản phẩm</Typography>
          <Typography style={{ marginLeft: 10 }}>Đã bán 40 sản phẩm</Typography>
        </Grid>
        <Grid item container>
          <div style={{ flex: 1 }}>
            <Divider />
          </div>
        </Grid>
        {/* Header */}
        <Grid
          item
          xs={7}
          style={{
            marginLeft: 10,
            backgroundColor: "white",
            padding: 20,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              flex: 1,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Carousel
              hasSizeButton={false}
              hasMediaButton={false}
              hasIndexBoard={false}
              images={ImgSrc}
              shouldLazyLoad={false}
              style={{
                height: 450,
                backgroundColor: "white",
              }}
            />
          </div>
        </Grid>
        {/* Box right */}
        <Grid
          item
          xs={4}
          style={{
            backgroundColor: "white",
            marginLeft: 10,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Container>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Ngày tạo:
            </Typography>
            <Typography variant="h6">Được tạo vào ngày 1/1/2020</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              màu:
            </Typography>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item>
                {colors.map((color, index) => {
                  return (
                    <Chip
                      onClick={() => {
                        setSelectColor(color);
                      }}
                      icon={<CircleIcon style={{ color: color }} />}
                      label={color}
                      style={{ margin: 3 }}
                      color={selectColor == color ? "primary" : "default"}
                      variant={selectColor == color ? null : "outlined"}
                    />
                  );
                })}
              </Grid>
            </Grid>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Kích thước
            </Typography>
            <Grid item>
              <Chip label="XS" style={{ margin: 3 }} />
              <Chip label="XS" style={{ margin: 3 }} />
              <Chip label="XS" style={{ margin: 3 }} />
            </Grid>

            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Giá:
            </Typography>
            <Typography
              variant="h6"
              style={{ fontWeight: "bold", color: "red" }}
            >
              2.000.000 vnd
            </Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Giảm giá
            </Typography>
            <Typography variant="h6">giam gia test</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Dashboard
            </Typography>
            <Typography variant="h6">Được tạo vào ngày 1/1/2020</Typography>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Thể loại
            </Typography>
            <Typography variant="h6">Thể loại abc</Typography>
          </Container>
        </Grid>
        <Grid
          style={{
            alignItems: "center",
            backgroundColor: "white",
            marginTop: 10,
          }}
          container
          item
        >
          <div style={{ flex: 1 }}>
            <Divider />
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", textAlign: "center" }}
            >
              mô tả
            </Typography>
            <Typography variant="h6">Day la mo ta</Typography>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DetailsProduct;
