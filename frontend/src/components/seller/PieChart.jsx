import React from "react";
import { Chart } from "react-google-charts";

export function PieChart(props) {
    console.log(props.data);
  return (
    <Chart
      chartType="PieChart"
      data={props.data}
      options={props.options}
      width={"100%"}
      height={"400px"}
    />
  );
}
