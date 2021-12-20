import React from "react";
import axios from "axios";
import baseURL from "../assets/common/baseUrl";

function useSatistic() {
  const [stasticOrder, setStasticOrder] = React.useState([]);
  const [stasticOrderStatus, setStasticOrderStatus] = React.useState([]);

  React.useEffect(async () => {
    await getStatisticOrder();
    await getStatisticOrderStatus();
  }, []);

  const getStatisticOrder = async () => {
    await axios
      .get(`${baseURL}/orders/get/statistics_everyday`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setStasticOrder(response.data.resultToTal);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const getStatisticOrderStatus = async () => {
    await axios
      .get(`${baseURL}/orders/get/statistic_status`)
      .then(function (response) {
        // handle success
        console.log("data", response.data);
        setStasticOrderStatus(response.data.resultToTal);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return { stasticOrder, getStatisticOrder, stasticOrderStatus };
}

export default useSatistic;
