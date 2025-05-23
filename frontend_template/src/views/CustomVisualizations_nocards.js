import React from "react";
import RechartsStackedBarChart from "./RechartsStackedBarChart";
import RechartsStackedAreaChart from "./RechartsStackedAreaChart";
import RechartsRadarChart from "./RechartsRadarChart";
import RechartsPieChart from "./RechartsPieChart";

function CustomVisualizations() {
  return (
    <div className="graphs-page">


    <div className="chart-container">
      <h3>Total Citation Context Types by Model: Stacked/Grouped Bar Chart</h3>
      <RechartsStackedBarChart />
    </div>

    <div style={{ margin: "80px 0" }}></div>

    <div className="chart-container">
      <h3>Citation Context Types Over Time: Stacked Area Chart</h3>
      <RechartsStackedAreaChart />
    </div>
    <div style={{ margin: "80px 0" }}></div>
    
    <div className="chart-container">
      <h3>Citation Context Types By Model: Radar Chart</h3>
      <RechartsRadarChart />
    </div>
    <div style={{ margin: "80px 0" }}></div>

    <div className="chart-container">
      <h3>Total Citation Types: Pie Chart</h3>
      <RechartsPieChart />
    </div>
    <div style={{ margin: "80px 0" }}></div>

    {/* <div className="chart-container">
      <h3>D3 Bar Chart</h3>
      <D3BarChart />
    </div>
    
    <div className="chart-container">
      <h3>Vega Lite Stream Graph</h3>
      <VegaLiteStreamgraph />
    </div> */}
  </div>
  )
}

export default CustomVisualizations;
