import React from "react";
import ChartistGraph from "react-chartist";
import D3BarChart from "./D3BarChart"
import VegaLiteStreamgraph from "./VegaLiteStreamgraph"
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
      <h3>D3 Bar Chart</h3>
      <D3BarChart />
    </div>
    
    <div className="chart-container">
      <h3>Vega Lite Stream Graph</h3>
      <VegaLiteStreamgraph />
    </div>
  </div>
  )
}

export default CustomVisualizations;
