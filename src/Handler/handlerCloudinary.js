import axios from "axios";
import { api_cloudinary, api_cloudinaryUser } from "../assets/common/baseUrl";

export const parseImgCloudinary = async (image) => {
  return axios
    .post(api_cloudinary, {
      file: image,
      upload_preset: "artwear_product",
    })
    .then(function (response) {
      if (response.status === 200) {
        // const indexItem = imageFile.indexOf(item);
        // dataImg[indexItem] = { mau: item.color, image };
      }
      return response.data.url;
    })
    .catch(function (error) {
      console.log(error);
    });
};



export const parseImgCloudinaryUser = async (image) => {
  return axios
    .post(api_cloudinaryUser, {
      file: image,
      upload_preset: "_artwear",
    })
    .then(function (response) {
      if (response.status === 200) {
        // const indexItem = imageFile.indexOf(item);
        // dataImg[indexItem] = { mau: item.color, image };
      }
      return response.data.url;
    })
    .catch(function (error) {
      console.log(error);
    });
};