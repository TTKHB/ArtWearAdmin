import axios from "axios";
import baseURL from "../assets/common/baseUrl";

export const InsertProductFromData = async ({
  name,
  price,
  sizes,
  description,
  quantity,
  idCategories,
  mainImg,
  dataImg,
}) => {
  return axios
    .post(`${baseURL}/products`, {
      ten: name,
      gia: price.numberformat,
      kichthuoc: sizes,
      mota: description,
      ThumbImg: mainImg,
      soluong: quantity,
      categories_id: idCategories,
      product: dataImg,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const UpdateProuctFromData = async ({
  id,
  name,
  price,
  sizes,
  description,
  quantity,
  idCategories,
  dataImg,
  mainImg,
}) => {
  console.log("🚀 ~ file: handlerProduct.js ~ line 44 ~ dataImg", dataImg);
  console.log("🚀 ~ file: handlerProduct.js ~ line 44 ~ mainImg", mainImg);
  return axios
    .put(`${baseURL}/products/${id}`, {
      ten: name.value,
      gia: price.numberformat,
      kichthuoc: sizes,
      mota: description,
      ThumbImg: mainImg,
      soluong: quantity,
      categories_id: idCategories,
      product: dataImg,
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
};
