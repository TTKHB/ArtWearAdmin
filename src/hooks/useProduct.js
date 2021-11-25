import React from "react";
import baseURL from "./../assets/common/baseUrl";
import axios from "axios";

function useProduct() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    getAllProducts();
  }, []);
  const getAllProducts = async () => {
    await axios
      .get(`${baseURL}/products`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const deleteProductsById = async (id) => {
    return await axios
      .delete(`${baseURL}/products/${id}`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        return response.status;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return { products: products, deleteProductsById, getAllProducts };
}

export default useProduct;
