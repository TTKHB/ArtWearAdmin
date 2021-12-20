import React from "react";
import { LineChart, PieChart } from "react-chartkick";
import "chartkick/chart.js";
import useProduct from "../../hooks/useProduct";

const chart = {
  "2021-05-13": 2,
  "2021-05-19": 5,
  "2021-05-19": 10,
};

const StatisticOrder = () => {
  const { products, getAllProducts, deleteProductsById } = useProduct();
  return (
    <div>
      <LineChart data={chart} />
    </div>
  );
};

export default StatisticOrder;
