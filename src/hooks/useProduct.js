import React from "react";
import baseURL from "./../assets/common/baseUrl";
import axios from "axios";

function useProduct() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
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
  }, []);

  return { products: products };
}

export default useProduct;
