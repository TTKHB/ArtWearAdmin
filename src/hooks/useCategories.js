import React from "react";
import baseURL from "./../assets/common/baseUrl";
import axios from "axios";

function useCategories() {
  const [categories, setCategories] = React.useState([]);

  const getAllCategories = React.useEffect(() => {
    axios
      .get(`${baseURL}/categories`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setCategories(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return { categories };
}

export default useCategories;
