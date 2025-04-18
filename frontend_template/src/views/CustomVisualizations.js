import React from "react";
import ChartistGraph from "react-chartist";
import D3BarChart from "./D3BarChart"
import VegaLiteStreamgraph from "./VegaLiteStreamgraph"
import Recharts from "./RechartsStackedBarChart"
import RechartsStackedBarChart from "./RechartsStackedBarChart";
import RechartsStackedBarChartNoCSV from "./RechartsStackedBarChartNoCSV";
import RechartsStackedAreaChart from "./RechartsStackedAreaChart";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";



function CustomVisualizations() {
  return (
    <div className="graphs-page">


    <div className="chart-container">
      <h3>Total Citation Context Types by Model: Stacked/Grouped Bar Chart</h3>
      <RechartsStackedBarChart />
    </div>

    <div style={{ margin: "80px 0" }}></div>

    {/* <div className="chart-container">
      <h3>Recharts Stacked/Grouped Bar Chart (No CSV)</h3>
      <RechartsStackedBarChartNoCSV />
    </div>

    <h1>.</h1> */}


    <div className="chart-container">
      <h3>Citation Context Types Over Time: Stacked Area Chart</h3>
      <RechartsStackedAreaChart />
    </div>

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
