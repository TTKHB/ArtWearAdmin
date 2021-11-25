import axios from "axios";
import { api_cloudinary } from "../assets/common/baseUrl";

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
