import React from "react";
import { axios } from "axios";
import baseURL from "../assets/common/baseUrl";

function useSatistic() {
  const [stasticOrder, setStasticOrder] = React.useState();

  React.useEffect(async () => {
    await getStatisticOrder();
  }, []);

  async function getStatisticOrder() {
    await axios
      .get(`${baseURL}/orders/get/statistics_everyday`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setStasticOrder(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  return { stasticOrder };
}

export default useSatistic;
