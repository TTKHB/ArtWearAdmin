import React from "react";
import useSatistic from "./../../hooks/useSatistic";
import useProduct from "./../../hooks/useProduct";
import Chart from "react-apexcharts";
// import { LineChart } from 'react-chartkick';
function StatisticOrder() {
  const { stasticOrder, stasticOrderStatus } = useSatistic();
  var dates = stasticOrderStatus.map(function (item) {
    return item["date"];
  });
  var totalPriceProcessing = stasticOrderStatus.map(function (item) {
    return item["processing"].total;
  });
  var totalPricesWaitForPay = stasticOrderStatus.map(function (item) {
    return item["waitforpay"].total;
  });
  var totalPricesShipping = stasticOrderStatus.map(function (item) {
    return item["shipping"].total;
  });
  var totalPricesDelivered = stasticOrderStatus.map(function (item) {
    return item["delivered"].total;
  });

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: dates,
    },
  };
  // const xaxis = {
  //   categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
  // };
  const series = [
    {
      name: "Xử lý đơn hàng",
      data: totalPriceProcessing,
    },
    {
      name: "Đang chờ thanh toán",
      data: totalPricesWaitForPay,
    },
    {
      name: "đang chờ giao hàng",
      data: totalPricesShipping,
    },
    {
      name: "Đã giao hàng",
      data: totalPricesDelivered,
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="line" width="600" />
    </div>
  );
}

export default StatisticOrder;
