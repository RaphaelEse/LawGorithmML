import React from "react";
import Recharts from "./RechartsStackedBarChart"
import RechartsLineChartMetrics from "./RechartsLineChartMetrics";
import TableList from "./TableList";
import NivoHeatmap from "./NivoHeatmap";


function ComparativeAnalysis() {
  return (
    <div className="comp-page">


    <div className="comp-table">
      <h3>Comparative Analysis Results:</h3>
      <TableList />
    </div>

    <div style={{ margin: "40px 0" }}></div>

    <div className="comp-chart">
      <h3>Comparative Analysis Visualization:</h3>
      <RechartsLineChartMetrics />
    </div>
    
    <div style={{ margin: "40px 0" }}></div>

<div className="comp-chart">
  <h3>Comparative Analysis Heatmap</h3>
  <NivoHeatmap />
</div>
  </div>
  )
}

export default ComparativeAnalysis;